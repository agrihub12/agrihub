"use client";

import { CreditScoreGauge } from "@/features/loans/components/CreditScoreGauge";
import { LoanEligibilityCard } from "@/features/loans/components/LoanEligibilityCard";
import { LoanOfferCard } from "@/features/loans/components/LoanOfferCard";
import { Badge } from "@/shared/components/Badge";
import { Button } from "@/shared/components/Button";
import { RefreshCw, History, Info, ExternalLink } from "lucide-react";
import { useState } from "react";
import { formatNaira } from "@/lib/format";

export default function LoansPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Hardcoded data for demonstration
  const farmerData = {
    creditScore: 82,
    isEligible: true,
    maxLoanAmount: 2500000, // 2.5M Naira
    offers: [
      {
        amount: 2500000,
        interestRate: 12.5,
        tenure: "12 Months",
        repaymentSchedule: "Monthly instalments"
      }
    ],
    transactions: [
      { id: "TX1001", type: "Sale", amount: 450000, status: "completed", date: "2024-03-20" },
      { id: "TX1002", type: "Sale", amount: 890000, status: "completed", date: "2024-03-15" },
      { id: "TX1003", type: "Repayment", amount: 50000, status: "on-time", date: "2024-03-10" },
      { id: "TX1004", type: "Sale", amount: 210000, status: "completed", date: "2024-03-05" },
    ]
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/50 pb-6">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight mb-1">
            Financing <span className="text-primary italic">Desk.</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
            <Info className="h-3 w-3" />
            Check eligibility & manage farm credit lines.
          </p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 rounded-xl h-10 px-5 text-xs font-black uppercase tracking-widest border-2 border-border bg-white hover:bg-surface/50 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Calculating..." : "Update Score"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Score and Eligibility */}
        <div className="lg:col-span-1 space-y-8">
          <CreditScoreGauge score={farmerData.creditScore} />
          <LoanEligibilityCard 
            score={farmerData.creditScore} 
            eligible={farmerData.isEligible} 
            maxAmount={farmerData.maxLoanAmount}
            isChecking={isRefreshing}
          />
        </div>

        {/* Right column: Offers and History */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-foreground tracking-tight uppercase">Active Offers</h2>
              <span className="text-[9px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">
                Live Status
              </span>
            </div>
            {farmerData.isEligible ? (
              <LoanOfferCard {...farmerData.offers[0]} />
            ) : (
              <div className="rounded-[24px] border-2 border-dashed border-border p-10 text-center bg-surface/30">
                <p className="text-xs font-bold text-muted">Complete more transactions to unlock loan offers.</p>
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <History className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-black text-foreground tracking-tight uppercase">Credit History</h2>
            </div>
            <div className="overflow-hidden rounded-[24px] border-2 border-border/50 bg-white shadow-sm transition-all hover:border-primary/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-border bg-surface/30 whitespace-nowrap">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Type</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Amount</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Date</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {farmerData.transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-surface/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`text-sm font-black ${tx.type === 'Repayment' ? 'text-primary' : 'text-foreground'}`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-black text-foreground">
                            {formatNaira(tx.amount * 100)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge status={tx.status as any} />
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-muted">{tx.date}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 hover:bg-surface rounded-lg transition-colors text-muted-foreground">
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
