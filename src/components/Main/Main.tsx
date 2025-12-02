import { useEffect, useState, createContext } from "react";
import type { JSX, ReactNode } from "react";
import type { Current, Forecastday, Location } from "../../types/index";

type Weather = {
  current: Current;
  forecast: {
    forecastday: Forecastday[];
  };
  location: Location;
};

type MainProps = {
  children: ReactNode;
};

type WeatherContextType = {
  weather: Weather | undefined;
};

const WeatherContext = createContext<WeatherContextType>({
  weather: undefined,
});

export default function Main({ children }: MainProps): JSX.Element {
  const [weather, setWeather] = useState<Weather | undefined>(undefined);

  useEffect((): void => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${
          import.meta.env.VITE_API_KEY
        }&q=${position.coords.latitude},${
          position.coords.longitude
        }&days=3&aqi=no&alerts=no`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Http error! status${res.status}`);
          }

          return res.json();
        })
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  return (
    <WeatherContext.Provider value={{ weather }}>
      <main>{children}</main>
    </WeatherContext.Provider>
  );
}

export { WeatherContext };
