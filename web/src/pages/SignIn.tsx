import polygon from "../assets/polygon.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/auth";

const signInSchema = z
  .object({
    email: z.string().email({ message: "Digite um email válido" }),
    password: z
      .string()
      .min(5, { message: "A senha deve ter no mínimo 5 caracteres" })
      .max(15),
  })
  .partial();

type SignInInputs = z.infer<typeof signInSchema>;

export function SignIn() {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInputs>({
    resolver: zodResolver(signInSchema),
  });

  function handleSignIn(data: SignInInputs) {
    signIn(data);
  }


  return (
    <div className="h-screen bg-dark-400 flex">
      <div className="flex mx-auto flex-col items-center mt-40 md:flex-row md:mt-0 md:gap-[22rem] ">
        <div className="flex gap-3 mb-[4.56rem]">
          <img src={polygon} alt="" />
          <h1 className="text-light-100 text-4xl font-bold flex-shrink-0 ">
            food explorer
          </h1>
        </div>

        <div className="w-full md:w-[30rem] flex flex-col gap-8 md:bg-dark-700 md:p-20 md:rounded-2xl">
          <h1 className="font-poppins text-4xl text-center text-light-100 hidden md:inline">
            Faça login
          </h1>

          <form
            className="items-center flex flex-col gap-8"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Input
              type="text"
              label="Email"
              placeholder="Exemplo: exemplo@exemplo.com.br"
              {...register("email")}
              error={errors.email}
            />

            <Input
              type="password"
              label="Senha"
              placeholder="No mínimo 6 caracteres"
              {...register("password")}
              error={errors.password}
            />

            <Button title="Entrar" isSubmitting={isSubmitting} />
          </form>

          <a
            className="font-poppins text-center font-medium text-sm text-light-100"
            href="/register"
          >
            Criar uma conta
          </a>
        </div>
      </div>
    </div>
  );
}
