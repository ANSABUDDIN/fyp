import PosHeader from "@/components/pos/PosHeader";
import ProductCategoryCard from "@/components/pos/ProductCategoryCard";
import { productCategory } from "@/static/ProductCategory";
import { Search, UserPlus } from "lucide-react";
import { useState } from "react";
import { Select } from "antd";
import { Button } from "@/components/ui/button";
import OrderTabel from "@/components/pos/OrderTabel";

const Pos = () => {
  const [category, setCategory] = useState("Glasses");
  return (
    <div className="grid grid-cols-10 min-h-screen p-5 gap-3 h-full">
      <div className="col-span-7 flex flex-col gap-3">
        <PosHeader />
        <div className="col-span-4 rounded-md ">
          <div className="grid grid-cols-6 gap-3">
            {productCategory?.map((ele) => (
              <ProductCategoryCard
                {...ele}
                active={category == ele.name}
                onClick={() => {
                  console.log("category", ele.name);
                  setCategory(ele.name);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-3 rounded-md h-full border p-4 ">
        <div className="flex gap-3 items-center">
          <Select
            showSearch
            allowClear
            suffixIcon={<Search />}
            style={{ width: "100%" }}
            placeholder="Search Customers .."
            optionFilterProp="children"
            className="w-100"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Not Identified",
              },
              {
                value: "2",
                label: "Closed",
              },
              {
                value: "3",
                label: "Communicated",
              },
              {
                value: "4",
                label: "Identified",
              },
              {
                value: "5",
                label: "Resolved",
              },
              {
                value: "6",
                label: "Cancelled",
              },
            ]}
          />
          <Button
            asChild
            variant="default"
            size="sm"
            className="ml-auto gap-1 rounded-full"
          >
            <div>
              <UserPlus className="h-5 w-5" />
            </div>
          </Button>
        </div>
        <OrderTabel />
      </div>
    </div>
  );
};

export default Pos;
