import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Siderbar from "../../components/Sidebar";
import { CameraIcon } from "@heroicons/react/24/outline";

export default function UploadImage() {
  const [files, setFiles] = useState();
  const [data, setData] = useState("");
  console.log(data);

  useEffect(() => {
    console.log("useffect", files);
    const uploadImage = async () => {
      try {
        const image = {
          img: files[0],
          id: `#image_${files[0].name.split(".")[0]}`,
          name: `${files[0].name.split(".")[0]}`,
          caption: `${files[0].name.split(".")[0]}_caption`,
        };
        console.log(image);
        const res = await axios.post("../api/catalog/uploadImage", { image });
        console.log(res);
        setFiles([])
        console.log("deleted",files);
      } catch (error) {
        console.log(error);
      }
    };
    if(files) {
      console.log("good!");
      uploadImage();
    }
  }, [files]);

  const replaceImage = async (id) => {
    try {
      const res = await axios.post("../api/catalog/replaceImage", { id});
      console.log(res);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteImage = async (id) => {
    try {
      const res = await axios.post("../api/catalog/delete", { id });
      console.log(res);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full ml-[200px]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="border-2 border-dashed rounded py-6 flex flex-col justify-center items-center">
          <div className="mt-2 flex justify-between items-center">
            <input
              id="files"
              name="files"
              type="file"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
              className="hidden"
            />
            <div className="border h-24 w-24 bg-gray-300 rounded-full overflow-hidden flex justify-center items-center">
              <label htmlFor="files">
                <CameraIcon className="h-6 w-6" aria-hidden="true" />
              </label>
            </div>
          </div>
          <label
            htmlFor="files"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Upload Image
          </label>
        </div>
        {data ? (
          <table className="mt-6 divide-y w-full text-left table-fixed">
            <thead>
              <tr className="text-gray-500">
                <th className="py-4">Image</th>
                <th className="py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 text-gray-500">
                      <Image
                        src="/images/logan-weaver.jpg"
                        width={300}
                        height={300}
                        alt="catalog image"
                        className="h-8 w-8 rounded-full object-cover overflow"
                        unoptimized
                      />
                    </td>
                    <td className="py-4  text-blue-700 hover:text-blue-900 font-medium">
                      <button onClick={() => replaceImage(item.id)}>Edit</button>
                    </td>
                    <td className="py-4  text-blue-700 hover:text-blue-900 font-medium">
                      <button onClick={() => deleteImage(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) :
        <p className="mt-6 text-center">No catalog image, &quot;click the icon above to add one&quot; </p>
        }
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
