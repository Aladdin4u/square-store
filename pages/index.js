import axios from "axios";
import Hero from "../components/Hero";
import Newsletter from "../components/Newletter";
import Product from "../components/Product";
import Collections from "../components/Collections";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState();
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
      <Product />
      <Newsletter />
    </div>
  );
}
