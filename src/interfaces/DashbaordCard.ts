export interface AnalyticsCardProps {
  totalRevenue: number;
  percentage: number;
  title: string;
  icon: string;
}

export interface IconProps {
  name: any;
  color?: string | "black";
  className?: string | "";
  size?: number | 16;
}
