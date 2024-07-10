interface WeatherData {
    list: {
      main: {
        temp_max: number;
        temp_min: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        feels_like: number;
      };
      weather: {
        icon: string;
        description: string;
      }[];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
      };
    }[];
  }
export default WeatherData;