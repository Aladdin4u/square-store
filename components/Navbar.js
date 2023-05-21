import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Hoodies",
    description: "Get a better understanding of your traffic",
    href: "/category/hoodies",
    icon: ChartPieIcon,
  },
  {
    name: "Sweatshirts",
    description: "Speak directly to your customers",
    href: "/category/sweatshirts",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Shirts",
    description: "Your customers’ data will be safe and secure",
    href: "/category/shirts",
    icon: FingerPrintIcon,
  },
  {
    name: "T-Shirt",
    description: "Connect with third-party tools",
    href: "/category/t-shirt",
    icon: SquaresPlusIcon,
  },
  {
    name: "Jackets",
    description: "Build strategic funnels that will convert",
    href: "/category/jackets",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 space-x-4">
          <a href="#" className="flex items-center justify-center">
            <div className="w-6 text-white text-center font-bold bg-black mx-auto rounded">
              F
            </div>
            <span className="ml-4 font-bold">Finesse</span>
          </a>
        <Popover.Group className="lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
        </div>
        <div className="flex lg:flex-1 lg:justify-end space-x-4">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          <MagnifyingGlassIcon className="h-6 w-6" />
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 relative">
          <ShoppingCartIcon className="h-6 w-6" /> <span aria-hidden="true" className="absolute -top-1 -right-1 w-4 h-4 text-center text-sm rounded-full bg-orange-500">0</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
