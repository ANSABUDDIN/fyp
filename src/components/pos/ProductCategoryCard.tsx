import { ProductCategoryCardProps } from "@/interfaces/Pos";
import React from "react";
import Icon from "../Icon";
import { cn } from "@/lib/utils";

const ProductCategoryCard: React.FC<ProductCategoryCardProps> = ({
  name,
  icon,
  active,
  onClick,
}) => {
  const className = cn(
    "rounded-md",
    "border-2",
    "hover:text-primary",
    "text-center",
    "select-none",
    "p-4",
    "flex",
    "cursor-pointer",
    "justify-center",
    "flex-col",
    "gap-1",
    "items-center",
    "text-sm",
    "font-semibold",
    "transition-colors",
    "duration-300",
    "hover:border-primary",
    {
      "text-primary border-primary": active,
    }
  );

  return (
    <div className={className} onClick={onClick}>
      <Icon name={icon} className="h-4 w-4 text-muted-foreground" />
      {name}
    </div>
  );
};

export default ProductCategoryCard;
