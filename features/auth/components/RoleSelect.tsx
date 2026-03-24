"use client";

import type { UserRole } from "@/shared/types";

type RoleSelectProps = {
  value: UserRole;
  onChange: (role: UserRole) => void;
};

export const RoleSelect = ({ value, onChange }: RoleSelectProps) => {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl bg-border/30 p-1 border border-border/50">
      <button
        type="button"
        onClick={() => onChange("farmer")}
        className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
          value === "farmer"
            ? "bg-white text-primary shadow-sm"
            : "text-muted hover:text-foreground hover:bg-white/50"
        }`}
      >
        Farmer
      </button>
      <button
        type="button"
        onClick={() => onChange("buyer")}
        className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
          value === "buyer"
            ? "bg-white text-primary shadow-sm"
            : "text-muted hover:text-foreground hover:bg-white/50"
        }`}
      >
        Buyer
      </button>
    </div>
  );
};
