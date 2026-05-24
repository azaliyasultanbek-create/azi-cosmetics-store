import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 400);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue && (
        <button
          className="search-clear-btn"
          onClick={() => setInputValue("")}
        >
          ✕
        </button>
      )}
    </div>
  );
}
