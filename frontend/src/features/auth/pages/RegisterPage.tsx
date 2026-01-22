import { RegisterBanner } from "../components/RegisterBanner";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <RegisterBanner />

      <div className="flex items-center justify-center p-8 lg:p-16 bg-white">
        <RegisterForm />
      </div>
    </div>
  );
}
