import { Minus, Plus } from "@phosphor-icons/react";

export function ProductAdd() {
  return (
    <div className=" items-center flex flex-col md:flex-row gap-4 w-full">
      <div className="flex items-center gap-[0.874rem]">
        <button>
          <Minus color="white" size={24} />
        </button>
        <span className="font-roboto  md:text-xl text-light-300 font-bold">
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
  );
}
