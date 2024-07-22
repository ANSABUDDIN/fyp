import GenericForm from "./GenericForm";
interface MyFormData {
  code: string;
  name: string;
  description: string;
  categoryType: string;
  preferences: string[];
  gender: string;
  feedback: string;
}

const DummyForm = () => {
  const fields = [
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
      name: "description",
      label: "Description",
      type: "text",
      rules: { required: "Description is required" },
    },
    {
      name: "categoryType",
      label: "Category Type",
      type: "select",
      options: [
        { label: "Category 1", value: "category1" },
        { label: "Category 2", value: "category2" },
      ],
      rules: { required: "Category Type is required" },
    },
    {
      name: "preferences",
      label: "Preferences",
      type: "checkbox",
      options: [
        { label: "Preference 1", value: "preference1" },
        { label: "Preference 2", value: "preference2" },
      ],
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      name: "feedback",
      label: "Feedback",
      type: "textarea",
      rules: { required: "Feedback is required" },
    },
  ];

  const defaultValues: MyFormData = {
    code: "123",
    name: "John Doe",
    description: "Sample description",
    categoryType: "category1",
    preferences: ["preference1"],
    gender: "male",
    feedback: "Sample feedback",
  };

  const onSubmit = async (data: MyFormData) => {
    console.log(data);
    // Simulate a network request
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
  return (
    <>
    
      <GenericForm<MyFormData>
        fields={fields}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default DummyForm;