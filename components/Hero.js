import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-300 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="px-8 lg:px-14">
          <h1 className="text-6xl font-bold uppercase tracking-tight text-gray-900 sm:text-9xl">
            Get <br /> Yourself <br />
            <span className="text-white">
              into the
              <br /> right gear
            </span>
          </h1>
          <div className="mt-10 flex gap-x-6">
            <a
              href="#"
              className="text-2xl font-semibold leading-6 text-gray-900"
            >
              View summer collections <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="">
          <Image
            src="/images/logan-weaver.jpg"
            width={500}
            height={300}
            alt="hero-image"
            // style={{objectFit: "contain"}}
            className="h-[100vh] w-full"
          />
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
