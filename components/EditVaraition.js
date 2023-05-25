import { TrashIcon } from "@heroicons/react/24/outline";

export default function EditVaraiation(props) {
  return (
    <div className="w-full flex justify-between items-end gap-4">
      <div className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        {props.name}
      </div>
      <div className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        {props.amount}
      </div>
      <div
        onClick={props.delete}
        className="rounded-md bg-red-600 px-3 py-1.5 px-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        <span className="sr-only">trash icon</span>
        <TrashIcon className="h-6 w-6" aria-hidden="true" />
      </div>
    </div>
  );
}
