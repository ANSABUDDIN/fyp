import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/http/auth";
import { Radio } from "antd";
import toast from "react-hot-toast";
import GenericForm from "@/form/GenericForm";
import { countries, industryTypes, investorTypes } from "@/interfaces/data";
import { useState } from "react";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(10);

  const mutation = useMutation({
    mutationFn: createAccount,
    onSuccess: (data) => {
      if (data) {
        navigate("/auth/login");
        toast.success("Account Created Successfully");
      }
    },
  });

  function onSubmit(values: any) {
    mutation.mutate({ ...values, role: role });
  }
  const invester = [
    // {
    //   name: "role",
    //   label: "Select Role ",
    //   type: "radio",
    //   className: "col-span-3",
    //   options: [
    //     { label: "Invester", value: 10 },
    //     { label: "Startup", value: 20 },
    //   ],
    // },
    {
      name: "email",
      label: "Enter Email",
      type: "text",
      rules: { required: "Email is required" },
    },
    {
      name: "username",
      label: "Enter Username",
      type: "text",
      rules: { required: "Username is required" },
    },
    {
      name: "password",
      label: "Enter Password",
      type: "password",
      rules: { required: "Password is required" },
    },
    {
      name: "country",
      label: "Enter Country",
      type: "select",
      options: countries.map((ele: any) => ({
        label: ele.name,
        value: ele.name,
      })),
      rules: { required: "Country Type is required" },
    },
    {
      name: "investorType",
      label: "Enter Investor Type",
      type: "select",
      options: investorTypes.map((ele: any) => ({
        label: ele,
        value: ele,
      })),
      rules: { required: "Country Type is required" },
    },
    {
      name: "totalInvestment",
      label: "Total Investment",
      type: "number",
      rules: { required: "Investment is required" },
    },
    {
      name: "maxInvestment",
      label: "Max Investment",
      type: "number",
      rules: { required: "Investment is required" },
    },
    {
      name: "fundingRaise",
      label: "Funding Raise",
      type: "text",
      rules: { required: "Funding is required" },
    },
    {
      name: "website",
      label: "Enter Website",
      type: "text",
      rules: { required: "Website is required" },
    },
    // {
    //   name: "description",
    //   label: "Description",
    //   type: "textarea",
    //   rules: { required: "Description is required" },
    // },
  ];
  const startup = [
    {
      name: "email",
      label: "Enter Email",
      type: "text",
      rules: { required: "Email is required" },
    },
    {
      name: "username",
      label: "Enter Username",
      type: "text",
      rules: { required: "Username is required" },
    },
    {
      name: "password",
      label: "Enter Password",
      type: "password",
      rules: { required: "Password is required" },
    },
    {
      name: "country",
      label: "Enter Country",
      type: "select",
      options: countries.map((ele: any) => ({
        label: ele.name,
        value: ele.name,
      })),
      rules: { required: "Country Type is required" },
    },
    {
      name: "targetCountry",
      label: "Enter Target Country",
      type: "select",
      options: countries.map((ele: any) => ({
        label: ele.name,
        value: ele.name,
      })),
      rules: { required: "Target Country is required" },
    },
    {
      name: "industryType",
      label: "Select Industry",
      type: "select",
      options: industryTypes.map((ele: any) => ({
        label: ele,
        value: ele,
      })),
      rules: { required: "Country Type is required" },
    },
    {
      name: "company",
      label: "Enter Company Name",
      type: "text",
      rules: { required: "Company is required" },
    },
    {
      name: "pitchDeck",
      label: "Enter Pitch Deck",
      type: "number",
      rules: { required: "Pitch Deck is required" },
    },
    {
      name: "website",
      label: "Enter Website",
      type: "text",
      rules: { required: "Website is required" },
    },
    {
      name: "founderName",
      label: "Enter Founder Name",
      type: "text",
      rules: { required: "Founder Name is required" },
    },
    {
      name: "teamsize",
      label: "Enter Team Size",
      type: "text",
      className: "col-span-2",
      rules: { required: "Team Size is required" },
    },
    {
      name: "companyBio",
      label: "Enter Company Bio",
      type: "textarea",
      rules: { required: "Bio is required" },
      className: "col-span-3",
    },
  ];

  return (
    <div className="mx-auto grid  gap-6 ">
      <div className="grid gap-2 lg:text-start md:text-start text-center">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Let's get your account set up
        </p>
      </div>
      <Radio.Group
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <Radio value={10}>Invester</Radio>
        <Radio value={20}>Startup</Radio>
      </Radio.Group>
      <GenericForm<any>
        mainClassName="grid grid-cols-3 gap-3"
        fields={role == 10 ? invester : startup}
        // loading={createCategory.isPending || updateCategory.isPending}
        // defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
      <div className="mt-2 text-center text-sm">
        Already have an account ?
        <Link
          to="/auth/login"
          className="ps-1 underline font-normal text-primary"
        >
          Log in instead
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
