import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { CaretLeft, UploadSimple } from "@phosphor-icons/react";
import { Input } from "../components/Input";
import { Tag } from "../components/Tag";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export function Create() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState<string[]>([])
  const [newIngredient, setNewIngredient] = useState<string>('')
  const { isAdmin } = useAuth()

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
      setIngredients([])
      alert("Produco criado com sucesso");
    } catch {
      alert("erro");
    }
  }

  function handleChangeImage(e: any) {
    const file = e.target.files[0];
    setImage(file);
  }

  function handleAddIngredient() {
    setIngredients(prevState => [...prevState, newIngredient])
    setNewIngredient('')
  }

  function handleRemoveIngredients(deleted: any) {
    setIngredients(prevstate => prevstate.filter(tag => tag !== deleted))
  }

  if (!isAdmin) return <></> // talvez mudar abordagem de rotas admin
  return (
    <div className="flex-layout min-h-screen flex flex-col">
      <Navbar />

      <form
        onSubmit={handleCreateProduct}
        className="flex flex-col flex-1 mx-8 gap-6 mb-14 md:mx-auto md:w-[70rem]"
      >
        <Link className="mt-6 md:ml-0 flex items-center font-poppins " to='/'>
          <CaretLeft size={22} />
          voltar
        </Link>

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
              <option value="cafe">Café</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-light-400">Ingredientes</label>
            <div className="px-[0.875rem] py-[0.75rem] text-light-500 bg-dark-900 rounded-lg flex gap-2 flex-wrap">
              {ingredients.map((ingredient, index) => (
                <Tag
                  key={index}
                  value={ingredient}
                  onClick={() => handleRemoveIngredients(ingredient)} />
              ))}
              <Tag
                placeholder="Ingrediente"
                isNew value={newIngredient}
                onClick={handleAddIngredient}
                onChange={(e: any) => setNewIngredient(e.target.value)} />
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
          <Button title="Adicionar produto" />
        </div>
      </form>

      <Footer />
    </div>
  );
}
