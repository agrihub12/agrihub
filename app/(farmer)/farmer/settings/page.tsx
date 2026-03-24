"use client";

import { Settings, CreditCard, Mail, LogOut, Trash2, Sprout, Tractor, User, MapPin } from "lucide-react";

export default function FarmerSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-black text-foreground tracking-tight">Settings</h1>
          </div>
          <p className="text-muted font-medium">Manage your personal profile, notification preferences, and account security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1 space-y-2">
          <div className="rounded-xl bg-surface p-1 border border-border/50">
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold bg-white text-primary shadow-sm border border-border/50">
               <User className="h-4 w-4" />
               Profile Information
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold text-muted hover:bg-white hover:text-foreground transition-all">
               <CreditCard className="h-4 w-4" />
               Payment Details
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold text-muted hover:bg-white hover:text-foreground transition-all">
               <Mail className="h-4 w-4" />
               Notifications
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-all border-t border-border/50 mt-4 rounded-t-none">
               <Trash2 className="h-4 w-4" />
               Delete Account
            </button>
          </div>
        </aside>

        <main className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border-2 border-border/50 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-foreground border-b-2 border-border/50 pb-4 mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              General Profile
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-border/50">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white shadow-xl">
                  <Tractor className="h-10 w-10 text-primary" />
                </div>
                <button className="rounded-xl border-2 border-border bg-white px-5 py-2.5 text-sm font-bold text-foreground hover:bg-surface">Change Photo</button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted">Full Name</label>
                  <p className="rounded-xl bg-surface px-4 py-3 text-sm font-medium border border-border/50 text-foreground opacity-70">Sourced from Auth</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted">Email Address</label>
                  <p className="rounded-xl bg-surface px-4 py-3 text-sm font-medium border border-border/50 text-foreground opacity-70">Sourced from Auth</p>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted">Business/Farm Name</label>
                  <input className="w-full rounded-xl border-2 border-border bg-white px-4 py-3.5 text-sm font-medium focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="e.g. Green Valley Organic Farms" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted">Farm Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                    <input className="w-full rounded-xl border-2 border-border bg-white pl-11 pr-4 py-3.5 text-sm font-medium focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="e.g. Benue State, Nigeria" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all">Save Changes</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
