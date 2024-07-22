import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AnalyticsCardProps } from "@/interfaces/DashbaordCard";
import Icon from "../Icon";

const AnalyticsCard = (props: AnalyticsCardProps) => {
  const { totalRevenue = 100, percentage = 10, title = "Title" } = props;
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
        <Icon name={props.icon} className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">{totalRevenue}</div>
        <p className="text-xs text-muted-foreground">
          +{percentage}% from last month
        </p>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
