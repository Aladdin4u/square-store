import Image from "next/image";
import { useState } from "react";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
// const products = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "/img/ecommerce-images/product-page-01-related-product-01\.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "/img/ecommerce-images/product-page-01-related-product-01\.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 3,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "/img/ecommerce-images/product-page-01-related-product-01\.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 4,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "/img/ecommerce-images/product-page-01-related-product-01\.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   // More products...
// ];
const img = "https://square-catalog-sandbox.s3.amazonaws.com/files/187c1481ba2b3091b3ff277b556c2a835d4fffa8/original.jpeg"

export default function Product({ products, images}) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                {<Image
                  src={images.map(img => img.id === product.itemData.variations[0].itemVariationData.imageIds[0] ? img.imageData.url : img.imageData.url)}
                  alt={product.itemData.name}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />}
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.itemData.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.itemData.variations[0].itemVariationData.name.split(",")[1]}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.itemData.variations[0].itemVariationData.priceMoney.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}