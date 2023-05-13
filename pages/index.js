import axios from "axios";

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
      welcome square
      <button className="bg-blue-500 text-white" onClick={handleCatalog}>click me</button>
      <button className="bg-green-500 text-white" onClick={handleGetCatalog}>click me</button>
    </div>
  );
}
