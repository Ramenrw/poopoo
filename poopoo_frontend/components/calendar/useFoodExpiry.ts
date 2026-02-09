import { useState, useEffect } from "react";
import { FoodItem, CalendarData } from "./types";

// MOCK DATA - Your teammate will replace this function
const fetchFoodItems = async (): Promise<FoodItem[]> => {
  // TODO: Replace with actual API call
  
  return [
    // March 2026
    { id: "1", name: "Coral", expiryDate: "2026-03-01", category: "seafood" },
    { id: "2", name: "Noodle", expiryDate: "2026-03-03", category: "pasta" },
    { id: "3", name: "Spinach", expiryDate: "2026-03-06", category: "vegetable" },
    { id: "4", name: "Brie into life", expiryDate: "2026-03-08", category: "dairy" },
    { id: "5", name: "Shreds", expiryDate: "2026-03-09", category: "cheese" },
    { id: "6", name: "Orange", expiryDate: "2026-03-13", category: "fruit" },
    { id: "7", name: "Prosciutto", expiryDate: "2026-03-15", category: "meat" },
    { id: "8", name: "Carrot", expiryDate: "2026-03-17", category: "vegetable" },
    { id: "9", name: "Chicken leg", expiryDate: "2026-03-18", category: "meat" },
    { id: "10", name: "Onion", expiryDate: "2026-03-22", category: "vegetable" },
    { id: "11", name: "Apple", expiryDate: "2026-03-26", category: "fruit" },
    { id: "12", name: "Greek Yogurt", expiryDate: "2026-03-27", category: "dairy" },
    { id: "13", name: "Halva Curd", expiryDate: "2026-03-28", category: "dairy" },
    { id: "14", name: "Chicken", expiryDate: "2026-03-31", category: "meat" },
    
    // April 2026
    { id: "15", name: "Milk", expiryDate: "2026-04-02", category: "dairy" },
    { id: "16", name: "Salmon", expiryDate: "2026-04-05", category: "seafood" },
    { id: "17", name: "Lettuce", expiryDate: "2026-04-08", category: "vegetable" },
    { id: "18", name: "Bread", expiryDate: "2026-04-10", category: "pasta" },
    { id: "19", name: "Tomatoes", expiryDate: "2026-04-12", category: "vegetable" },
    { id: "20", name: "Beef", expiryDate: "2026-04-15", category: "meat" },
    { id: "21", name: "Strawberries", expiryDate: "2026-04-18", category: "fruit" },
    { id: "22", name: "Cheddar", expiryDate: "2026-04-20", category: "cheese" },
    { id: "23", name: "Turkey", expiryDate: "2026-04-23", category: "meat" },
    { id: "24", name: "Cucumber", expiryDate: "2026-04-25", category: "vegetable" },
    { id: "25", name: "Eggs", expiryDate: "2026-04-28", category: "dairy" },
    { id: "26", name: "Pasta", expiryDate: "2026-04-30", category: "pasta" },
  ];
};

// Color mapping by category
const getCategoryColor = (category?: string): string => {
  const colors: Record<string, string> = {
    meat: "#FFE5D9",
    dairy: "#FFEAA7",
    vegetable: "#DFE6E9",
    fruit: "#FFE5D9",
    seafood: "#FFE5D9",
    pasta: "#FFEAA7",
    cheese: "#FFEAA7",
  };
  return colors[category || ""] || "#E8E8E8";
};

export function useFoodExpiry() {
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    try {
      setLoading(true);
      const items = await fetchFoodItems();
      
      // Transform food items into calendar format
      const grouped: CalendarData = {};
      items.forEach((item) => {
        if (!grouped[item.expiryDate]) {
          grouped[item.expiryDate] = [];
        }
        grouped[item.expiryDate].push({
          name: item.name,
          color: getCategoryColor(item.category),
        });
      });
      
      setCalendarData(grouped);
    } catch (error) {
      console.error("Failed to load food items:", error);
    } finally {
      setLoading(false);
    }
  };

  return { calendarData, loading, refresh: loadFoodItems };
}