import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Siderbar from "../../components/Sidebar";
import axios from "axios";

export default function Inventry({ inventry }) {
  console.log(inventry)
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    quantity: "",
    type: "additem",
  });
  console.log(formData);

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      const { name, value, type, checked } = e.target;
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("../api/catalog/search", {});
      console.log(res);
      setData(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateInventry = async (e) => {
    e.preventDefault();
    try {
      let res;
      if(!formData.quantity) {
        return alert("enter quantity")
      }
      if (formData.type === "additem") {
        res = await axios.post("../api/inventry/additemqty", { formData });
      } else {
        res = await axios.post("../api/inventry/deleteitemqty", { formData });
      }
      console.log(res);
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          id: "",
          quantity: "",
        };
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = async (id) => {
    console.log(id);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        id: id,
      };
    });
    setOpen(true);
  };

  return (
    <div className="w-full ml-[200px]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Inventry
            </h2>
            <p className="text-gray-500 mt-2">
              A list of all the product in your store to update item quantity.
            </p>
          </div>
          <button
            onClick={handleSubmit}
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Inventry
          </button>
        </div>
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-4">Category</th>
              <th className="py-4">Size</th>
              <th className="py-4">Color</th>
              <th className="py-4">Price</th>
              <th className="py-4">Quantity</th>
              <th className="py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data[0]?.itemData.variations.map((item) => (
                <tr className="border-b" key={item.id}>
                  <td className="py-4">Shirt</td>
                  <td className="py-4 text-gray-500">
                    {item.itemVariationData.name.split(",")[0]}
                  </td>
                  <td className="py-4 text-gray-500">
                    {item.itemVariationData.name.split(",")[1].trim()}
                  </td>
                  <td className="py-4 text-gray-500">
                    ${item.itemVariationData.priceMoney.amount}
                  </td>
                  <td className="py-4 text-gray-500">25</td>
                  <td className="py-4  text-blue-700 hover:text-blue-900 font-medium">
                    <button onClick={() => handleClick(item.id)}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <p>no data</p>
            )}
          </tbody>
        </table>
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
                            Edit inventory item quantity
                          </Dialog.Title>
                          <div className="mt-2">
                            <div className="w-full flex justify-between items-end gap-4">
                              <div>
                                <div>
                                  <label
                                    htmlFor="amount"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Product Quantity
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id="quantity"
                                      name="quantity"
                                      type="number"
                                      onChange={handleChange}
                                      value={formData.quantity}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <label
                                    htmlFor="type"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    type
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      name="type"
                                      value={formData.type}
                                      onChange={handleChange}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                      <option value="additem">add Item</option>
                                      <option value="deleteitem">
                                        Delete Item
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                        onClick={UpdateInventry}
                      >
                        Update Item
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 hover:bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
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
  );
}

Inventry.getLayout = function PageLayout(page) {
  return (
    <div className="flex mx-auto w-full">
      <Siderbar />
      {page}
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/catalog/search");
  const inventry = await res.json();
  return { props: { inventry } };
};