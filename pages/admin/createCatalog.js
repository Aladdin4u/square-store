import { useState } from "react";
import EditVaraiation from "../../components/EditVaraition";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/outline";

export default function CreateCatalog() {
  const [variation, setVariation] = useState([]);
  const [files, setFiles] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    varName: "",
    varAmount: "",
  });
  console.log(formData);
  console.log(files[0].name);
  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitVaration = (e) => {
    e.preventDefault();
    const newVariation = {
      id: `#${formData.varName}_${formData.name}`,
      name: formData.varName,
      type: "ITEM_VARIATION",
      item_variation_data: {
        price_money: {
          amount: parseInt(formData.varAmount),
          currency: "USD",
        },
        pricing_type: "FIXED_PRICING",
        item_id: `#${formData.name}`,
      },
    };

    if (!formData.varName || !formData.varAmount) {
      return alert("enter valid values");
    }
    setVariation((prevVariation) => {
      return [...prevVariation, newVariation];
    });

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        varName: "",
        varAmount: "",
      };
    });
  };

  const deleteVaraiation = (id) => {
    setVariation((prevVariation) =>
      prevVariation.filter((arr) => arr.id !== id)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: formData.name,
      description: formData.description,
      variation: variation,
    };
    console.log(body);
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
              {/* <pre>{JSON.stringify(variation, null, 4)}</pre> */}
              {variation.map((arr, i) => (
                <EditVaraiation
                  key={arr.id}
                  name={arr.name}
                  amount={arr.item_variation_data.price_money.amount}
                  delete={() => deleteVaraiation(arr.id)}
                />
              ))}
            </>
          )}
          <div className="w-full flex justify-between items-end gap-4">
            <div>
              <div>
                <label
                  htmlFor="varName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="varName"
                    name="varName"
                    type="text"
                    onChange={handleChange}
                    value={formData.varName}
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
                  htmlFor="varAmount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2">
                  <input
                    id="varAmount"
                    name="varAmount"
                    type="number"
                    onChange={handleChange}
                    value={formData.varAmount}
                    disabled={
                      !formData.name || !formData.description ? true : false
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
          <Image
                      src={files[0]?.name}
                      width={300}
                      height={300}
                      alt="catalog image"
                      className="h-24 w-24 object-cover overflow"
                      unoptimized
                    />
          <div>
            <button
              type="submit"
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
