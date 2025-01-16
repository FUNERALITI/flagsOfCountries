import { motion } from "framer-motion";
import { Country } from "./types";

type CountryItemProps = {
  country: Country;
  onRemove: (code: string) => void;
};

export default function CountryItem({ country, onRemove }: CountryItemProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <img
        src={country.flag_url}
        alt={country.name_ru}
        style={{ marginRight: "10px", width: "40px", height: "auto" }}
      />
      <span style={{ flex: 1 }}>{country.name_ru}</span>
      <button onClick={() => onRemove(country.iso_code2)}>Удалить</button>
    </motion.li>
  );
}
