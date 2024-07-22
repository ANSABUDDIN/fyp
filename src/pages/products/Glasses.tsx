import CustomBreadCrumb from "@/components/elements/CustomBreadCrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus, SearchIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Image, Input, Table, TableColumnsType } from "antd";
import { useDebounce } from "@/lib/utils";
import { FrameTypes } from "@/enum/enum";
import QRCode from "react-qr-code";
import { useState } from "react";
import { recordsPerPage, tabelPageSize } from "@/config/app.config";
import { CategoryData, CategoryQueryParams } from "@/interfaces";
// import { getFrames } from "@/http/frame";

import { generateSkeletonColumns, rowSk } from "@/static/Skeleton";
import frameService from "@/http/frame";

const Glasses = () => {
  const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("");
  const { type = FrameTypes.FRAME } = useParams();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: recordsPerPage,
  });
  const debouncedValue = useDebounce(search, 1000);
  const paramsTemp: CategoryQueryParams = {
    page: pagination?.current,
    pageSize: pagination?.pageSize,
    search: debouncedValue,
    type: type,
    isPaginated: 1,
  };
  const { data, isPending } = useQuery({
    queryKey: ["frames", debouncedValue, type],
    queryFn: async () => {
      return frameService.getAll(paramsTemp);
    },
  });
  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const columns: TableColumnsType<CategoryData> = [
    {
      title: "Sno",
      dataIndex: "sno",
      key: "sno",
      align: "center",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Images",
      dataIndex: "images",
      align: "center",
      key: "images",
      render: (key) => (
        <>
          {key.length > 0 ? (
            <div className="capitalize flex justify-center items-center gap-2">
              {key.map((ele: any) => (
                <Image
                  width={30}
                  src={ele}
                  placeholder={<Image preview={false} src={ele} width={50} />}
                />
              ))}
            </div>
          ) : (
            <div className="text-[10px]">N/A</div>
          )}
        </>
      ),
    },
    {
      title: "Sku",
      dataIndex: "sku",
      align: "center",
      key: "sku",
      render: (key) => (
        <div className="flex justify-center items-center">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "30px", width: "30px" }}
            value={key}
            viewBox={`0 0 256 256`}
          />
        </div>
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      align: "center",
      render: (ele) => <div>{ele?.code || " - "} </div>,
    },

    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      align: "center",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      render: (ele) => <Badge variant="outline">{ele}</Badge>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "address",
      key: "address",
      align: "center",
      render: (_, isActive) => (
        <Badge variant="outline">{isActive ? "Active" : "Deactive"}</Badge>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <CustomBreadCrumb />
        <div className="flex gap-3">
          <Input
            allowClear
            type="search"
            placeholder="Search"
            className="w-[250px]"
            onChange={(e) => setSearch(e.target.value)}
            prefix={<SearchIcon className="text-primary" size={20} />}
          />
          {/* <Select
            className="w-[200px]"
            allowClear
            showSearch
            onChange={(value) => setCategory(value)}
            filterOption={filterOption}
            placeholder="Search With Type"
            options={Object.values(FrameTypes)?.map((ele) => ({
              label: ele,
              value: ele,
            }))}
          /> */}
          <Link to="/dashboard/books/create">
            <Button size={"sm"}>
              <CirclePlus size={20} />
              <span className="ml-2">{type}</span>
            </Button>
          </Link>
        </div>
      </div>
      {/* {console.log("data", data)} */}
      <Table
        dataSource={isPending ? rowSk : data?.list || []}
        onChange={handleTableChange}
        scroll={{
          y: tabelPageSize,
        }}
        // loading={isPending}
        className={`custom_table mt-3 w-100 ${isPending && "animate-pulse"}`}
        columns={isPending ? generateSkeletonColumns(10) : columns}
      />
    </div>
  );
};

export default Glasses;
