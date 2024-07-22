import {
  Calculator,
  Grid2X2,
  Info,
  ListRestart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import moment from "moment";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CalculatorBox from "./CalculatorBox";

const PosHeader = () => {
  return (
    <header className=" z-50 top-0 flex h-16 items-center gap-4 border-b bg-background">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex gap-3 items-center">
          <Button variant="default" size="icon" className="rounded-full">
            ES
          </Button>
          <div>
            <span className="text-xl font-semibold">Point Of Sale</span>
            <p className="text-xs  opacity-[0.8]">
              {moment().format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>
        </div>
      </nav>
      {/* <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search Product..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[520px]"
        />
      </div> */}
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        
        <Sheet>
          <SheetTrigger>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="ml-auto gap-1 rounded-full"
            >
              <div>
                <Calculator className="h-5 w-5" />
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80">
            <SheetHeader>
              <SheetTitle>Quik Calculator</SheetTitle>
              <SheetDescription className="text-xs">
                The Quick Calculator is a fast & easy to use, provides instant
                results, and is perfect for quick calculations on the fly.
              </SheetDescription>
              <CalculatorBox />
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Button
          asChild
          variant="outline"
          size="icon"
          className="ml-auto gap-1 rounded-full"
        >
          <Link to="#">
            <ListRestart className="h-5 w-5" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="icon"
          className="ml-auto gap-1 rounded-full"
        >
          <Link to="#">
            <Info className="h-5 w-5" />
          </Link>
        </Button>
        <Button
          asChild
          variant="default"
          size="default"
          className="ml-auto gap-1 rounded-full"
        >
          <Link to="/">
            <Grid2X2 className="h-5 w-5" />
            Dashbaord
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default PosHeader;
