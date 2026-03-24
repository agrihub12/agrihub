import { SignupForm } from "@/features/auth/components/SignupForm";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-2">
          <UserPlus className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-black text-foreground tracking-tight">Create account</h1>
        <p className="font-medium text-muted">
          Join AgriHub as a farmer or buyer in minutes.
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
