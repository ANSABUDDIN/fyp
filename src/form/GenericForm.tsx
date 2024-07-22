import {
  useForm,
  Controller,
  FieldValues,
  Path,
  DefaultValues,
} from "react-hook-form";
import { Form, Input, Select, Radio, Checkbox, Button } from "antd";

interface Option {
  label: string | boolean;
  value: string | boolean | number;
}

interface Field {
  name: string;
  label: string;
  type: string;
  className?: string;
  // type: "text" | "select" | "radio" | "checkbox" | "textarea"; // String literals for allowed types
  options?: Option[];
  rules?: any;
}

interface GenericFormProps<T extends FieldValues> {
  fields: Field[];
  defaultValues?: T;
  mainClassName?: string;
  form?: any;
  loading?: boolean;
  onSubmit: (data: T) => Promise<void> | any;
}

const GenericForm = <T extends FieldValues>({
  fields,
  defaultValues,
  onSubmit,
  loading,
  form,
  mainClassName,
}: GenericFormProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({ defaultValues: defaultValues as DefaultValues<T> });

  const handleFormSubmit = async (data: T) => {
    try {
      await onSubmit(data);
      // reset();
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <Form
      onFinish={handleSubmit(handleFormSubmit)}
      layout="vertical"
      form={form}
      requiredMark={true}
      className={!mainClassName ? "grid grid-cols-1 gap-x-1" : mainClassName}
    >
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          className={field.className}
          label={field.label}
          rules={[
            {
              required: true,
              message: "Please customer name",
            },
          ]}
          status="validating"
          validateStatus={errors[field.name] ? "error" : ""}
          help={
            errors[field.name] ? String(errors[field.name]?.message) : undefined
          }
        >
          <Controller
            name={field.name as Path<T>}
            control={control}
            rules={field.rules}
            render={({ field: controllerField }) => {
              switch (field.type) {
                case "text":
                  return (
                    <Input placeholder={field?.label} {...controllerField} />
                  );
                case "password":
                  return (
                    <Input type="password" placeholder={field?.label} {...controllerField} />
                  );
                case "select":
                  return (
                    <Select
                      {...controllerField}
                      placeholder={field?.label}
                      allowClear
                      showSearch
                      options={field.options}
                    />
                  );
                case "radio":
                  return (
                    <Radio.Group {...controllerField}>
                      {field.options?.map((option, index) => (
                        <Radio key={index} value={option.value}>
                          {option.label}
                        </Radio>
                      ))}
                    </Radio.Group>
                  );
                case "checkbox":
                  return (
                    <Checkbox.Group {...controllerField}>
                      {field.options?.map((option, index) => (
                        <Checkbox key={index} value={option.value}>
                          {option.label}
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  );
                case "textarea":
                  return (
                    <Input.TextArea
                      placeholder={field?.label}
                      {...controllerField}
                    />
                  );
                case "number":
                  return (
                    <Input
                      type="number"
                      // min={0}
                      placeholder={field?.label}
                      {...controllerField}
                    />
                  );
                default:
                  return (
                    <Input placeholder={field?.label} {...controllerField} />
                  );
              }
            }}
          />
        </Form.Item>
      ))}
      <Form.Item className="mt-4 col-span-full">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GenericForm;
