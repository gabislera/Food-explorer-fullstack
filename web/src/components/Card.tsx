import { Heart, PencilSimple } from "@phosphor-icons/react";
import "keen-slider/keen-slider.min.css";
import { ProductAdd } from "./ProductAdd";
import { useAuth } from "../hooks/auth";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number
  name: string
  description: string
  category: string
  price: number
  image: string
}

export function Card({ product }: { product: ProductCardProps }) {
  const { isAdmin } = useAuth();
  const navigate = useNavigate()

  function handleDetails() {
    navigate(`/products/${product.id}`)
  }

  const imageUrl = `${api.defaults.baseURL}/files/${product.image}`

  return (
    <div className="bg-dark-300 max-w-[13.125rem] md:max-w-[19rem] items-center rounded-lg flex flex-col gap-3 md:gap-4 p-6 relative">
      <img src={imageUrl} alt="" className="w-[5.5rem] md:w-auto" />
      {isAdmin ? (
        <PencilSimple
          color="white"
          size={24}
          className="absolute top-4 right-4 cursor-pointer"
          onClick={handleDetails}
        />
      ) : (
        <Heart color="white" size={24} className="absolute top-4 right-4" />
      )}

      <h1 onClick={handleDetails} className="font-poppins cursor-pointer text-sm md:text-2xl font-bold text-light-300 truncate" >
        {product.name} &#62;
      </h1>
      <span className="hidden md:inline font-roboto text-sm font-normal text-light-400">
        {product.description}
      </span>
      <span className="font-roboto md:text-[2rem] font-normal text-cake-200">
        R$ {product.price}
      </span>

      {!isAdmin && <ProductAdd />}
    </div>
  );
}
