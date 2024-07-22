import { AccessoriesTypes, CategoryTypes, ClassTypes } from "@/enum/enum";
import GenericForm from "./GenericForm";
import { AccessoriesProductData } from "@/interfaces/Product";
import categoryService from "@/http/category";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateCategoryProps } from "@/interfaces";
import { useEffect, useMemo, useState } from "react";
import CategoryFormSkeleton from "@/components/skeleton/CategoryFormSkeleton";
import accessoriesService from "@/http/accessories";

const CreateAccessories: React.FC<CreateCategoryProps> = ({
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

  const accessoriesTypesArray = useMemo(
    () =>
      Object.values(AccessoriesTypes).map((ele) => ({
        label: ele,
        value: ele,
      })),
    []
  );
  const colorData = useQuery({
    queryKey: ["colorDropdown"],
    queryFn: () => categoryService.getDropdown(CategoryTypes.COLOR),
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
      name: "color",
      label: "Color",
      type: "select",
      options: colorData.data,
      rules: { required: "Color is required" },
    },
    {
      name: "class",
      label: "Class",
      type: "select",
      options: classTypesArray,
      rules: { required: "Class is required" },
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: accessoriesTypesArray,
      rules: { required: "Type is required" },
    },
    {
      name: "brand",
      label: "Brand",
      type: "select",
      options: brandData.data,
      rules: { required: "Brand is required" },
    },
    {
      name: "volume",
      label: "Volume",
      type: "number",
      // rules: { required: "volume is required" },
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

  const defaultValues: AccessoriesProductData = {
    _id: initialData._id,
    name: initialData.name,
    color: initialData.color,
    class: initialData.class,
    type: initialData.type,
    brand: initialData.brand,
    description: initialData.description,
    perchasePrice: initialData.perchasePrice,
    salePrice: initialData.salePrice,
    wholeSalePrice: initialData.wholeSalePrice,
    volume: initialData.volume,
  };
  const handleSuccess = (data: any) => {
    if (data.status) {
      toast.success(data.message);
      setOpen(false);
      refetch();
    }
  };

  const createCategory = useMutation({
    mutationFn: accessoriesService.create,
    onSuccess: handleSuccess,
  });

  const updateCategory = useMutation({
    mutationFn: accessoriesService.update,
    onSuccess: handleSuccess,
  });

  const onSubmit = async (data: AccessoriesProductData) => {
    let postData = {
        ...data,
        perchasePrice: +data.perchasePrice,
        salePrice: +data.salePrice,
        volume: +data.volume,
        wholeSalePrice: +data.wholeSalePrice,
      };
    if (isEdit) {
      updateCategory.mutate(postData);
    } else {
      createCategory.mutate(postData);
    }
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
      <GenericForm<AccessoriesProductData>
        fields={fields}
        loading={createCategory.isPending || updateCategory.isPending}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        mainClassName="grid grid-cols-3 gap-x-4"
      />
    </>
  );
};

export default CreateAccessories;
