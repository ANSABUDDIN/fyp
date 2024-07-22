import GenericForm from "./GenericForm";
import { CustomerData } from "@/interfaces/Product";
import { useMutation } from "@tanstack/react-query";
import { CreateCategoryProps } from "@/interfaces";
import { useEffect, useState } from "react";
import CategoryFormSkeleton from "@/components/skeleton/CategoryFormSkeleton";
import toast from "react-hot-toast";
import customerService from "@/http/customer";

const CreateCustomer: React.FC<CreateCategoryProps> = ({
  refetch,
  setOpen,
  initialData,
  isEdit,
  open,
}) => {
  const [loader, setLoader] = useState(false);
  const formFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      rules: { required: "Name is required" },
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      rules: { required: "Email is required" },
    },
    {
      name: "whatsappNumber",
      label: "Whatsapp Number",
      type: "number",
      rules: { required: "Whatsapp Number is required" },
    },
  ];
  // set default for category update
  const defaultValues: CustomerData = {
    _id: initialData._id,
    name: initialData.name,
    email: initialData.email,
    whatsappNumber: initialData.whatsappNumber,
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
    mutationFn: customerService.create,
    onSuccess: handleSuccess,
  });
  //  for updating a category
  const updateCategory = useMutation({
    mutationFn: customerService.update,
    onSuccess: handleSuccess,
  });
  // submit the function to the category
  const onSubmit = async (data: CustomerData) => {
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
      <GenericForm<CustomerData>
        fields={formFields}
        loading={createCategory.isPending || updateCategory.isPending}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default CreateCustomer;
