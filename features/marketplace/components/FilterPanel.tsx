"use client";

const FILTERS = ["All", "Grains", "Poultry", "Vegetables", "Fruits", "Other"];

type Props = {
  selected: string;
  onSelect: (value: string) => void;
};

export const FilterPanel = ({ selected, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelect(filter)}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
            selected === filter
              ? "bg-green-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
