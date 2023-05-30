import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Siderbar from "../../components/Sidebar";
import { CameraIcon } from "@heroicons/react/24/outline";

export default function UploadImage() {
  const [files, setFiles] = useState([]);
  console.log(files);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const img = {
      img: files[0].name
    }
    try {
      const res = await axios.post("../api/catalog/uploadImage", { img });
      console.log(res);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full ml-[200px]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="files"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Upload Image
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
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload Image
          </button>
        </form>
      </div>
    </div>
  );
}

UploadImage.getLayout = function PageLayout(page) {
  return (
    <div className="flex mx-auto w-full">
      <Siderbar />
      {page}
    </div>
  );
};
