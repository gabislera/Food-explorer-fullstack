import { Navbar } from "../components/Navbar";
import food from "../assets/food.png";
import foodMobile from "../assets/foodMobile.png";
import { useMediaQuery } from "react-responsive";

import "keen-slider/keen-slider.min.css";
import { Section } from "../components/Section";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { api } from "../services/api";

interface ProductProps {
  id: number
  name: string
  description: string
  category: string
  price: number
  image: string
}

export function Home() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [products, setProducts] = useState<ProductProps[]>([])

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get('/products')
      setProducts(response.data.products)
    }

    fetchTags()
  }, [])

  return (
    <div className=" bg-dark-400 ">
      <Navbar />

      <div className="mr-4 ml-9 md:max-w-[70rem] md:mx-auto h-[7.5rem] md:h-[16.25rem] mt-11 md:mt-[10.25rem] md:rounded-lg gradient rounded-sm grid grid-cols-2 relative">
        <div>
          {isMobile ? (
            <img
              src={foodMobile}
              alt=""
              className="absolute bottom-0 -left-6"
            />
          ) : (
            <img src={food} alt="" className="absolute bottom-0 -left-14" />
          )}
        </div>

        <div className="flex flex-col md:items-center justify-center md:gap-4 md:-ml-[5rem] -ml-5 ">
          <h1 className="text-lg md:text-[2.5rem] font-semibold font-poppins text-light-300 ">
            Sabores inigualáveis
          </h1>
          <span className="text-xs md:text-base font-roboto font-normal text-light-300">
            Sinta o cuidado do preparo com ingredientes selecionados
          </span>
        </div>
      </div>

      <Section title="Refeições" data={products} categoryType='refeicoes' />
      <Section title="Sobremesas" data={products} categoryType='sobremesas' />
      <Section title="Bebidas" data={products} categoryType='bebidas' />

      {/* modificar espaçamento footer */}
      <div className="h-[8rem]"></div>
      <Footer />
    </div>
  );
}
