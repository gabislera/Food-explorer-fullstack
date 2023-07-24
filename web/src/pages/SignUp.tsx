import polygon from "../assets/polygon.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const signUpSchema = z
  .object({
    name: z.string().max(30, { message: "Tamanho limite de caracteres" }),
    email: z.string().email({ message: "Digite um email válido" }),
    password: z
      .string()
      .min(5, { message: "A senha deve ter no mínimo 5 caracteres" })
      .max(15),
  })
  .partial();

type SignUpInputs = z.infer<typeof signUpSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  });

  function handleSignUp(data: SignUpInputs) {
    api
      .post("/users", data)
      .then(() => {
        alert("Usuário cadastrado com sucesso");
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert("Não foi possível cadastrar");
        }
      });
  }
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
            Crie sua conta
          </h1>

          <form
            className="items-center w-full flex flex-col gap-8"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <Input
              type="text"
              label="Seu nome"
              placeholder="Exemplo: Maria da Silva"
              error={errors.name}
              {...register("name")}
            />

            <Input
              type="text"
              label="Email"
              placeholder="Exemplo: exemplo@exemplo.com.br"
              error={errors.email}
              {...register("email")}
            />

            <Input
              type="password"
              label="Senha"
              placeholder="No mínimo 6 caracteres"
              error={errors.password}
              {...register("password")}
            />

            <Button title="Entrar" />
          </form>

          <a
            className="font-poppins text-center font-medium text-sm text-light-100"
            href="/"
          >
            Ja tenho uma conta
          </a>
        </div>
      </div>
    </div>
  );
}
