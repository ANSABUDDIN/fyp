import CustomBreadCrumb from "@/components/elements/CustomBreadCrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  CirclePlus,
  CircleX,
  EllipsisVertical,
  SearchIcon,
} from "lucide-react";
import { Drawer, Input, Modal, Table, TableColumnsType } from "antd";
import { useDebounce } from "@/lib/utils";
import { useState } from "react";
import {
  primaryColor,
  recordsPerPage,
  tabelPageSize,
} from "@/config/app.config";
import { CategoryData, CategoryQueryParams } from "@/interfaces";
import { generateSkeletonColumns, rowSk } from "@/static/Skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import purchaseService from "@/http/purchase";
import CreatePurchase from "@/form/CreatePurchase";

const Purchase = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: +recordsPerPage,
  });
  const debouncedValue = useDebounce(search, 1000);
  const paramsTemp: CategoryQueryParams = {
    page: pagination?.current,
    pageSize: pagination?.pageSize,
    search: debouncedValue,
    type: "",
    isPaginated: 1,
  };
  const { data, isPending, refetch } = useQuery({
    queryKey: ["lense", debouncedValue, pagination],
    queryFn: async () => {
      return purchaseService.getAll(paramsTemp);
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
    // {
    //   title: "Sku",
    //   dataIndex: "sku",
    //   align: "center",
    //   key: "sku",
    //   render: (key) => (
    //     <div className="flex justify-center items-center">
    //       <QRCode
    //         size={256}
    //         style={{ height: "auto", maxWidth: "30px", width: "30px" }}
    //         value={key}
    //         viewBox={`0 0 256 256`}
    //       />
    //     </div>
    //   ),
    // },
    {
      title: "Stock In",
      dataIndex: "stockIn",
      key: "stockIn",
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
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical color={primaryColor} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setEditData({});
                setEditData(record);
                setIsEdit(true);
                setOpen(true);
              }}
              className="cursor-pointer"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleDelete(record?._id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  const handleDelete = (id: string) => {
    modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete",
      okText: "Yes",
      centered: true,
      onOk: async () => {
        try {
          const data = await purchaseService.delete(id);
          if (data?.status) {
            toast.success(data.message);
            refetch();
          }
        } catch (error) {
          console.log("Error", error);
        }
      },
      cancelText: "No",
    });
  };
  const showDrawer = () => {
    setEditData({});
    setIsEdit(false);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex items-center justify-between ">
        {contextHolder}
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
          <Button size={"sm"} onClick={showDrawer}>
            <CirclePlus size={20} />
            <span className="ml-2">Purchase</span>
          </Button>
        </div>
      </div>
      <Table
        dataSource={isPending ? rowSk : data?.list || []}
        onChange={handleTableChange}
        scroll={{
          y: tabelPageSize,
        }}
        pagination={{ ...pagination, total: data?.total ?? 0 }}
        className={`custom_table w-100 ${isPending && "animate-pulse"}`}
        columns={isPending ? generateSkeletonColumns(8) : columns}
      />
      <Drawer
        size="large"
        title={`${isEdit ? "Update" : "Create"} Purchase`}
        closeIcon={false}
        extra={
          <CircleX
            color={primaryColor}
            className="cursor-pointer"
            onClick={onClose}
          />
        }
        onClose={onClose}
        open={open}
      >
        <CreatePurchase
          isEdit={isEdit}
          initialData={editData}
          refetch={refetch}
          setOpen={setOpen}
          open={open}
        />
      </Drawer>
    </>
  );
};

export default Purchase;