import { CategoryTypes, LenseCategoryTypes } from "@/enum/enum";
import GenericForm from "./GenericForm";
import { LenseProductData } from "@/interfaces/Product";
import categoryService from "@/http/category";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateCategoryProps } from "@/interfaces";
import { useEffect, useMemo, useState } from "react";
import CategoryFormSkeleton from "@/components/skeleton/CategoryFormSkeleton";
import lenseService from "@/http/lense";

const CreateLense: React.FC<CreateCategoryProps> = ({
  refetch,
  setOpen,
  initialData,
  isEdit,
  open,
}) => {
  const [loader, setLoader] = useState(false);
  const lenseCategoryTypesArray = useMemo(
    () =>
      Object.values(LenseCategoryTypes).map((ele) => ({
        label: ele,
        value: ele,
      })),
    []
  );

  const toneData = useQuery({
    queryKey: ["lenseTone"],
    queryFn: () => categoryService.getDropdown(CategoryTypes.LENSE_TONE),
  });

  const brandData = useQuery({
    queryKey: ["brandDropdown"],
    queryFn: () => categoryService.getDropdown(CategoryTypes.BRAND),
  });

  const colorData = useQuery({
    queryKey: ["colorDropdown"],
    queryFn: () => categoryService.getDropdown(CategoryTypes.COLOR),
  });

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      rules: { required: "Name is required" },
    },
    {
      name: "brand",
      label: "Brand",
      type: "select",
      options: brandData.data,
      rules: { required: "Brand Type is required" },
    },
    {
      name: "lenseColor",
      label: "Color",
      type: "select",
      options: colorData.data,
      rules: { required: "Color Type is required" },
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: lenseCategoryTypesArray,
      rules: { required: "Category Type is required" },
    },
    {
      name: "toneType",
      label: "Tone",
      type: "select",
      options: toneData.data,
      rules: { required: "Tone is required" },
    },
    {
      name: "power",
      label: "Power",
      type: "number",
      rules: { required: "Perchase Price is required" },
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
      name: "isPower",
      label: "Lense Have a Power ?",
      type: "radio",
      // rules: { required: "solution is required" },
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    {
      name: "isKitInclude",
      label: "Kit Include In This Lense ?",
      type: "radio",
      // rules: { required: "EyeDrop is required" },
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  ];

  const defaultValues: LenseProductData = {
    _id: initialData._id,
    name: initialData.name,
    isPower: initialData.isPower || false,
    isKitInclude: initialData.isKitInclude || false,
    power: initialData.power,
    lenseColor: initialData.lenseColor,
    category: initialData.category,
    toneType: initialData.toneType,
    brand: initialData.brand,
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
    mutationFn: lenseService.create,
    onSuccess: handleSuccess,
  });

  const update = useMutation({
    mutationFn: lenseService.update,
    onSuccess: handleSuccess,
  });

  const onSubmit = async (data: LenseProductData) => {
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
      <GenericForm<LenseProductData>
        fields={fields}
        loading={create.isPending || update.isPending}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        mainClassName="grid grid-cols-3 gap-x-4"
      />
    </>
  );
};

export default CreateLense;
