import { api } from "../services/api"

interface ProductProps {
  id: number
  name: string
  description: string
  category: string
  price: string
  ingredients: any
  image: string
}

export function useProduct(){
  function createProduct({ name, description, category, price, ingredients, image}: ProductProps){
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
      // setName('')
      // setDescription('')
      // setCategory('')
      // setPrice('')
      // setImage(null)
      alert("Produco criado com sucesso");
    } catch {
      alert("erro");
    }
  }


  return {createProduct}
}