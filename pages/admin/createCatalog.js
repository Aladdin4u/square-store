import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import EditVaraiation from "../../components/EditVaraition";
import { CameraIcon } from "@heroicons/react/24/outline";

export default function CreateCatalog() {
  const [data, setData] = useState([]);
  const [variation, setVariation] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [files, setFiles] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    color: "",
    size: "",
  });
  console.log("formdata ===",formData);
  console.log("varation ===",variation);
  console.log("color ===", color);
  console.log("size ===",size);
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
      type: "ITEM",
      id: `#item_variation_${formData.size.toLowerCase()}_${formData.color.toLowerCase()}`,
      itemVariationData: {
        pricing_type: "FIXED_PRICING",
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
    if (!formData.color || !formData.size|| !formData.amount) {
      return alert("enter product variation values");
    }
    setVariation((prevVariation) => {
      return [...prevVariation, newVariation];
    });

    setColor((prevColor) => {
      return [...prevColor, newColor];
    });
    setSize((prevSize) => {
      let check = [...prevSize.filter(x => x === newSize.id)]
      if(check) {
          return
      }
      // return [...prevSize, newSize];
    });

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        varName: "",
        amount: "",
      };
    });
  };

  const deleteVaraiation = (id, sizeId, colorId) => {
    console.log({
      id: id,
      size:sizeId,
      color: colorId
    })
    setVariation((prevVariation) =>
      prevVariation.filter((arr) => arr.id !== id)
    );
    setColor((prevColor) => prevColor.filter((arr) => arr.id !== sizeId));
    setSize((prevSize) => prevSize.filter((arr) => arr.id !== colorId));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: formData.name,
      description: formData.description,
      variation: variation,
    };
    console.log(body);
    // try {
    //   const res = await axios.post("../api/catalog/additemqty", {});
    //   console.log(res);
    //   setData(res)
    // } catch (error) {
    //   console.log(error)
    // }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="my-10 sm:mx-auto sm:w-full">
        <h1>Create Catalog</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="files"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Image
            </label>
            <div className="mt-2 flex justify-between items-center">
              <input
                id="files"
                name="files"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="hidden"
              />
              <div className="border h-24 w-24 bg-gray-300 rounded-full overflow-hidden flex justify-center items-center">
                <label htmlFor="files">
                  {files && files[0] ? (
                    <Image
                      src={URL.createObjectURL(files[0])}
                      width={300}
                      height={300}
                      alt="catalog image"
                      className="h-24 w-24 object-cover overflow"
                      unoptimized
                    />
                  ) : (
                    <CameraIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </label>
              </div>
            </div>
          </div>
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
            <div className="mt-2">
              <input
                id="description"
                name="description"
                type="text"
                onChange={handleChange}
                value={formData.description}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <h2>Add product variation</h2>
          {variation.length > 0 && (
            <>
              <pre>{JSON.stringify(variation, null, 4)}</pre>
              {variation.map((arr, i) => (
                <EditVaraiation
                  key={arr.id}
                  name={arr.name}
                  amount={arr.itemVariationData.priceMoney.amount}
                  delete={() => deleteVaraiation(arr.id, arr.itemVariationData.itemOptionValues[0].itemOptionValueId
                    , arr.itemVariationData.itemOptionValues[1].itemOptionValueId
                    )}
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
                      !formData.name || !formData.description ? true : false
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

            <button
              onClick={submitVaration}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          </div>
          <div>
            <button
              type="submit"
              disabled={
                !formData.name || !formData.description || !variation[0]
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
      {data && <pre>{JSON.stringify(data, null, 4)}</pre>}
    </div>
  );
}
