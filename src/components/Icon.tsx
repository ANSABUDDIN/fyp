import { IconProps } from "@/interfaces/DashbaordCard";
import { icons } from "lucide-react";

const Icon = (props: IconProps) => {
  const LucideIcon = icons[props.name as keyof typeof icons];

  return <LucideIcon color={props.color} size={props.size} />;
};

export default Icon;
