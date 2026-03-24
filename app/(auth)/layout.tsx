import type { ReactNode } from "react";
import Link from "next/link";
import { Sprout } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left side - Decorative/Branding */}
      <div className="hidden w-1/2 flex-col justify-between overflow-hidden bg-primary relative p-12 text-white lg:flex">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer w-fit">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary transition-transform group-hover:scale-110">
              <Sprout className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">Agri<span className="text-accent">Hub</span></span>
          </Link>
          <div className="mt-20 max-w-md">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              Farm to Table
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight mb-6">
              Empowering farmers.<br />Connecting markets.
            </h1>
            <p className="text-white/80 font-medium leading-relaxed">
              Join the transparent marketplace linking agricultural producers directly with buyers, backed by seamless payments and smart credit scoring.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-full w-full bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary-light/30 blur-[100px]" />
        
        {/* Abstract shapes or images could go here */}
        <div className="absolute bottom-0 right-0 z-0 h-2/3 w-2/3 opacity-30 select-none drop-shadow-2xl">
           <Image src="/images/yams.png" alt="Fresh Yams" fill className="object-contain translate-x-12 translate-y-12 rotate-[-10deg]" />
        </div>
      </div>

      {/* Right side - Form container */}
      <div className="flex w-full items-center justify-center p-6 sm:p-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
