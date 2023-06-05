import axios from "axios";
import Hero from "../components/Hero";
import Newsletter from "../components/Newletter";
import Product from "../components/Product";
import Collections from "../components/Collections";
import { useState } from "react";

export default function Home({ product, images }) {
  const [products, setProducts] = useState(product.objects);
  const [img, setImg] = useState(images.objects);
  console.log(products, images)
  const filteredItem = products
    ? products.filter((item) => item.type === "ITEM")
    : products;
    console.log(filteredItem)

  const handleCatalog = async () => {
    const res = await axios.post("api/catalog/create", {});
    console.log(res);
  };
  const handleGetCatalog = async () => {
    try {
      const res = await axios.get("api/catalog/get");
      console.log(res.data);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center item-center">
      <Hero />
      <Collections />
      <Product products={filteredItem} images={img} />
      <Newsletter />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/catalog/get");
  const image = await fetch("http://localhost:3000/api/image/getImage");
  const product = await res.json();
  const images = await image.json();
  return { props: { product, images } };
};