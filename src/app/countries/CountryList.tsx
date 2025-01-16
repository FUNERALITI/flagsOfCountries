import { AnimatePresence } from "framer-motion";
import { Country } from "./types";
import CountryItem from "./CountryItem";

type CountryListProps = {
  countries: Country[];
  onRemove: (code: string) => void;
};

export default function CountryList({ countries, onRemove }: CountryListProps) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      <AnimatePresence>
        {countries.map((country) => (
          <CountryItem
            key={country.iso_code2} // Используем iso_code2 как уникальный ключ
            country={country}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
