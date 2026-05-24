import { index, route } from "@react-router/dev/routes";

export default [
  index("../src/pages/Home.jsx"),
  route("about", "../src/pages/About.jsx"),
  route("contact", "../src/pages/Contact.jsx"),
  route("catalog", "../src/pages/Catalog.jsx", [
    route("categories", "../src/pages/Categories.jsx"),
  ]),
  route("product/:id", "../src/pages/ProductDetail.jsx"),
  route("login", "../src/pages/Login.jsx"),
  route("cart", "../src/pages/CartProtected.jsx"),
  route("wishlist", "../src/pages/WishlistPage.jsx"),
  route("*", "../src/pages/NotFound.jsx"),
];

