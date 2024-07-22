import { CategoryTypes, ClassTypes } from "@/enum/enum";
import GenericForm from "./GenericForm";
import { KitProductData } from "@/interfaces/Product";
import categoryService from "@/http/category";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateCategoryProps } from "@/interfaces";
import { useEffect, useMemo, useState } from "react";
import CategoryFormSkeleton from "@/components/skeleton/CategoryFormSkeleton";
import kitService from "@/http/Kit";

const CreateKit: React.FC<CreateCategoryProps> = ({
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
      name: "class",
      label: "Class",
      type: "select",
      options: classTypesArray,
      rules: { required: "Class Type is required" },
    },
    {
      name: "brand",
      label: "Brand",
      type: "select",
      options: brandData.data,
      rules: { required: "Brand Type is required" },
    },
    {
      name: "solutionVolume",
      label: "Solution Volume",
      type: "number",
      // rules: { required: "Solution Volume is required" },
    },
    {
      name: "eyedropVolume",
      label: "Eye Drop Volume",
      type: "number",
      // rules: { required: "Eye Drop Volume is required" },
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
      name: "solution",
      label: "Solution Include In This Kit ?",
      type: "radio",
      // rules: { required: "solution is required" },
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    {
      name: "eyeDrop",
      label: "EyeDrop Include In This Kit ?",
      type: "radio",
      // rules: { required: "EyeDrop is required" },
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    {
      name: "stick",
      label: "Stick Include In This Kit ?",
      type: "radio",
      // rules: { required: "Stick is required" },
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    {
      name: "tusser",
      label: "Tusser Include In This Kit ?",
      type: "radio",
      // rules: { required: "Tusser is required" },
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    {
      name: "container",
      label: "Container Include In This Kit ?",
      type: "radio",
      // rules: { required: "Container is required" },
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  ];

  const defaultValues: KitProductData = {
    _id: initialData._id,
    name: initialData.name,
    class: initialData.class,
    solution: initialData.solution || false,
    eyeDrop: initialData.eyeDrop || false,
    container: initialData.container || false,
    stick: initialData.stick || false,
    tusser: initialData.tusser || false,
    solutionVolume: initialData.solutionVolume,
    eyedropVolume: initialData.eyedropVolume,
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
    mutationFn: kitService.create,
    onSuccess: handleSuccess,
  });

  const update = useMutation({
    mutationFn: kitService.update,
    onSuccess: handleSuccess,
  });

  const onSubmit = async (data: KitProductData) => {
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
      <GenericForm<KitProductData>
        fields={fields}
        loading={create.isPending || update.isPending}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        mainClassName="grid grid-cols-3 gap-x-4"
      />
    </>
  );
};

export default CreateKit;
