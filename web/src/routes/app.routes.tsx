import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Menu } from "../pages/Menu";
import { Product } from "../pages/Product";
import { Create } from "../pages/Create";
import { Edit } from "../pages/Edit";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit" element={<Edit />} />
    </Routes>
  );
}
