import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { Footer } from "../components/Footer";
import { useAuth } from "../hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useActive } from "../hooks/active";
import { Section } from "../components/Section";
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

export function Menu() {
  const { isAdmin, signOut } = useAuth();
  const { search, setSearch } = useActive()
  const [products, setProducts] = useState<ProductProps[]>([])

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get(`/products?name=${search}`)
      setProducts(response.data.products)
    }

    fetchTags()
  }, [search])

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  function handleNavigate() {
    navigate('/create')
  }

  return (
    <div className="flex-layout min-h-screen flex flex-col">
      <header className="bg-dark-700 flex md:gap-11 gap-14 py-6 ">
        <Link to="/" className="flex items-center gap-2 text-xl ml-7">
          <X color="white" size={24} />
          Menu
        </Link>
      </header>

      <div className="flex-1 flex flex-col gap-9 mx-7">
        <div className="relative  mt-9">
          <div className="absolute inset-y-0 left-3 flex items-center ">
            <MagnifyingGlass className="text-white" size={24} />
          </div>
          <input
            className="py-3 w-full text-light-500 bg-dark-900 rounded-lg text-center "
            type="text"
            placeholder="Busque por pratos ou ingredientes"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {search ? <Section title={search} data={products} categoryType='all' /> : <></>}

        <div>
          {isAdmin && (
            <button className="font-poppins text-2xl text-light-300 p-[0.625rem] text-start w-full border-b-[1px] border-dark-1000" onClick={handleNavigate}>
              Novo Prato
            </button>
          )}

          <button
            onClick={handleSignOut}
            className="font-poppins text-2xl text-light-300 p-[0.625rem] text-start w-full border-b-[1px] border-dark-1000"
          >
            Sair
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
