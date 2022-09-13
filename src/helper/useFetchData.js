import dayjs from "dayjs";
import useSWR from "swr";
import { fetcher } from "./fetcher";
import * as weatherIcon from "./icons";

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const iconPrefix = `wi wi-`;

export const useFetchData = (query, location, units) => {
  const apiQuery = `?q=${location}&units=${units}&APPID=${apiKey}`;

  const { data, error } = useSWR(`${apiUrl}/${query}/${apiQuery}`, fetcher);
  switch (query) {
    case "weather":
      return {
        weather: data?.weather ? mapResponse(data) : null,
        isLoading: !data && !error,
        isError: error,
      };

    case "forecast":
      return {
        forecast:
          data?.list && Object.entries.length
            ? data.list
                .filter((ent) => ent.dt_txt.match(/09:00:00/))
                .map(mapResponse)
            : null,
        isLoading: !data && !error,
        isError: error,
      };
    default:
      break;
  }
};

const mapResponse = (data) => {
  const mapped = {
    location: data.name,
    condition: data.cod,
    country: data.sys.country,
    description:
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1),
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    day: dayjs.unix(data.dt).format("dddd"),
    sunrise: dayjs.unix(data.sys.sunrise).format(),
    sunset: dayjs.unix(data.sys.sunset).format(),
    temp: Math.round(data.main.temp),
    min: Math.round(data.main.temp_min),
    max: Math.round(data.main.temp_max),
    timezone: data.timezone / 3600, // Convert to hours
    wind_speed: Math.round(data.wind.speed * 3.6), // Convert to km/h
  };

  if (mapped.sunrise ?? mapped.sunset) {
    mapped.time = dayjs().format("dddd h:mm A");

    mapped.isDay =
      mapped.time > mapped.sunrise && mapped.time < mapped.sunset
        ? true
        : false;

    mapped.weatherIcon =
      iconPrefix +
      weatherIcon.default[mapped.isDay ? "day" : "night"][mapped.icon_id].icon;
  }

  if (data.dt_txt) {
    mapped.dt_txt = data.dt_txt;
    mapped.forecastIcon =
      iconPrefix + weatherIcon.default["day"][mapped.icon_id].icon;
  }

  Object.entries(mapped).map(
    ([key, value]) => value === undefined && delete mapped[key]
  );
  return mapped;
};
