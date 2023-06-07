import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import axios from "axios";
import Siderbar from "../../components/Sidebar";
import { CameraIcon } from "@heroicons/react/24/outline";
import useFetch from "../../hooks/useFetch"
import Loader from "../../components/Loader"
import { faListSquares } from "@fortawesome/free-solid-svg-icons";

export default function UploadImage({ repoImage }) {
  // const {get, post, loading} = useFetch()
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [image, setImage] = useState(null);
  const [changeImage, setChangeImage] = useState(null);
  const [imageId, setImageId] = useState("");
  const [data, setData] = useState(repoImage.objects);

  useEffect(() => {
    if (!image) return;
    console.log("useffect", image);
    const uploadImage = async () => {
      try {
        setLoading(true)
        const res = await axios.post(
          "../api/image/uploadImage",
          {
            image,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res);
        getImage();
        setImage(null);
        console.log("deleted", image);
        setLoading(false)
      } catch (error) {
        setImage(null);
        console.log(error);
        setLoading(false)
      }
    };
    if (image) {
      console.log("good!");
      uploadImage();
    }
    const getImage = async () => {
      try {
        setLoading(true)
        const res = await axios.get("../api/image/getImage");
        setData(res.data.objects);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
  }, [image]);


  const replaceImage = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        "../api/image/replaceImage",
        { image: changeImage, id: imageId.id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      setOpen(false);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const deleteImage = async (e, id) => {
    e.preventDefault();
    try {
      setLoading(true)
      setData((prevData) => prevData.filter((item) => item.id !== id));
      const res = await axios.post("../api/catalog/delete", { id });
      console.log(res);
      getImage();
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  const handleClick = async (id) => {
    console.log(id);
    const item = data.find((item) => item.id == id);
    setImageId(item);
    setOpen(true);
  };
  return (
    <div className="w-full ml-[200px]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {loading && <div className="w-full h-screen absolute inset-0 flex justify-center items-center"><Loader /></div>}
        <div className="border-2 border-dashed rounded py-6 flex flex-col justify-center items-center">
          <div className="mt-2 flex justify-between items-center">
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
            <div className="border h-24 w-24 bg-gray-300 rounded-full overflow-hidden flex justify-center items-center">
              <label htmlFor="image">
                <CameraIcon className="h-6 w-6" aria-hidden="true" />
              </label>
            </div>
          </div>
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Upload Image
          </label>
        </div>
        {data ? (
          <table className="mt-6 divide-y w-full text-left table-fixed">
            <thead>
              <tr className="text-gray-500">
                <th className="py-4">Name</th>
                <th className="py-4">Image</th>
                <th className="py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 text-gray-500">{item.imageData.name}</td>
                  <td className="py-4 text-gray-500">
                    <Image
                      src={item.image_data.url}
                      width={300}
                      height={300}
                      alt="catalog image"
                      className="h-8 w-8 rounded-full object-cover overflow"
                      unoptimized
                    />
                  </td>
                  <td className="py-4  text-blue-700 hover:text-blue-900 font-medium">
                    <button 
                    disabled={loading}
                    onClick={() => handleClick(item.id)}>Edit</button>
                  </td>
                  <td className="py-4  text-blue-700 hover:text-blue-900 font-medium">
                    <button 
                    disabled={loading}
                    onClick={(e) => deleteImage(e, item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-6 text-center">
            No catalog image, &quot;click the icon above to add one&quot;{" "}
          </p>
        )}
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
                            Update Image
                          </Dialog.Title>
                          <div className="mt-2">
                            <div className="w-full flex justify-between items-end gap-4">
                              <label htmlFor="changeImage">
                                <input
                                  id="changeImage"
                                  name="changeImage"
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    setChangeImage(e.target.files[0])
                                  }
                                  className="hidden"
                                />
                                {imageId && <Image
                                  src={changeImage ? URL.createObjectURL(changeImage) : imageId.image_data.url}
                                  width={300}
                                  height={300}
                                  alt="catalog image"
                                  className="h-98 w-98 rounded object-cover overflow"
                                  unoptimized
                                />}
                                Choose new image
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                        onClick={replaceImage}
                      >
                        save
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
export const getStaticProps = async () => {
  const res = await fetch("https://connect.squareupsandbox.com/v2/catalog/list?types=IMAGE",{
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`
    },
  });
  const repoImage = await res.json();
  return { props: { repoImage } };
};

UploadImage.getLayout = function PageLayout(page) {
  return (
    <div className="flex mx-auto w-full">
      <Siderbar />
      {page}
    </div>
  );
};
