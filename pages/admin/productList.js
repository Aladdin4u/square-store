import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Siderbar from "../../components/Sidebar";
import { TrashIcon } from "@heroicons/react/24/outline";
import Loader from "../../components/Loader";

export default function ProductList({ product}) {
  const [data, setData] = useState(product.objects);
  const [loading, setLoading] = useState(false);
  console.log("swetData==>", product);

  const deleteProduct = async (e, id) => {
    e.preventDefault();
    try {
      setLoading(true)
      setData((prevData) => prevData.filter((item) => item.id !== id));
      const res = await axios.post("../api/catalog/delete", { id });
      console.log(res);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <div className="w-full ml-[200px]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {loading && (
            <div className="w-full h-screen z-10 flex justify-center items-center">
              <Loader />
            </div>
          )}
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
                <th className="py-4">price</th>
                <th className="py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr className="border-b" key={item.id}>
                    <td className="py-4">{`${
                      item.updatedAt.split("T")[0]
                    }`}</td>
                    <td className="py-4 text-gray-500">
                      {item.item_variation_data.name}
                    </td>
                    <td className="py-4 text-gray-500">{item.type}</td>
                    <td className="py-4 text-gray-500">
                      {item.item_variation_data.price_money.amount}
                    </td>
                    <td className="py-4 font-medium text-red-600 hover:text-red-500">
                      <button onClick={(e) => deleteProduct(e, item.id)}>
                      <TrashIcon className="h-6 w-6" aria-hidden="true" />
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

export const getStaticProps = async () => {
  const res = await fetch("https://connect.squareupsandbox.com/v2/catalog/list?types=ITEM_VARIATION",{
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`
    },
  });
  const product = await res.json();
  return { props: { product} };
};