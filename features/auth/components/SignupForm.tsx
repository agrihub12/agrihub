"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signUpWithEmail } from "@/features/auth/api/firebaseAuthHelpers";
import { RoleSelect } from "@/features/auth/components/RoleSelect";
import type { UserRole } from "@/shared/types";

export const SignupForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState<UserRole>("buyer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signUpWithEmail(email, password, { name, role, location });
      if (role === "farmer") {
        router.push("/farmer/dashboard");
      } else {
        router.push("/marketplace");
      }
    } catch {
      setError("Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">
          Full Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl border-2 border-border bg-white px-4 py-3.5 text-sm font-medium transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border-2 border-border bg-white px-4 py-3.5 text-sm font-medium transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
          placeholder="you@domain.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border-2 border-border bg-white px-4 py-3.5 text-sm font-medium transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
          placeholder="••••••••"
        />
      </div>

      <div>
        <label htmlFor="location" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">
          Location
        </label>
        <input
          id="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="w-full rounded-xl border-2 border-border bg-white px-4 py-3.5 text-sm font-medium transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
          placeholder="State, Country"
        />
      </div>

      <div>
        <p className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">Role</p>
        <RoleSelect value={role} onChange={setRole} />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        disabled={loading}
        type="submit"
        className="mt-6 w-full rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

      <p className="mt-8 text-center text-sm font-medium text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary hover:text-primary-light transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
};
