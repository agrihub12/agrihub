"use client";

import { ClipboardList, ShoppingBag, TrendingUp, Inbox } from "lucide-react";

export default function FarmerOrdersPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-black text-foreground tracking-tight">Orders</h1>
          </div>
          <p className="text-muted font-medium">Manage your sales, shipping, and order status.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Placeholder Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border-2 border-border/50 bg-white p-6 shadow-sm flex flex-col items-center justify-center min-h-[400px] border-dashed">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <ClipboardList className="h-8 w-8 text-primary opacity-50" />
            </div>
            <p className="text-lg font-bold text-foreground">No orders yet</p>
            <p className="text-muted text-sm mt-2 max-w-sm text-center font-medium">When buyers place orders for your products, they will appear here for you to fulfill.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-border/50 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-muted border-b border-border/50 pb-2">
                <span>Total Received</span>
                <span className="text-foreground">0</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-muted border-b border-border/50 pb-2">
                <span>Pending Fulfillment</span>
                <span className="text-foreground">0</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-muted border-b border-border/50 pb-2">
                <span>Refunded</span>
                <span className="text-foreground">0</span>
              </div>
              <div className="flex justify-between items-center text-lg font-black text-primary pt-2">
                <span>Net Earnings</span>
                <span>₦0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
