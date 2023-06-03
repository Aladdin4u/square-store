import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Siderbar from "../../components/Sidebar";

export default function ProductList() {
  const [data, setData] = useState(null);
  console.log("swetData==>", data);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("../api/catalog/get", {});
        console.log(res);
        setData(res.data.objects);
      } catch (error) {
        console.log(error);
      }
      getProducts();
    };
  }, []);
  const deleteProduct = async (e, id) => {
    e.preventDefault();
    try {
      setData((prevData) => prevData.filter((item) => item.id !== id));
      const res = await axios.post("../api/catalog/delete", { id });
      console.log(res);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredItem = data
    ? data.filter((item) => item.type === "ITEM")
    : data;

  return (
    <div className="w-full ml-[200px]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              ProductList
            </h2>
            <p className="text-gray-500 mt-2">
              A list of all the product in your store to update item quantity.
            </p>
          </div>
          <Link
          href="/admin/createCatalog"
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Product
          </Link>
        </div>
        {data ? (
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-4">Date</th>
                <th className="py-4">Name</th>
                <th className="py-4">Type</th>
                <th className="py-4">Varaition No</th>
                <th className="py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                filteredItem?.map((item) => (
                  <tr className="border-b" key={item.id}>
                    <td className="py-4">{`${
                      item.updatedAt.split("T07")[0]
                    }`}</td>
                    <td className="py-4 text-gray-500">
                      item
                      {/* {item.itemData.name} */}
                    </td>
                    <td className="py-4 text-gray-500">{item.type}</td>
                    <td className="py-4 text-gray-500">
                      67
                      {/* {item.itemData.variations.length} */}
                    </td>
                    <td className="py-4  text-blue-700 hover:text-blue-900 font-medium">
                      <button onClick={(e) => deleteProduct(e, item.id)}>
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No product in online store</p>
        )}
      </div>
    </div>
  );
}

ProductList.getLayout = function PageLayout(page) {
  return (
    <div className="flex mx-auto w-full">
      <Siderbar />
      {page}
    </div>
  );
};
