import polygon2 from "../assets/polygon2.svg";

export function Footer() {
  return (
    <footer className="bg-dark-700 w-full">
      <div className="flex items-center justify-between max-w-[70rem] mx-auto py-6 px-6 md:px-0">
        <div className="flex gap-3">
          <img src={polygon2} alt="" className="md:w-[30px] w-[22px]" />
          <span className="text-light-700 md:text-2xl font-bold">
            food explorer
          </span>
        </div>
        <span className="text-light-200 text-xs md:text-sm font-normal">
          © 2023 - Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}
