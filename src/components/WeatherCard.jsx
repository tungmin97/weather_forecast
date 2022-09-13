import dayjs from "dayjs";
import { useFetchData } from "../helper/useFetchData";
import Loading from "./Loading";

export default function WeatherCard({ location, units }) {
  const isMetric = units.match(/metric/) ? true : false;

  const { weather, isLoading, isError } = useFetchData(
    "weather",
    location,
    units
  );

  if (isLoading || isError) return <Loading />;
  return (
    <div className="m-4">
      <div className="sm relative">
        <p className="text-2xl font-semibold font-sans tracking-wide text-white">
          {weather.location}, {weather.country}
        </p>
        <p className="tracking-wide text-gray-500">
          {dayjs().format("dddd h:mm A")}, {weather.description}{" "}
        </p>

        <div className="my-8 flex flex-row justify-between text-5xl tracking-wide lg:my-4 lg:text-6xl">
          <span className="mt-4 font-light text-8xl tracking-wider text-gray-500 dark:text-white md:mt-10">
            {weather.temp}&deg;
            <span className="mt-1 flex flex-col text-base font-normal tracking-wide text-gray-500 dark:text-gray-400">
              Feels like {weather.feels_like}&deg;
            </span>
          </span>
          <div className="mt-4 text-8xl self-center text-indigo-700 dark:text-white sm:text-9xl">
            <span className={weather.weatherIcon}></span>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-6 mt-1 text-indigo-700 dark:text-gray-400">
          <div className="flex gap-3">
            <span className="wi wi-strong-wind text-xl"></span>
            <span className="ml-1 mr-2 tracking-wide text-gray-500 dark:text-white">
              {weather.wind_speed}
              {isMetric ? `m/s` : `mph`} winds
            </span>
          </div>
          <div className="flex gap-3">
            <span className="wi wi-humidity text-xl"></span>
            <span className="ml-1 tracking-wide text-gray-500 dark:text-white">
              {weather.humidity}% humidity
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
