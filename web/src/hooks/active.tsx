import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface ActiveProviderProps {
  children: ReactNode;
}

interface ActiveContextProps {
  activeProduct: ActiveProduct
  setActiveProduct: (data: ActiveProduct) => void
}

interface Ingredients {
  name: string
}

interface ActiveProduct {
  id: number
  name: string
  description: string
  category: string
  price: string
  image: string
  ingredients: Ingredients[]
}

const ActiveContext = createContext({} as ActiveContextProps);

export function ActiveProvider({ children }: ActiveProviderProps) {
  const [activeProduct, setActiveProduct] = useState<ActiveProduct>()

  return (
    <ActiveContext.Provider
      value={{ activeProduct, setActiveProduct }}
    >
      {children}
    </ActiveContext.Provider>
  );
}

export const useActive = () => useContext(ActiveContext);
