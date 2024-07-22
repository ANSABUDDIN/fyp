import { FrameTypes, ProductTypes } from "@/enum/enum";
import frameService from "@/http/frame";
import kitService from "@/http/Kit";
import vendorService from "@/http/vendor";
import { CreateCategoryProps } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Select } from "antd";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// {
//     refetch,
//     setOpen,
//     initialData,
//     isEdit,
//     open,
//   }

const CreatePurchase: React.FC<CreateCategoryProps> = () => {
  const [product, setProduct] = useState([]);
  const [form] = Form.useForm();
  const productTypesArray = useMemo(
    () =>
      Object.values(ProductTypes).map((ele) => ({
        label: ele,
        value: ele,
      })),
    []
  );

  const vendorData = useQuery({
    queryKey: ["vendorDrop"],
    queryFn: () => vendorService.getDropdown(),
  });

  const kitData = useQuery({
    queryKey: ["kitDrop"],
    queryFn: () => kitService.getDropdown(),
  });

  const sunGlassData = useQuery({
    queryKey: ["sunGlassDrop"],
    queryFn: () => frameService.getDropdown(FrameTypes.SUNGLASSES),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
////    reset,
  } = useForm();

  const renderProduct = (product: string) => {
    if (ProductTypes.Kit == product) {
      setProduct(kitData.data);
    } else if (ProductTypes.Sun_Glasses == product) {
      setProduct(sunGlassData.data);
    }
  };

  const onSubmit = () => {};
  return (
    <>
      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        requiredMark={true}
      >
        <Form.Item
          key={"vendorId"}
          label={"Select Vendor"}
          status="validating"
          validateStatus={errors.vendorId ? "error" : ""}
          help={errors.vendorId ? String(errors?.vendorId?.message) : undefined}
        >
          <Controller
            name={"vendorId"}
            control={control}
            rules={{ required: "Vendor is required" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select Vendor"
                allowClear
                showSearch
                loading={vendorData.isPending}
                options={vendorData.data}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          key={1}
          label={"Select Product Type"}
          status="validating"
          validateStatus={errors.productType ? "error" : ""}
          help={
            errors.productType
              ? String(errors?.productType?.message)
              : undefined
          }
        >
          <Controller
            name={"productType"}
            control={control}
            rules={{ required: "Product Type is required" }}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(ele) => {
                  form.setFieldValue("productType", ele);
                  renderProduct(ele);
                }}
                placeholder="Select Product Type"
                allowClear
                virtual
                showSearch
                options={productTypesArray}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          key={1}
          label={"Select Product"}
          status="validating"
          validateStatus={errors.productId ? "error" : ""}
          help={
            errors.productId ? String(errors?.productId?.message) : undefined
          }
        >
          <Controller
            name={"productId"}
            control={control}
            rules={{ required: "Product is required" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select Product"
                allowClear
                virtual
                showSearch
                options={product}
              />
            )}
          />
        </Form.Item>

        <Form.Item className="mt-4 col-span-full">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            //   loading={loading}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreatePurchase;
