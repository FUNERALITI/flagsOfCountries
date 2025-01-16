"use client";

import { useEffect, useState, useRef } from "react";
import { fetchCountries } from "./countries/fetchCountries";
import { Country } from "./countries/types";
import CountryList from "./countries/CountryList";

export default function Home() {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [page, setPage] = useState(1); // Текущая страница
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Флаг наличия новых данных

  const observer = useRef<IntersectionObserver | null>(null); // Реф для наблюдения

  const pageSize = 20; // Количество стран на страницу

  // Загрузка данных
  useEffect(() => {
    const loadCountries = async () => {
      setIsLoading(true);

      try {
        const newCountries = await fetchCountries(page, pageSize);
        setCountryList((prevList) => [...prevList, ...newCountries]);

        if (newCountries.length < pageSize) {
          setHasMore(false); // Если данных меньше, чем pageSize, значит больше данных нет
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCountries();
  }, [page]);

  // Установить наблюдатель на конец списка
  const lastCountryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading) return; // Не наблюдаем во время загрузки

    if (observer.current) observer.current.disconnect(); // Удаляем предыдущий наблюдатель

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1); // Увеличиваем страницу
      }
    });

    if (lastCountryRef.current) {
      observer.current.observe(lastCountryRef.current); // Устанавливаем наблюдатель
    }
  }, [isLoading, hasMore]);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Список стран</h1>
      <CountryList
        countries={countryList}
        onRemove={(code: string) =>
          setCountryList((prevList) =>
            prevList.filter((country) => country.iso_code2 !== code)
          )
        }
      />
      {/* Пустой div для отслеживания конца списка */}
      <div ref={lastCountryRef} style={{ height: "1px" }} />

      {isLoading && <p>Загрузка...</p>}
      {!hasMore && <p>Все данные загружены!</p>}
    </main>
  );
}
