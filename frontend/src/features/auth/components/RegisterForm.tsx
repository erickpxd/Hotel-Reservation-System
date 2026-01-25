/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { Input } from "../../../shared/components/Input";
import { registerSchema, type RegisterData } from "../schemas/registerSchema";
import { registerUser } from "../services/authApi";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    setServerError(null);

    try {
      await registerUser(data);

      toast.success("Account created successfully", {
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
        <p className="text-gray-500">Start your journey with us today</p>
      </div>

      {serverError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <Input
            icon={User}
            placeholder="Maria da silva"
            type="text"
            error={errors.name?.message}
            {...register("name")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <Input
            icon={Mail}
            placeholder="Maria@example.com"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <Input
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            error={errors.password?.message}
            {...register("password")}
            
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin" size={20} />}
          {isSubmitting ? "Processing..." : "Create account"}
        </button>

        <div className="text-center text-sm text-gray-600">
          Already have an account?
          <a
            href="/login"
            className="ml-1 text-blue-600 font-semibold hover:underline"
          > 
          Login
          </a> 
        </div>
      </form>
    </div>
  );
}
