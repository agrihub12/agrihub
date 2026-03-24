"use client";

import { useEffect, useState } from "react";
import { Bell, CreditCard, Loader2, MapPin, Phone, Save, User as UserIcon } from "lucide-react";
import { Navbar } from "@/features/marketplace/components/Navbar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { updateUser } from "@/features/auth/api/users";

export default function BuyerProfilePage() {
  const { user } = useAuth();
  const { data: currentUser, refetch } = useCurrentUser();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    location: "",
    paymentDetails: {
      preferredMethod: "card" as "card" | "transfer" | "ussd" | "wallet",
      accountName: "",
      accountNumber: "",
      bankName: "",
    },
    notificationSettings: {
      orderUpdates: true,
      paymentAlerts: true,
      marketing: false,
      smsAlerts: false,
    },
  });

  useEffect(() => {
    if (!currentUser) return;
    setForm({
      name: currentUser.name || user?.displayName || "",
      phoneNumber: currentUser.phoneNumber || "",
      address: currentUser.address || "",
      location: currentUser.location || "",
      paymentDetails: {
        preferredMethod: currentUser.paymentDetails?.preferredMethod || "card",
        accountName: currentUser.paymentDetails?.accountName || "",
        accountNumber: currentUser.paymentDetails?.accountNumber || "",
        bankName: currentUser.paymentDetails?.bankName || "",
      },
      notificationSettings: {
        orderUpdates: currentUser.notificationSettings?.orderUpdates ?? true,
        paymentAlerts: currentUser.notificationSettings?.paymentAlerts ?? true,
        marketing: currentUser.notificationSettings?.marketing ?? false,
        smsAlerts: currentUser.notificationSettings?.smsAlerts ?? false,
      },
    });
  }, [currentUser, user]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user?.uid) return;
    setSaving(true);
    setSaved(false);
    try {
      await updateUser(user.uid, form);
      await refetch();
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-foreground">My Profile</h1>
          <p className="mt-2 text-sm font-medium text-muted">
            Keep your delivery and contact details updated for faster checkout.
          </p>
        </div>

        <div className="rounded-[28px] border-2 border-border/50 bg-white p-8 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="mb-3 flex items-center gap-2 text-foreground">
              <UserIcon className="h-4 w-4 text-primary" />
              <p className="text-xs font-black uppercase tracking-widest">Profile Details</p>
            </div>
            <div className="space-y-1.5">
              <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="h-14 w-full rounded-2xl border-2 border-border bg-surface pl-12 pr-4 text-sm font-bold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    value={form.phoneNumber}
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                    placeholder="+234..."
                    className="h-14 w-full rounded-2xl border-2 border-border bg-surface pl-12 pr-4 text-sm font-bold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="City / State"
                    className="h-14 w-full rounded-2xl border-2 border-border bg-surface pl-12 pr-4 text-sm font-bold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted">
                Default Shipping Address
              </label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={3}
                placeholder="Street address, city, state..."
                className="w-full resize-none rounded-2xl border-2 border-border bg-surface px-4 py-4 text-sm font-bold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5"
              />
            </div>

            <div className="mt-4 border-t border-border/50 pt-6">
              <div className="mb-4 flex items-center gap-2 text-foreground">
                <CreditCard className="h-4 w-4 text-primary" />
                <p className="text-xs font-black uppercase tracking-widest">Payment Details</p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted">
                    Preferred Method
                  </label>
                  <select
                    value={form.paymentDetails.preferredMethod}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        paymentDetails: {
                          ...form.paymentDetails,
                          preferredMethod: e.target.value as "card" | "transfer" | "ussd" | "wallet",
                        },
                      })
                    }
                    className="h-14 w-full rounded-2xl border-2 border-border bg-surface px-4 text-sm font-bold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5"
                  >
                    <option value="card">Card</option>
                    <option value="transfer">Bank Transfer</option>
                    <option value="ussd">USSD</option>
                    <option value="wallet">Wallet</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted">
                    Account Name
                  </label>
                  <input
                    value={form.paymentDetails.accountName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        paymentDetails: {
                          ...form.paymentDetails,
                          accountName: e.target.value,
                        },
                      })
                    }
                    placeholder="Account holder name"
                    className="h-14 w-full rounded-2xl border-2 border-border bg-surface px-4 text-sm font-bold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted">
                    Account Number
                  </label>
                  <input
                    value={form.paymentDetails.accountNumber}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        paymentDetails: {
                          ...form.paymentDetails,
                          accountNumber: e.target.value,
                        },
                      })
                    }
                    placeholder="0123456789"
                    className="h-14 w-full rounded-2xl border-2 border-border bg-surface px-4 text-sm font-bold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted">
                    Bank Name
                  </label>
                  <input
                    value={form.paymentDetails.bankName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        paymentDetails: {
                          ...form.paymentDetails,
                          bankName: e.target.value,
                        },
                      })
                    }
                    placeholder="Your bank"
                    className="h-14 w-full rounded-2xl border-2 border-border bg-surface px-4 text-sm font-bold outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-border/50 pt-6">
              <div className="mb-4 flex items-center gap-2 text-foreground">
                <Bell className="h-4 w-4 text-primary" />
                <p className="text-xs font-black uppercase tracking-widest">Notification Settings</p>
              </div>

              <div className="space-y-3">
                {[
                  { key: "orderUpdates", label: "Order Updates" },
                  { key: "paymentAlerts", label: "Payment Alerts" },
                  { key: "marketing", label: "Promotions & Marketing" },
                  { key: "smsAlerts", label: "SMS Notifications" },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-border/50 bg-surface px-4 py-3"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                      {item.label}
                    </span>
                    <input
                      type="checkbox"
                      checked={form.notificationSettings[item.key as keyof typeof form.notificationSettings]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          notificationSettings: {
                            ...form.notificationSettings,
                            [item.key]: e.target.checked,
                          },
                        })
                      }
                      className="h-4 w-4 accent-primary"
                    />
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : "Save Profile"}
            </button>

            {saved ? (
              <p className="text-center text-[11px] font-black uppercase tracking-widest text-emerald-600">
                Profile updated successfully
              </p>
            ) : null}
          </form>
        </div>
      </main>
    </div>
  );
}
