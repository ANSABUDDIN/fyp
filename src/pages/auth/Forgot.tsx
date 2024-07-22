// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
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
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "antd";

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

const Forgot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.data?.status) {
        dispatch(setLogin(data?.data?.status));
        dispatch(setUser(data?.data?.data?.user));
        dispatch(setToken(data?.data?.data?.tokens?.refreshToken));
        toast.success("Login Successfully");
      }
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
    // mutation.mutate({
    //   userNameEmail: values.email,
    //   password: values.password,
    // });
    navigate("/auth/login");
  }
  return (
    <div className="mx-auto grid w-[450px] gap-6">
      <div className="grid gap-2 lg:text-start md:text-start text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email & forgot password
        </p>
      </div>
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
          
          <Button
            className="w-full mt-10 "
            disabled={mutation.isPending}
            type="primary"
            loading={mutation.isPending}
            size="large"
            htmlType="submit"
          >
            Forgot
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

export default Forgot;
