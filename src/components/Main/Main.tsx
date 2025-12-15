import { useEffect, useState, createContext } from "react";
import type { JSX, ReactNode } from "react";
import type { Weather } from "../../types/index";

type MainProps = {
  children: ReactNode;
};

type WeatherContextType = {
  weather: Weather | undefined;
  unit: "c" | "f";
  switchUnits: () => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export default function Main({ children }: MainProps): JSX.Element {
  const [weather, setWeather] = useState<Weather | undefined>(undefined);
  const [unit, setUnit] = useState<"c" | "f">("c");

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

  const switchUnits = () => setUnit((prev) => (prev === "c" ? "f" : "c"));

  return (
    <WeatherContext.Provider value={{ weather, unit, switchUnits }}>
      <main>{children}</main>
    </WeatherContext.Provider>
  );
}

export { WeatherContext };
