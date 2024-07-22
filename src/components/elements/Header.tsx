import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import {
  // ArrowUpRight,
  BellIcon,
  CircleUser,
  // Computer,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mainMenuItem } from "@/static/Menu";
// import { useDispatch } from "react-redux";
// import { resetState } from "@/redux/slice/authSlice";
// import { useMutation } from "@tanstack/react-query";
// import { logout } from "@/http/auth";
// import { RootState } from "@/redux/store";
import { Badge, Modal } from "antd";
// import toast from "react-hot-toast";
import { primaryColor } from "@/config/app.config";
import Icon from "../Icon";

const Header = () => {
  const [modal] = Modal.useModal();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state: RootState) => state.auth.user);
  // const mutation = useMutation({
  //   mutationFn: logout,
  //   onSuccess: (data) => {
  //     if (data?.data?.status) {
  //       dispatch(resetState());
  //       toast.success(data?.data?.message);
  //     }
  //   },
  // });
  const handleLogout = () => {
    modal.confirm({
      title: "Logout",
      content: "Are you sure you want to logout",
      okText: "Yes",
      centered: true,
      onOk: async () => {
        navigate("/auth/login");
        // dispatch(resetState());
        // mutation.mutate(user?._id?.toString());
      },
      cancelText: "No",
    });
  };
  return (
    <header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {/* {contextHolder} */}
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center  gap-2 text-lg font-bold md:text-base"
        >
          <Button variant="default" size="icon" className="rounded-full">
            {/* MW */}
            <Icon name={"Activity"} className="h-4 w-4 text-muted-foreground" />
            {/*   */}
          </Button>
          Activity Tracker
        </Link>

        {mainMenuItem.map((ele, i) => (
          <NavLink key={i} to={ele.path}>
            {ele.title}
          </NavLink>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Button variant="default" size="icon" className="rounded-full">
                ES
              </Button>
              <span className="sr-only">Acme Inc</span>
            </Link>
            {mainMenuItem.map((ele, i) => (
              <NavLink key={i} to={ele.path}>
                {ele.title}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {/* <Tooltip>
          <TooltipTrigger>
            <Button asChild size="sm" className="ml-auto gap-1 ">
              <Link to="/point-of-sale" className="text-xs">
                <Computer className="h-4 w-4" />
                POS
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p> Point Of Sale</p>
          </TooltipContent>
        </Tooltip> */}
        <Button variant="outline" size="icon" className="rounded-full">
          <Badge count={5} color={primaryColor} className="text-white">
            <BellIcon className="h-5 text-black w-5" />
          </Badge>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
