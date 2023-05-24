import { useState } from "react";
import EditVaraiation from "../../components/EditVaraition";

export default function CreateCatalog() {
  const [array, setArray] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    variations: [],
  });
  const [variation, setVariation] = useState({
    id: Math.random() * 4,
    name: "",
    amount: "",
  });
  console.log(formData);
  console.log(variation, array);
  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleVaraition = (e) => {
    setVariation((prevVariation) => {
      return {
        ...prevVariation,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleEditVaraition = (e,id) => {
    setArray((prevArray) => {
        return prevArray.map((item) => {
          return item.id === id
            ? [e.target.name]: e.target.value
        });
    });
  };
  const submitVaration = (e) => {
    e.preventDefault();
    setArray((prevArray) => {
      return [...prevArray, variation];
    });
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        variations: [variation],
      };
    });
    console.log(array);
    setVariation({ name: "", amount: "" });
  };

  const editVaraiation = (e, id) => {
    e.preventDefault();
    setArray((prevArray) => {
      return prevArray.map((item) => {
        return item.id === id
          ? { ...item, name: item.name, amount: item.amount }
          : item;
      });
    });
  };

  const deleteVaraiation = (e, id) => {
    e.preventDefault();
    setArray((prevArray) => {
      return prevArray.map((item) => {
        return item.id === id
          ? item.pop()
          : item;
      });
    });
  };

  //   id: "#small_coffee",
  //     name: "",
  //     type: "ITEM_VARIATION",
  //     item_variation_data: {
  //       price_money: {
  //         amount: "",
  //         currency: "USD",
  //       },
  //       pricing_type: "FIXED_PRICING",
  //       item_id: "#coffee",
  //     },
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1>Create Catalog</h1>
        <form className="space-y-6" action="#" method="POST">
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
          {array.length > 0 && (
            <>
              <pre>{JSON.stringify(array, null, 4)}</pre>
             { array.map(arr => (
              <EditVaraiation
              key={arr.id}
                change={handleEditVaraition}
                value={arr}
                edit={() => editVaraiation(arr.id)}
                delete={() => deleteVaraiation(arr.id)}
              />
              ))}
            </>
          )}
          <div className="w-full flex justify-between items-end gap-4">
            <div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleVaraition}
                    value={variation.name}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2">
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    onChange={handleVaraition}
                    value={variation.amount}
                    required
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
