import { Country } from "./types";

export async function fetchCountries(
  page: number,
  pageSize: number
): Promise<Country[]> {
  const response = await fetch(
    `https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json`
  );

  if (!response.ok) {
    throw new Error("Ошибка загрузки данных");
  }

  const allCountries: Country[] = await response.json();

  // Эмулируем пагинацию используя slice
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return allCountries.slice(start, end);
}
