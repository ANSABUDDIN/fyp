import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import { motion } from "framer-motion"
const Banner = () => {
  return (
    <div
      id="home"
      className="min-h-[calc(100vh-100px)] mx-auto grid grid-cols-2 items-center max-w-7xl px-6"
    >
      <motion.div
        animate={{ x: 10 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <h1 className="font-bold text-5xl leading-tight">
          Where <span className="text-primary"> Startups </span> and <br />
          <span className="text-primary">Investors </span>
          Unite to Forge Success.
        </h1>
        <p className="opacity-[0.5] text-[14px]">
          Having navigated the dynamic landscape of global entrepreneurship for
          the past 5 years, our commitment remains unwavering. We pledge an
          experience that transcends expectations, ensuring your journey with us
          is consistently exceptional.
        </p>
        <div className="mt-4">
          <Button size={"sm"} className="p-6 ">
            <span>Get Started</span>
            <ArrowBigRight size={20} className="ml-2" />
          </Button>
        </div>
      </motion.div>
      <div>
        <img src="./hero.png" alt="" draggable={false} />
      </div>
    </div>
  );
};

export default Banner;
