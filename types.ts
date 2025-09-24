
export enum HealthProfile {
  GENERAL = 'General Population',
  SENSITIVE = 'Sensitive Group (Children, Elderly, Asthma)',
  ATHLETE = 'Outdoor Athlete',
}

export interface Pollutant {
  name: string;
  value: number;
}

export interface ForecastPoint {
  hour: string;
  aqi: number;
}

export interface AirQualityReport {
  location: string;
  currentAqi: {
    value: number;
    category: string;
    description: string;
  };
  pollutantBreakdown: Pollutant[];
  forecast: ForecastPoint[];
  healthAlert: {
    title: string;
    recommendations: string[];
  };
}
