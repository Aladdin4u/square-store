import Image from "next/image";

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
const products = [
  {
    id: 1,
    name: "Hoodies",
    href: "#",
    imageSrc:
      "/images/logan-weaver.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 2,
    name: "Sweatshirts",
    href: "#",
    imageSrc:
      "/images/sweatshirt.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: "Shirt",
    href: "#",
    imageSrc:
      "/images/shirt.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 4,
    name: "T-Shirt",
    href: "#",
    imageSrc:
      "/images/t-shirt.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 5,
    name: "Jackets",
    href: "#",
    imageSrc:
      "/images/jacket.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
];

export default function Collections() {
  return (
    <div className="bg-gray-300">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

        <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:grayscale-0 lg:h-80 grayscale transition duration-700 ease-in-out">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full "
                />
              </div>
                <div>
                  <h3 className="absolute left-6 bottom-6 lg:-right-20 lg:bottom-40 lg:-rotate-90 text-4xl text-gray-300">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
