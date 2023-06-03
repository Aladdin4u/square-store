import { useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import Image from "next/image";
import axios from "axios";
import EditVaraiation from "../../components/EditVaraition";
import DraftEditor from "../../components/DraftEditor";
import { CameraIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

export default function CreateCatalog() {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw({
        blocks: [
          {
            key: "3eesq",
            text: "Enter product description here",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 19,
                length: 6,
                style: "BOLD",
              },
              {
                offset: 25,
                length: 5,
                style: "ITALIC",
              },
              {
                offset: 30,
                length: 8,
                style: "UNDERLINE",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "9adb5",
            text: "Tell us more about your product",
            type: "header-one",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      })
    )
  );
  const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  console.log(content);
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [image, setImage] = useState([
    {
      type: "IMAGE",
      id: "UIL7H6ASIOER7O6HZCL2ASDP",
      imageData: {
        name: "health",
        url: "https://square-catalog-sandbox.s3.amazonaws.com/files/2423540c2dcc9806a323b49b07533e9b917143fc/original.png",
        caption: "health",
      },
    },
    {
      type: "IMAGE",
      id: "7ZQUHUHHDYCJCVIFJ5EQNQMV",
      imageData: {
        name: "STOLE PIC",
        url: "https://square-catalog-sandbox.s3.amazonaws.com/files/8e90ecb2bfd8a46131fa9df46a1fb827f5ae3755/original.jpeg",
        caption: "STOLE PIC",
      },
    },
  ]);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [variation, setVariation] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    color: "",
    size: "",
  });
  console.log("responsedata ===", data);
  const handleChange = (e) => {
    setFormData((prevFormData) => {
      const { name, value, type, checked } = e.target;
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
  // useEffect(() => {
  //   const getImage = async () => {
  //     try {
  //       const res = await axios.get("../api/image/getImage");
  //       setImage(res.data.objects);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getImage();
  // }, []);
  const submitVaration = (e) => {
    e.preventDefault();
    const newVariation = {
      type: "ITEM_VARIATION",
      id: `#item_variation_${formData.size.toLowerCase()}_${formData.color.toLowerCase()}`,
      itemVariationData: {
        pricingType: "FIXED_PRICING",
        priceMoney: {
          amount: parseInt(formData.amount),
          currency: "USD",
        },
        itemOptionValues: [
          {
            itemOptionId: "#item_option_size",
            itemOptionValueId: `#item_option_value_size_${formData.size.toLowerCase()}`,
          },
          {
            itemOptionId: "#item_option_color",
            itemOptionValueId: `#item_option_value_color_${formData.color.toLowerCase()}`,
          },
        ],
      },
    };

    const newColor = {
      type: "ITEM_OPTION_VAL",
      id: `#item_option_value_color_${formData.color.toLowerCase()}`,
      itemOptionValueData: {
        name: `${formData.color}`,
      },
    };
    const newSize = {
      type: "ITEM_OPTION_VAL",
      id: `#item_option_value_size_${formData.size.toLowerCase()}`,
      itemOptionValueData: {
        name: `${formData.size}`,
      },
    };
    if (!formData.color || !formData.size || !formData.amount) {
      return alert("enter product variation values");
    }

    if (variation.find((x) => x.id === newVariation.id)) {
      return;
    } else {
      setVariation((prevVariation) => {
        return [...prevVariation, newVariation];
      });
    }
    if (color.find((x) => x.id === newColor.id)) {
      return;
    } else {
      setColor((prevColor) => {
        return [...prevColor, newColor];
      });
    }
    if (size.find((x) => x.id === newSize.id)) {
      return;
    } else {
      setSize((prevSize) => {
        return [...prevSize, newSize];
      });
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        varName: "",
        amount: "",
      };
    });
    setError(false);
  };

  const deleteVaraiation = (id, sizeId, colorId) => {
    setVariation((prevVariation) =>
      prevVariation.filter((arr) => arr.id !== id)
    );
    setSize((prevSize) => prevSize.filter((arr) => arr.id !== sizeId));
    setColor((prevColor) => prevColor.filter((arr) => arr.id !== colorId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newproduct = {
      name: formData.name,
      description: content,
      variation: variation,
      color: color,
      size: size,
      images: selectedImage,
    };
    console.log(newproduct);
    try {
      const res = await axios.post("../api/catalog/create", { newproduct });
      console.log(res);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (id) => {
    setChecked((prevChecked) => !prevChecked);
    const findImage = image.find((img) => img.id === id);
    const findId = selectedImage.find((select) => select === id);
    if (findImage) {
      if (findId) {
        console.log("exsteed");
        setSelectedImage((prevSelected) =>
          prevSelected.filter((item) => item !== id)
        );
      } else {
        console.log("addedd!");
        setSelectedImage((prevSelected) => {
          return [...prevSelected, id];
        });
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="my-10 sm:mx-auto sm:w-full">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Create New Product
            </h2>
            <p className="text-gray-500 mt-2">
              Add new product to online store.
            </p>
          </div>
          <Link href="/admin/uploadImage"
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            add new Image
          </Link>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                value={formData.name}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Description
            </label>
          <DraftEditor editorState={editorState} setEditorState={setEditorState} />
          </div>
          <h2>Add product variation</h2>
          {variation.length > 0 && (
            <>
              {/* <pre>{JSON.stringify(variation, null, 4)}</pre> */}
              {variation.map((arr, i) => (
                <EditVaraiation
                  key={arr.id}
                  id={arr.id}
                  amount={arr.itemVariationData.priceMoney.amount}
                  delete={() =>
                    deleteVaraiation(
                      arr.id,
                      arr.itemVariationData.itemOptionValues[0]
                        .itemOptionValueId,
                      arr.itemVariationData.itemOptionValues[1]
                        .itemOptionValueId
                    )
                  }
                />
              ))}
            </>
          )}
          <div className="w-full flex justify-between items-end gap-4">
            <div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount $
                </label>
                <div className="mt-2">
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    onChange={handleChange}
                    value={formData.amount}
                    disabled={
                      !formData.name ? true : false
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor="size"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Size
                </label>
                <div className="mt-2">
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">-- Choose Size --</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Color
                </label>
                <div className="mt-2">
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">-- Choose Color --</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Yellow">Yellow</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              onClick={submitVaration}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </div>
          </div>
          {error && (
            <p className="max-w-sm text-sm text-red-600 text-center bg-red-300 rounded">
              enter a valid product variations
            </p>
          )}
          <div className="w-full max-h-96 h-auto overflow-auto">
            {image ? (
              <table className="mt-6 divide-y w-full text-left table-fixed">
                <thead>
                  <tr className="text-gray-500">
                    <th className="py-4">Name</th>
                    <th className="py-4">Image</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {image.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 text-gray-500">
                        {item.imageData.name}
                      </td>
                      <td className="py-4 text-gray-500">
                        <Image
                          src={item.imageData.url}
                          width={300}
                          height={300}
                          alt="catalog image"
                          className="h-8 w-8 rounded-full object-cover overflow"
                          unoptimized
                        />
                      </td>
                      <td className="py-4  text-blue-700 hover:text-blue-900 font-medium">
                        <div onClick={() => handleClick(item.id)}>
                          {item.id ===
                          selectedImage.find((select) => select === item.id) ? (
                            <FontAwesomeIcon icon={faSquareCheck} />
                          ) : (
                            <FontAwesomeIcon icon={faSquare} />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-6 text-center">
                No catalog image found,{" "}
                <Link href="/admin/uploadImage">add images</Link>
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={
                !formData.name || !variation[0]
                  ? true
                  : false
              }
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
