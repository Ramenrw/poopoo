export type Category = "Mains" | "Soups" | "Salads" | "Sides" | "Dessert" | "Snacks";

export type Recipe = {
  id: string;
  title: string;
  category: Category;
  thumbnail?: any; 
};

export const CATEGORIES: Category[] = ["Mains", "Soups", "Salads", "Sides", "Dessert", "Snacks"];

export const RECIPES: Recipe[] = [
  {
    id: "recipe1",
    title: "Italian Garlic Sautéed Chicken with Rice",
    category: "Mains",
    thumbnail: require("../../assets/images/feed/thumb-italian-garlic-chicken.png"),
  },
  {
    id: "r2",
    title: "Chicken quinoa salad",
    category: "Mains",
    thumbnail: require("../../assets/images/feed/thumb-chicken-quinoa.png"),
  },
  {
    id: "r3",
    title: "Roasted onions",
    category: "Mains",
    thumbnail: require("../../assets/images/feed/thumb-roasted-onions.png"),
  },
  {
    id: "r4",
    title: "Healthy egg salad",
    category: "Mains",
    thumbnail: require("../../assets/images/feed/thumb-egg-salad.png"),
  },
  {
    id: "r5",
    title: "Garlic gochujang tomatoes",
    category: "Sides",
    thumbnail: require("../../assets/images/feed/thumb-garlic-gochujang-tomato.png"),
  },
];
