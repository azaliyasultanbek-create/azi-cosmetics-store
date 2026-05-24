import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const productsApi = {
    getAll: async (skip = 0, limit = 200) => {
    const res = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return res.data.products;
  },

  getById: async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  getCategories: async () => {
    const res = await api.get("/products/categories");
    return res.data;
  },

  getByCategory: async (category) => {
    const res = await api.get(`/products/category/${category}`);
    return res.data.products;
  },

  search: async (query) => {
    const res = await api.get(`/products/search?q=${query}`);
    return res.data;
  },
};
