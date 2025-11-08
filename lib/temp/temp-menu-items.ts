import { MenuItem } from "../types/MenuItem";

export const tempMenuItems: MenuItem[] = [
  {
    id: "101",
    name: "Паста Карбонара",
    description: "Кремовая паста с беконом, пармезаном и свежим перцем.",
    price: 69000,
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=400&q=80",
    categoryId: "pasta",
    isInStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "102",
    name: "Салат тёплый с курицей",
    description: "Румяная курица, свежие овощи и лёгкий соус.",
    price: 69000,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    categoryId: "salads",
    isInStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "103",
    name: "Терияки чикен",
    description: "Курица терияки с рисом и свежими овощами.",
    price: 84000,
    image:
      "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=400&q=80",
    categoryId: "mains",
    isInStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "104",
    name: "Суп чечевичный",
    description: "Насыщенный суп из красной чечевицы со специями и сливками.",
    price: 36000,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    categoryId: "soups",
    isInStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "105",
    name: "Паста с куриной грудкой",
    description: "Сливочная паста с сочной куриной грудкой и свежей зеленью.",
    price: 69000,
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80",
    categoryId: "pasta",
    isInStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
