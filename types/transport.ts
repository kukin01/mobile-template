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

export interface Route {
  id: string;
  name: string;
  busNumber: string;
  description: string;
  isActive: boolean;
  stops: Stop[];
  schedules: Schedule[];
}

export interface TransportState {
  routes: Route[];
  selectedRoute: Route | null;
  loading: boolean;
  error: string | null;
} 