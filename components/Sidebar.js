import Link from "next/link";

export default function Siderbar() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <div className="fixed top-0 left-0 bg-gray-300 py-4 w-[200px] h-full">
      <div className="mx-auto w-full p-4">
        <h1>Dashboard</h1>
        <ul role="list" className="mt-4 gap-y-6">
          <li className="text-base text-gray-900 hover:text-gray-500 cursor-pointer">
            <Link href="/admin/dashboard">Catalog</Link>
          </li>
          <li className="mt-4 text-base text-gray-900 hover:text-gray-500 cursor-pointer">
            <Link href="/admin/inventry">Add Inventry</Link>
          </li>
          <li className="mt-4 text-base text-gray-900 hover:text-gray-500 cursor-pointer">
            <Link href="/admin/items">Item</Link>
          </li>
          <li className="mt-4 text-base text-gray-900 hover:text-gray-500 cursor-pointer">
            <Link href="/admin/customer">Customer</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
