import { useFetchData } from "../helper/useFetchData";
import Loading from "./Loading";

export default function ForecastCard({ location, units }) {
  const { forecast, isLoading, isError } = useFetchData(
    "forecast",
    location,
    units
  );

  if (isLoading || isError) return <Loading />;
  return (
    <div className="m-4">
      <div className="">
        {forecast.map((item, index) => {
          return (
            <ul className="mt-4" key={index}>
              <li className="flex flex-row p-1 text-gray-500 dark:text-white">
                <span className="flex-1 text-left">{item.day}</span>
                <span className="text-2xl text-indigo-700 dark:text-white">
                  <span className={item.forecastIcon}></span>
                </span>
                <div className="flex-1 text-right">
                  {item.min}&deg; / {item.max}&deg;
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
