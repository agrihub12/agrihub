import { LoginForm } from "@/features/auth/components/LoginForm";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-2">
          <LogIn className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-black text-foreground tracking-tight">Welcome back</h1>
        <p className="font-medium text-muted">
          Sign in to continue to your AgriHub dashboard.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
