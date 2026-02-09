// Types for calendar data - share for backend
export interface FoodItem {
  id: string;
  name: string;
  expiryDate: string; // Format: "YYYY-MM-DD"
  category?: string; // optional, for color coding
}

export interface CalendarEvent {
  name: string;
  color: string;
}

export type CalendarData = Record<string, CalendarEvent[]>;