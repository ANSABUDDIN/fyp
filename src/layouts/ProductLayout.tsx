import { NavLink, Outlet } from "react-router-dom";
import { productMenuItem } from "@/static/Menu";
import { Dot } from "lucide-react";

const ProductLayout = () => {
  return (
    <main className="flex  flex-1 flex-col gap-4  md:gap-2 ">
      {/* <Separator /> */}
      <div className="grid w-full  items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[150px_1fr]">
        <nav
          className="grid gap-4  text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <div className="grid w-full max-w-6xl gap-2">
            <h1 className="text-2xl text-black my-2 font-bold">Products</h1>
          </div>
          {productMenuItem.map((ele, index) => (
            <div className="flex gap-1 items-center justify-start" key={index}>
              <Dot />
              <NavLink to={ele.path}>{ele.title}</NavLink>
            </div>
          ))}
        </nav>
        <div className=" w-full grid gap-2">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default ProductLayout;
