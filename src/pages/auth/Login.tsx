// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/http/auth";
import { useDispatch } from "react-redux";
import { setLogin, setToken, setUser } from "@/redux/slice/authSlice";
import toast from "react-hot-toast";
import { Button, Radio } from "antd";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email format.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one digit.",
    })
    .regex(/[!@#$%^&*()-_+=\[\]{}|;:,.<>?/~]/, {
      message: "Password must contain at least one special character.",
    }),
});

const Login = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();  
  const [role, setRole] = useState(10);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.data?.status == 200) {
        dispatch(setLogin(true));
        dispatch(setUser(data?.data?.data?.user));
        dispatch(setToken(data?.data?.data?.token));
        toast.success("Login Successfully");
      }
      console.log(data);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "ansab@yopmail.com",
      password: "Admin@123",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      email: values.email,
      password: values.password,
      role: role,
    });
    // navigate("/dashbaord");
  }
  return (
    <div className="mx-auto grid w-[450px] gap-6">
      <Link to="/" className="-m-1.5 p-1.5 flex gap-2">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="Flowbite Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Hyper Connect
        </span>
      </Link>
      <div className="grid gap-2 lg:text-start md:text-start text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 ">
                  Email <span className="text-[red]">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 ">
                  Password <span className="text-[red]">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
          <div className="text-start text-sm">
            <Link
              to="/auth/forgot"
              className="underline font-normal text-primary"
            >
              Forgot Password ?
            </Link>
          </div>
          <Button
            className="w-full mt-10 "
            disabled={mutation.isPending}
            type="primary"
            loading={mutation.isPending}
            size="large"
            htmlType="submit"
          >
            Login
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to="/auth/create-account"
          className="underline font-normal text-primary"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
