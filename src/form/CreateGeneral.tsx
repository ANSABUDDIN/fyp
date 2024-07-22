import { CategoryTypes, ClassTypes, StyleTypes } from "@/enum/enum";
import GenericForm from "./GenericForm";
import { GeneralProductData } from "@/interfaces/Product";
import categoryService from "@/http/category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateCategoryProps } from "@/interfaces";
import { useEffect, useMemo, useState } from "react";
import CategoryFormSkeleton from "@/components/skeleton/CategoryFormSkeleton";
import generalProductService from "@/http/generalProduct";
import toast from "react-hot-toast";

const CreateGeneral: React.FC<CreateCategoryProps> = ({
  refetch,
  setOpen,
  initialData,
  isEdit,
  open,
}) => {
  const [loader, setLoader] = useState(false);
  const classTypesArray = useMemo(
    () =>
      Object.values(ClassTypes).map((ele) => ({
        label: ele,
        value: ele,
      })),
    []
  );
  const styleTypesArray = useMemo(
    () =>
      Object.values(StyleTypes).map((ele) => ({
        label: ele,
        value: ele,
      })),
    []
  );

  const colorData = useQuery({
    queryKey: ["colorDropdown"],
    queryFn: () => categoryService.getDropdown(CategoryTypes.COLOR),
  });

  const sizeData = useQuery({
    queryKey: ["sizeDropdown"],
    queryFn: () => categoryService.getDropdown(CategoryTypes.SIZE),
  });

  const brandData = useQuery({
    queryKey: ["brandDropdown"],
    queryFn: () => categoryService.getDropdown(CategoryTypes.BRAND),
  });

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      rules: { required: "Name is required" },
    },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: sizeData.data,
      rules: { required: "Size Type is required" },
    },
    {
      name: "color",
      label: "Color",
      type: "select",
      options: colorData.data,
      rules: { required: "Color Type is required" },
    },
    {
      name: "class",
      label: "Class",
      type: "select",
      options: classTypesArray,
      rules: { required: "Class Type is required" },
    },
    {
      name: "style",
      label: "Style",
      type: "select",
      options: styleTypesArray,
      rules: { required: "Style Type is required" },
    },
    {
      name: "brand",
      label: "Brand",
      type: "select",
      options: brandData.data,
      rules: { required: "Brand Type is required" },
    },
    {
      name: "perchasePrice",
      label: "Perchase Price",
      type: "number",
      rules: { required: "Perchase Price is required" },
    },
    {
      name: "salePrice",
      label: "Sale Price",
      type: "number",
      rules: { required: "Sale Price is required" },
    },
    {
      name: "wholeSalePrice",
      label: "Whole Sale Price",
      type: "number",
      rules: { required: "Sale Price is required" },
    },
    {
      name: "description",
      label: "Description",
      className: "col-span-full",
      type: "textarea",
      rules: { required: "Description is required" },
    },
  ];

  const defaultValues: GeneralProductData = {
    _id: initialData._id,
    name: initialData.name,
    size: initialData.size,
    color: initialData.color,
    class: initialData.class,
    style: initialData.style,
    brand: initialData.brand,
    description: initialData.description,
    perchasePrice: initialData.perchasePrice,
    salePrice: initialData.salePrice,
    wholeSalePrice: initialData.wholeSalePrice,
  };
  const handleSuccess = (data: any) => {
    if (data.status) {
      toast.success(data.message);
      setOpen(false);
      refetch();
    }
  };

  const create = useMutation({
    mutationFn: generalProductService.create,
    onSuccess: handleSuccess,
  });

  const update = useMutation({
    mutationFn: generalProductService.update,
    onSuccess: handleSuccess,
  });

  const onSubmit = async (data: GeneralProductData) => {
    let postData = {
      ...data,
      perchasePrice: +data.perchasePrice,
      salePrice: +data.salePrice,
      wholeSalePrice: +data.wholeSalePrice,
    };
    if (!isEdit) {
      create.mutate(postData);
    } else {
      update.mutate(postData);
    }
    console.log("Data", data);
  };

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [open]);
  if (loader) {
    return <CategoryFormSkeleton />;
  }
  return (
    <>
      <GenericForm<GeneralProductData>
        fields={fields}
        loading={create.isPending || update.isPending}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        mainClassName="grid grid-cols-3 gap-x-4"
      />
    </>
  );
};

export default CreateGeneral;
