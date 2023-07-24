import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { CaretLeft, UploadSimple } from "@phosphor-icons/react";
import { Input } from "../components/Input";
import { Tag } from "../components/Tag";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";

export function New() {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const ingredients = ["alface", "tomate"];

  const isNew = true;

  function handleCreateProduct(e: any) {
    e.preventDefault();
    const newProduct = new FormData()

    newProduct.append('name', name)
    newProduct.append('description', description)
    newProduct.append('category', category)
    newProduct.append('price', price)
    newProduct.append('ingredients', JSON.stringify(ingredients))
    if (image) {
      newProduct.append('image', image);
    }

    try {
      api.post("/products", newProduct);
      setName('')
      setDescription('')
      setCategory('')
      setPrice('')
      setImage(null)
      alert("Produco criado com sucesso");
    } catch {
      alert("erro");
    }
  }

  function handleChangeImage(e: any) {
    const file = e.target.files[0];
    setImage(file);
  }

  return (
    <div className="flex-layout min-h-screen flex flex-col">
      <Navbar />

      <form
        onSubmit={handleCreateProduct}
        className="flex flex-col flex-1 mx-8 gap-6 mb-14 md:mx-auto md:w-[70rem]"
      >
        <a className="mt-6 md:ml-0 flex items-center font-poppins " href="">
          <CaretLeft size={22} />
          voltar
        </a>

        <h1 className="font-poppins text-light-300 text-3xl font-medium">
          Novo Prato
        </h1>

        <div className="flex gap-6 flex-col md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <label className="text-light-400">Descrição</label>
            <label className="px-[0.875rem] text-light-500 py-[0.75rem] w-full bg-dark-900 rounded-lg flex whitespace-nowrap min-w-fit items-center gap-2">
              <UploadSimple color="white" size={24} />
              <span>Selecione a imagem</span>
              <input
                id="avatar"
                type="file"
                className="hidden"
                onChange={handleChangeImage}
              />
            </label>
          </div>

          <Input
            type="text"
            label="Nome"
            placeholder="Ex.: Salada Ceasar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // {...register("name")}
          />

          <div className="flex flex-col gap-2">
            <label className="text-light-400" htmlFor="category">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              // {...register("category")}
              id="category"
              className="px-[0.875rem] text-light-500 py-[0.85rem] bg-dark-900 rounded-lg"
            >
              <option value="">Categoria</option>
              <option value="refeicoes">Refeições</option>
              <option value="sobremesas">Sobremesas</option>
              <option value="bebidas">Bebidas</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-light-400">Ingredientes</label>
            <div className="px-[0.875rem] py-[0.75rem] text-light-500 bg-dark-900 rounded-lg flex gap-2 flex-wrap">
              <Tag value="Tomate" />
              <Tag value="Cebola" />
              <Tag placeholder="Ingrediente" isNew />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-light-400">Preço</label>
            <input
              className="px-[0.875rem] text-light-500 py-[0.75rem] bg-dark-900 rounded-lg"
              type="text"
              placeholder="R$ 00,00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              // {...register("price")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-light-400">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // {...register("description")}
            className="px-[0.875rem] h-40 text-light-500 py-[0.75rem] w-full bg-dark-900 rounded-lg resize-none"
          ></textarea>
        </div>

        <div className="md:self-end">
          {isNew ? (
            <Button title="Salvar alterações" />
          ) : (
            <div className="flex gap-8">
              <button
                className="rounded-md w-full font-poppins font-normal text-light-100 bg-dark-900 py-3 px-6 whitespace-nowrap min-w-fit"
                type="button"
              >
                Excluir prato
              </button>
              <button
                className="rounded-md w-full font-poppins font-normal text-light-100 bg-tomato-100 py-3 px-6 whitespace-nowrap min-w-fit"
                type="submit"
              >
                Salvar alterações
              </button>
            </div>
          )}
        </div>
      </form>

      <Footer />
    </div>
  );
}
