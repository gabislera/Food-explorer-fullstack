import { Heart, PencilSimple } from "@phosphor-icons/react";
import dish from "../assets/Dish.png";
import "keen-slider/keen-slider.min.css";
import { ProductAdd } from "./ProductAdd";
import { useAuth } from "../hooks/auth";

export function Card() {
  const { isAdmin } = useAuth();

  return (
    <div className="bg-dark-300 max-w-[13.125rem] md:max-w-[19rem] items-center rounded-lg flex flex-col gap-3 md:gap-4 p-6 relative">
      <img src={dish} alt="" className="w-[5.5rem] md:w-auto" />
      {isAdmin ? (
        <PencilSimple
          color="white"
          size={24}
          className="absolute top-4 right-4"
        />
      ) : (
        <Heart color="white" size={24} className="absolute top-4 right-4" />
      )}

      <h1 className="font-poppins text-sm md:text-2xl font-bold text-light-300">
        Spaguetti Gambe &#62;
      </h1>
      <span className="hidden md:inline font-roboto text-sm font-normal text-light-400">
        Massa fresca com camarões e pesto
      </span>
      <span className="font-roboto md:text-[2rem] font-normal text-cake-200">
        R$ 79,97
      </span>

      {!isAdmin && <ProductAdd />}
    </div>
  );
}
