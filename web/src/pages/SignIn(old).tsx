import polygon from "../assets/polygon.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignInOld() {
  return (
    <div className="h-screen bg-dark-400 flex">
      <div className="flex mx-auto flex-col items-center mt-40 md:flex-row md:mt-0 md:gap-[45rem] ">
        <div className="flex gap-3 mb-[4.56rem]">
          <img src={polygon} alt="" />
          <h1 className="text-light-100 text-4xl font-bold flex-shrink-0 ">
            food explorer
          </h1>
        </div>

        <div className="w-full flex flex-col gap-8 md:bg-dark-700 md:p-20 md:rounded-2xl">
          <h1 className="font-poppins text-4xl text-center text-light-100 hidden md:inline">
            Faça login
          </h1>

          <form className="items-center w-full flex flex-col gap-8 ">
            <Input
              type="text"
              label="Email"
              placeholder="Exemplo: exemplo@exemplo.com.br"
            />

            <Input
              type="password"
              label="Senha"
              placeholder="No mínimo 6 caracteres"
            />

            <Button title="Entrar" />
          </form>

          <a
            className="font-poppins text-center font-medium text-sm text-light-100"
            href="#"
          >
            Criar uma conta
          </a>
        </div>
      </div>
    </div>
  );
}
