import axios from "axios";
import Hero from "../components/Hero";

export default function Home() {
  const handleCatalog = async() => {
    const res = await axios.post("api/catalog/create", {})
    console.log(res)
  }
  const handleGetCatalog = async() => {
    const res = await axios.get("api/catalog/get")
    console.log(res)
  }
  return (
    <div className="flex flex-col justify-center item-center">
      <Hero />
    </div>
  );
}
