"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

interface LeaderboardSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// Sample suggestions
const suggestions = [
  "Afiliado 1",
  "Afiliado 5",
  "Afiliado 10",
  "Afiliado 25",
  "Afiliado 50",
];

export default function LeaderboardSearch({
  searchTerm,
  setSearchTerm,
}: LeaderboardSearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredSuggestions(suggestions);
      return;
    }

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredSuggestions(filtered);
  }, [searchTerm]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon
            icon="solar:magnifer-bold-duotone"
            className="w-5 h-5 text-muted-foreground"
          />
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar afiliado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />

        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setSearchTerm("")}
          >
            <Icon
              icon="solar:close-circle-bold-duotone"
              className="w-5 h-5 text-muted-foreground hover:text-foreground"
            />
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                className="w-full text-left px-4 py-2 hover:bg-primary/10 transition-colors flex items-center"
                onClick={() => {
                  setSearchTerm(suggestion);
                  setShowSuggestions(false);
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Icon
                  icon="solar:user-bold-duotone"
                  className="w-4 h-4 text-muted-foreground mr-2"
                />
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
