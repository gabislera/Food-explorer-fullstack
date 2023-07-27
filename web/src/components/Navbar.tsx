import { List, MagnifyingGlass, Receipt, SignOut } from "@phosphor-icons/react";
import polygon from "../assets/polygon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
// import { useState } from "react";
import { useActive } from "../hooks/active";

export function Navbar() {
  const { signOut } = useAuth();
  // const [search, setSearch] = useState('')
  const { setActiveProduct, search, setSearch } = useActive()
  const navigate = useNavigate();

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  function handleCreateProduct() {
    navigate('/create')
    setActiveProduct(null)
  }

  const { isAdmin } = useAuth();
  return (
    <header className="bg-dark-700 flex md:gap-11 gap-14 items-center py-6 md:justify-center">
      <Link to="/menu" className="md:hidden ml-7">
        <List color="white" size={32} />
      </Link>

      <div className="flex gap-[10px] pr-[10px] flex-nowrap items-center whitespace-nowrap min-w-fit relative ">
        <img src={polygon} alt="" className="w-[30px] h-[30px]" />

        <Link
          to="/"
          className="flex items-center gap-2 md:flex-col md:items-end md:gap-0"
        >
          <h1 className="text-light-100 text-2xl font-bold ">food explorer</h1>
          {isAdmin && (
            <span className="md:absolute -bottom-2 text-xs text-cake-200">
              admin
            </span>
          )}
        </Link>
      </div>

      <div className="hidden md:inline relative w-[581px]">
        <div className="absolute inset-y-0 left-28 flex items-center ">
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

      {isAdmin ? (
        <button
          onClick={handleCreateProduct}
          className="text-light-100 rounded-md font-poppins font-normal md:bg-tomato-100 hover:bg-tomato-200 md:py-3 md:px-8 md:flex md:items-center md:gap-2 md:whitespace-nowrap"
        >
          <span className="hidden md:inline">Novo prato</span>
        </button>
      ) : (
        <button className="text-light-100 relative rounded-md font-poppins font-normal md:bg-tomato-100 hover:bg-tomato-200 md:py-2 md:px-8 md:flex md:items-center md:gap-2 md:whitespace-nowrap">
          <Receipt size={32} />
          <span className="hidden md:inline">Pedidos (0)</span>
          <span className="w-5 h-5 bg-tomato-100 hover:bg-tomato-200 absolute rounded-full -top-1 md:hidden">
            0
          </span>
        </button>
      )}

      {/*  */}

      <button className="hidden md:inline">
        <SignOut color="white" size={32} onClick={handleSignOut} />
      </button>
    </header>
  );
}
