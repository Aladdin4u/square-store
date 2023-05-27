import Siderbar from "../../components/Sidebar";
import CreateCatalog from "./createCatalog";

export default function Dashboard() {
  return (
    <div className="w-full ml-[200px]">
      <CreateCatalog />
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
