import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href: string;
  isPage?: boolean;
}

const CustomBreadCrumb: React.FC = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/").filter((segment) => segment !== "");

    const breadcrumbItems: BreadcrumbItem[] = segments.slice(0,3).map(
      (segment, index) => ({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: `/${segments.slice(0, index + 1).join("/")}`,
        isPage: index === 2, // Set isPage to true for the last item
      })
    );

    setBreadcrumbs(breadcrumbItems);
  }, []);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index !== 0 && <BreadcrumbSeparator />}
            {item.isPage ? (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink>
                <Link to={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default CustomBreadCrumb;
