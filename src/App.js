import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import Footer from "./components/Footer";
import { ReactComponent as Logo } from "./logo.svg";
import WeatherChart from "./components/WeatherChart";
import UnitsChange from "./components/UnitsChange";

const searchTimeout = 1000;

export default function App() {
  const [location, setLocation] = useState("Hanoi");
  const [debounced, setDebounced] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [units, setUnits] = useState("metric");

  const debounceSearch = useMemo(
    () =>
      debounce((search) => {
        setDebounced(search);
      }, searchTimeout),
    []
  );

  const handleSearch = (e) => {
    const term = e.target.value.trim();
    term && setIsSearch(true);
    debounceSearch(term);
  };

  const handleUnits = (u) => {
    setUnits(u);
  };

  useEffect(() => {
    if (debounced) {
      setLocation(debounced);
      setIsSearch(false);
    }
  }, [debounced]);

  return (
    <div className="bg-gray-800 flex flex-col">
      <nav className="mx-auto md:w-full xl:max-w-6xl 2xl:max-w-7xl w-5/6">
        <div className="m-auto self-center h-fit w-full mb-4 flex flex-row items-start md:w-3/5 xl:max-w-7xl">
          <Logo className="w-12 self-center" />
          <a href="/">
            <h3 className="m-7 mx-3 w-full text-lg text-white">
              Weather Forecast
            </h3>
          </a>
          <UnitsChange units={units} onUnitsChange={handleUnits} />
        </div>
      </nav>

      <main className="mx-auto md:w-full xl:max-w-6xl 2xl:max-w-7xl w-5/6 ">
        <Search
          location={location}
          isSearch={isSearch}
          onChange={handleSearch}
        />
        <div className="divide-light-blue-400 m-auto mt-4 h-auto w-full divide-y-2 overflow-hidden rounded-lg shadow-lg md:w-3/5">
          <WeatherCard location={location} units={units} />
          <WeatherChart location={location} units={units} />
          <ForecastCard location={location} units={units} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
