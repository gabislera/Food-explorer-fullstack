import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Menu } from "../pages/Menu";
import { Product } from "../pages/Product";
import { New } from "../pages/New";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/product" element={<Product />} />
      <Route path="/new" element={<New />} />
    </Routes>
  );
}
