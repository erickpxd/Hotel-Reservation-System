import { AuthBanner } from "../../features/auth/components/AuthBanner"; 
import { LoginForm } from "../../features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <AuthBanner />
      <div className="flex items-center justify-center p-8 lg:p-16 bg-white">
        <LoginForm />
      </div>
    </main>
  );
}
