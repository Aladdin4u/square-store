import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Image from "next/image";
import Siderbar from "../../components/Sidebar";
import axios from "axios";
import EditVaraiation from "../../components/EditVaraition";
import DraftEditor from "../../components/DraftEditor";
import { CameraIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";

export default function CreateCatalog({ repoImage }) {
  console.log(repoImage);
  const { get, post, loading } = useFetch();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
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
  const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  const [selectedImage, setSelectedImage] = useState([]);
  const [image, setImage] = useState(repoImage.objects);
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
  console.log("size ===", size);
  console.log("color ===", color);
  const handleChange = (e) => {
    setFormData((prevFormData) => {
      const { name, value, type, checked } = e.target;
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
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
        imageIds: selectedImage,
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
    };
    console.log(newproduct);
    try {
      const res = await axios.post("../api/catalog/create", { newproduct });
      console.log("response ==>", res);
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          varName: "",
          amount: "",
        };
      });
      setColor([]);
      setSize([]);
      setVariation([]);
      setSelectedImage([]);
      setEditorState(EditorState.createEmpty());
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
    <div className="w-full ml-[200px]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="my-10 sm:mx-auto sm:w-full">
          {loading && (
            <div className="w-full h-screen relative flex justify-center items-center">
              <Loader />
            </div>
          )}
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Create New Product
              </h2>
              <p className="text-gray-500 mt-2">
                Add new product to online store.
              </p>
            </div>
            <Link
              href="/admin/uploadImage"
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
              <DraftEditor
                editorState={editorState}
                setEditorState={setEditorState}
              />
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
                      disabled={!formData.name ? true : false}
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
                onClick={() => setOpen(true)}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add image
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

            <div>
              <button
                type="submit"
                disabled={!formData.name || !variation[0] ? true : false}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              Select one or more for images
                            </Dialog.Title>
                            <div className="mt-2">
                              <div className="w-full flex justify-between items-end gap-4">
                                <div className="w-full max-h-96 h-auto overflow-auto">
                                  {repoImage ? (
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
                                              <div
                                                onClick={() =>
                                                  handleClick(item.id)
                                                }
                                              >
                                                {item.id ===
                                                selectedImage.find(
                                                  (select) => select === item.id
                                                ) ? (
                                                  <FontAwesomeIcon
                                                    icon={faSquareCheck}
                                                  />
                                                ) : (
                                                  <FontAwesomeIcon
                                                    icon={faSquare}
                                                  />
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
                                      <Link href="/admin/uploadImage">
                                        add images
                                      </Link>
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 hover:bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Done
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/image/getImage");
  const repoImage = await res.json();
  return { props: { repoImage } };
};

CreateCatalog.getLayout = function PageLayout(page) {
  return (
    <div className="flex mx-auto w-full">
      <Siderbar />
      {page}
    </div>
  );
};
