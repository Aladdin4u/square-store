import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Hero from "../components/Hero";
import Newsletter from "../components/Newletter";
import Collections from "../components/Collections";
import { AppContext } from "../context/AppContext.js";

export default function Home() {
  const app = useContext(AppContext);

  const [products, setProducts] = useState(null);
  const [images, setImages] = useState(null);
  console.log(images, products)
  useEffect(() => {
    const formData = async() => {
      try {
        const products = await axios.get("../api/catalog/get")
        const images = await axios.get("../api/image/getImage")
        setProducts(products.data.objects)
        setImages(images.data.objects)
      } catch (error) {
        console.log(error)
      }
    }
    formData()
  }, [])
  const mapImage = products?.map(product => product.itemVariationData.imageIds[0])
  console.log(mapImage)
  const getImageUrl = (id) => {
    images.filter((prevImage) => {
      if (prevImage.id === id) {
        console.log(prevImage.imageData.url)
        return prevImage.imageData.url;
      }
    });
  }
  return (
    <div className="flex flex-col justify-center item-center">
      <Hero />
      <Collections />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products && products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  {getImageUrl(product.itemVariationData.imageIds[0])
                   && (
                    <Image
                      src={getImageUrl(product.itemVariationData.imageIds[0])}
                      alt={product.itemVariationData.name}
                      width={500}
                      height={500}
                      className="h-full w-full object-cover lg:h-full lg:w-full"
                      // unoptimized
                      priority={true}
                    />
                  )}
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.itemVariationData.name.split(",")[0]}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.itemVariationData.name.split(",")[1]}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      ${product.itemVariationData.priceMoney.amount}
                    </p>
                    <div
                      className="z-10 absolute font-bold text-green-300 mt-1 text-sm text-green-500 hover:bg-green-900"
                      onClick={() => app.onProductAdd(product)}
                    >
                      buy
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
