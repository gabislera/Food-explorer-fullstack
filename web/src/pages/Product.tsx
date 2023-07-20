import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import product from "../assets/product.png";
import { CaretLeft, Minus, Plus } from "@phosphor-icons/react";
import { useAuth } from "../hooks/auth";

export function Product() {
  const { isAdmin } = useAuth();

  return (
    <div className="flex-layout min-h-screen flex flex-col">
      <Navbar />
      <main className="md:max-w-[70rem]  mx-auto flex-1">
        <a
          className="mt-6 md:ml-0 flex items-center font-poppins text-2xl font-bold"
          href=""
        >
          <CaretLeft size={32} />
          voltar
        </a>

        <div className="flex flex-col items-center max-w-[19.75rem] md:max-w-full md:flex-row gap-4 md:gap-12 mt-4 md:mt-11">
          <img
            className="w-[16.5rem] md:w-[24.375rem] object-contain"
            src={product}
            alt=""
          />
          <div className="flex flex-col items-center md:items-start justify-center gap-6">
            <h1 className="font-poppins text-[1.68rem] md:text-[2.5rem] text-light-300 font-medium">
              Salada Ravanello
            </h1>
            <span className="font-poppins md:text-2xl text-light-300 font-normal md:font-medium text-center md:text-start">
              Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.
              O pão naan dá um toque especial.
            </span>
            <div className="flex gap-2 mb-10">
              <span className="bg-dark-1000 px-2 py-1 rounded">alface</span>
              <span className="bg-dark-1000 px-2 py-1 rounded">alface</span>
              <span className="bg-dark-1000 px-2 py-1 rounded">alface</span>
              <span className="bg-dark-1000 px-2 py-1 rounded">alface</span>
            </div>

            {/* componentizar */}

            {isAdmin ? (
              <button
                className="rounded-md font-poppins w-full text-sm font-normal md:w-fit text-light-100 bg-tomato-100 py-2 px-6"
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
                  className="rounded-md font-poppins text-sm font-normal text-light-100 bg-tomato-100 py-2 px-6"
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
