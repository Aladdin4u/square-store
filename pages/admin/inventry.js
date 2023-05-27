import Siderbar from "../../components/Sidebar";
export default function Inventry() {
  return (
    <div className="w-full ml-[200px]">
      <h1>Inventry</h1>
    </div>
  );
}

Inventry.getLayout = function PageLayout(page) {
  return (
    <div className="flex mx-auto w-full">
      <Siderbar />
      {page}
    </div>
  );
};
