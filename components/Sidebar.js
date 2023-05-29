import Link from "next/link";
import { useRouter } from "next/router";

export default function Siderbar() {
  const router = useRouter()
  return (
    <div className="fixed top-0 left-0 bg-gray-300 py-4 w-[200px] h-full">
      <div className="mx-auto w-full py-4">
        <div className="w-full flex justify-around items-center">
        <div className="w-6 text-white text-center font-bold bg-black rounded">
              F
            </div>
            <span className="font-bold text-white">Finesse</span>
        </div>
        <h1 className="mt-6 px-6 font-bold text-gray-900">Admin Dashboard</h1>
        <ul role="list" className="mt-6 gap-y-6">
          <li className={`${router.pathname == "/admin/dashboard" ? "bg-gray-200 text-white" : ""} hover:bg-gray-400 hover:text-gray-300 text-base px-6 py-2 text-gray-900 cursor-pointer`}>
            <Link href="/admin/dashboard">Catalog</Link>
          </li>
          <li className={`${router.pathname == "/admin/inventry" ? "bg-gray-200 text-white" : ""} hover:bg-gray-400 hover:text-gray-300 text-base px-6 py-2 text-gray-900 cursor-pointer`}>
            <Link href="/admin/inventry">Manage Inventry</Link>
          </li>
          <li className={`${router.pathname == "/admin/items" ? "bg-gray-200 text-white" : ""} hover:bg-gray-400 hover:text-gray-300 text-base px-6 py-2 text-gray-900 cursor-pointer`}>
            <Link href="/admin/items">Item</Link>
          </li>
          <li className={`${router.pathname == "/admin/customer" ? "bg-gray-200 text-white" : ""} hover:bg-gray-400 hover:text-gray-300 text-base px-6 py-2 text-gray-900 cursor-pointer`}>
            <Link href="/admin/customer">Customer</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
