"use client";

import { useEffect, useState } from "react";
import { Input } from "@/shared/components/Input";

type Props = {
  value: string;
  onDebouncedChange: (value: string) => void;
};

export const SearchBar = ({ value, onDebouncedChange }: Props) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => onDebouncedChange(localValue), 350);
    return () => clearTimeout(timeout);
  }, [localValue, onDebouncedChange]);

  return (
    <Input
      id="listing-search"
      label="Search produce"
      placeholder="Search by product name"
      value={localValue}
      onChange={(event) => setLocalValue(event.target.value)}
    />
  );
};
