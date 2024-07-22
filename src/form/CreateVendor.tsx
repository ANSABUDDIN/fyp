import GenericForm from "./GenericForm";
import { VendorData } from "@/interfaces/Product";
import { useMutation } from "@tanstack/react-query";
import { CreateCategoryProps } from "@/interfaces";
import { useEffect, useState } from "react";
import CategoryFormSkeleton from "@/components/skeleton/CategoryFormSkeleton";
import toast from "react-hot-toast";
import vendorService from "@/http/vendor";


const CreateVendor: React.FC<CreateCategoryProps> = ({
  refetch,
  setOpen,
  initialData,
  isEdit,
  open,
}) => {
  const [loader, setLoader] = useState(false);
  const fields = [
    {
      name: "name",
      label: "Vendor Name",
      type: "text",
      rules: { required: "Name is required" },
    },
    {
      name: "shopName",
      label: "Shop Name",
      type: "text",
      rules: { required: "Shop Name is required" },
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      rules: { required: "email is required" },
    },
    {
      name: "whatsappNumber",
      label: "Whatsapp Number",
      type: "number",
      rules: { required: "Number is required" },
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "number",
      rules: { required: "Number is required" },
    },
    {
      name: "city",
      label: "City",
      type: "text",
      rules: { required: "Number is required" },
    },
    {
      name: "website",
      label: "Website",
      type: "text",
      rules: { required: "Number is required" },
    },
    {
      name: "socialLink",
      label: "Social Link",
      type: "text",
      rules: { required: "Number is required" },
    },
    {
      name: "reference",
      label: "Reference",
      type: "text",
      rules: { required: "Number is required" },
    },
    {
      name: "address",
      label: "Address",
      className: "col-span-full",
      type: "textarea",
      rules: { required: "Description is required" },
    },
  ];
  // set default for category update
  const defaultValues: VendorData = {
    _id: initialData._id,
    name: initialData.name,
    email: initialData.email,
    whatsappNumber: initialData.whatsappNumber,
    shopName: initialData.shopName,
    phoneNumber: initialData.phoneNumber,
    address: initialData.address,
    city: initialData.city,
    website: initialData.website,
    socialLink: initialData.socialLink,
    reference: initialData.reference,
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
    mutationFn: vendorService.create,
    onSuccess: handleSuccess,
  });
  //  for updating a category
  const updateCategory = useMutation({
    mutationFn: vendorService.update,
    onSuccess: handleSuccess,
  });
  // submit the function to the category
  const onSubmit = async (data: VendorData) => {
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
      <GenericForm<VendorData>
        fields={fields}
        loading={createCategory.isPending || updateCategory.isPending}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        mainClassName="grid grid-cols-3 gap-x-4"
      />
    </>
  );
};

export default CreateVendor;