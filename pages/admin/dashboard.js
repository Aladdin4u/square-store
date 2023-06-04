import Siderbar from "../../components/Sidebar";
import CreateCatalog from "./createCatalog";

export default function Dashboard() {
  return (
    <div className="w-full ml-[200px]">
      <h1>Dashboard</h1>
    </div>
  );
}

Dashboard.getLayout = function PageLayout(page) {
  return (
    <div className="flex mx-auto w-full">
      <Siderbar />
      {page}
      
    </div>
  );
};
