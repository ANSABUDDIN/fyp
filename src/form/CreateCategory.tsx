import { CategoryTypes } from "@/enum/enum";
import GenericForm from "./GenericForm";
import { ProductCategoryData } from "@/interfaces/Product";
import categoryService from "@/http/category";
import { useMutation } from "@tanstack/react-query";
import { CreateCategoryProps } from "@/interfaces";
import { useEffect, useMemo, useState } from "react";
import CategoryFormSkeleton from "@/components/skeleton/CategoryFormSkeleton";
import toast from "react-hot-toast";

const CreateCategory: React.FC<CreateCategoryProps> = ({
  refetch,
  setOpen,
  initialData,
  isEdit,
  open,
}) => {
  const [loader, setLoader] = useState(false);
  const categoryTypesArray = useMemo(
    () =>
      Object.values(CategoryTypes).map((ele) => ({
        label: ele,
        value: ele,
      })),
    []
  );
  const formFields = [
    {
      name: "code",
      label: "Code",
      type: "text",
      rules: { required: "Code is required" },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      rules: { required: "Name is required" },
    },
    {
      name: "categoryType",
      label: "Category Type",
      type: "select",
      options: categoryTypesArray,
      rules: { required: "Category Type is required" },
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      rules: { required: "Description is required" },
    },
  ];
  // set default for category update
  const defaultValues: ProductCategoryData = {
    _id: initialData._id,
    code: initialData.code,
    name: initialData.name,
    description: initialData.description,
    categoryType: initialData.categoryType,
  };
  // after submitting the form
  const handleSuccess = (data: any) => {
    if (data.status) {
      toast.success(data.message);
      setOpen(false);
      refetch();
    }
  };
  //  for creating a new category
  const createCategory = useMutation({
    mutationFn: categoryService.create,
    onSuccess: handleSuccess,
  });
  //  for updating a category
  const updateCategory = useMutation({
    mutationFn: categoryService.update,
    onSuccess: handleSuccess,
  });
  // submit the function to the category
  const onSubmit = async (data: ProductCategoryData) => {
    if (isEdit) {
      updateCategory.mutate(data);
    } else {
      createCategory.mutate(data);
    }
  };
  // for loading purposes
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
      <GenericForm<ProductCategoryData>
        fields={formFields}
        loading={createCategory.isPending || updateCategory.isPending}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default CreateCategory;
