import { Favourite } from "../types";

export const tempFavourites: Favourite[] = [
  {
    id: "1",
    userId: "1",
    menuItemId: "101",
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItem: {
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
  },
  {
    id: "2",
    userId: "1",
    menuItemId: "102",
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItem: {
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
  },
  {
    id: "3",
    userId: "1",
    menuItemId: "103",
    createdAt: new Date(),
    updatedAt: new Date(),
    menuItem: {
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
  },
];
