export interface Stop {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  description?: string;
}

export interface Schedule {
  id: string;
  routeId: string;
  stopId: string;
  arrivalTime: string; // Format: "HH:mm"
  departureTime: string; // Format: "HH:mm"
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

