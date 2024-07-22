import AnalyticsCard from "@/components/dashbaord/AnalyticsCard";
import ChannelSidebar from "@/components/elements/ChannelSidebar";
// import { Card } from "antd";
// import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/Card";
import { Card } from "@/components/ui/card";

const Analyze = () => {
  return (
    <div className="grid grid-cols-6 gap-3">
      <ChannelSidebar />
      <div className="col-span-5 min-h-[calc(100vh-100px)]">
        <Card className="p-6">
          <h1 className="font-bold text-[20px]">Good Morning !</h1>
          <p className="text-[13px] font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 mt-4">
          <AnalyticsCard
            percentage={180.1}
            icon="Users"
            title={"Total Audiance"}
            totalRevenue={2350}
          />
          <AnalyticsCard
            percentage={10}
            icon="UserRoundSearch"
            title={"Total Impressions"}
            totalRevenue={800}
          />
          <AnalyticsCard
            percentage={180.1}
            icon="HandCoins"
            title={"Total Engagement"}
            totalRevenue={34}
          />
        </div>
      </div>
    </div>
  );
};

export default Analyze;
