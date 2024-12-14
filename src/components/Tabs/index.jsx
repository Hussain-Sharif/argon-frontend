import { TabsList, TabsTrigger } from "../ui/tabs";

export const TabsCont = (props) => {
  const { activeTab, onChangeTab } = props;

  return (
    <TabsList className="w-full">
      <TabsTrigger
        value="user"
        className={`w-full ${activeTab === "user" ? "bg-gray-200" : ""}`}
        onClick={() => onChangeTab("user")}
      >
        User
      </TabsTrigger>
      <TabsTrigger
        value="vendor"
        className={`w-full ${activeTab === "vendor" ? "bg-gray-200" : ""}`}
        onClick={() => onChangeTab("vendor")}
      >
        Vendor
      </TabsTrigger>
    </TabsList>
  );
};
