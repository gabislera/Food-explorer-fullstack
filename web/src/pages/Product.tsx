import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { CaretLeft, Minus, Plus } from "@phosphor-icons/react";
import { useAuth } from "../hooks/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { useActive } from "../hooks/active";
import { Tag } from "../components/Tag";

interface Ingredients {
  name: string
}
interface ProductProps {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
  ingredients: Ingredients[]
}

export function Product() {
  const { isAdmin } = useAuth();
  const params = useParams();
  const [product, setProduct] = useState<ProductProps>();
  const navigate = useNavigate();
  const { setActiveProduct } = useActive();

  useEffect(() => {
    async function fetchProduct() {
      const response = await api.get(`/products/${params.id}`);
      setProduct(response.data);
    }
    fetchProduct();
  }, [params.id]);

  function handleEditProduct() {
    navigate("/edit");
    setActiveProduct(product);
  }

  const imageUrl = `${api.defaults.baseURL}/files/${product?.image}`;

  if (!product) return <></>;
  return (
    <div className="flex-layout min-h-screen flex flex-col">
      <Navbar />
      <main className="md:max-w-[70rem]  mx-auto flex-1">
        <Link
          to='/'
          className="mt-6 md:ml-0 flex items-center font-poppins text-2xl font-bold"
        >
          <CaretLeft size={32} />
          voltar
        </Link>

        <div className="flex flex-col items-center max-w-[19.75rem] md:max-w-full md:flex-row gap-4 md:gap-12 mt-4 md:mt-11">
          <img
            className="w-[16.5rem] md:w-[24.375rem] object-contain"
            src={imageUrl}
            alt=""
          />
          <div className="flex flex-col items-center md:items-start justify-center gap-6">
            <h1 className="font-poppins text-[1.68rem] md:text-[2.5rem] text-light-300 font-medium">
              {product?.name}
            </h1>
            <span className="font-poppins md:text-2xl text-light-300 font-normal md:font-medium text-center md:text-start">
              {product?.description}
            </span>
            <div className="flex gap-2 mb-10">
              {product.ingredients.map((ingredient, index) => (
                <Tag key={index} value={ingredient.name} />
              ))}
            </div>

            {/* componentizar */}

            {isAdmin ? (
              <button
                onClick={handleEditProduct}
                className="rounded-md font-poppins w-full text-sm font-normal md:w-fit text-light-100 bg-tomato-100 hover:bg-tomato-200 py-2 px-6"
                type="submit"
              >
                Editar prato
              </button>
            ) : (
              <div className=" items-center justify-center md:justify-start flex flex-row gap-4 w-full">
                <div className="flex items-center gap-[0.874rem]">
                  <button>
                    <Minus color="white" size={24} />
                  </button>
                  <span className="font-roboto md:text-xl text-light-300 font-bold">
                    01
                  </span>
                  <button>
                    <Plus color="white" size={24} />
                  </button>
                </div>
                <button
                  className="rounded-md font-poppins text-sm font-normal text-light-100 bg-tomato-100 hover:bg-tomato-200 py-2 px-6"
                  type="submit"
                >
                  incluir
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
