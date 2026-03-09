/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { Input } from "../../../shared/components/Input";
import { loginSchema, LoginData } from "../schemas/loginSchema";
import { loginUser } from "../services/authApi";
import { useAuth } from "../../../context/AuthContext";

export function LoginForm() {
  const { login } = useAuth();
  const [showPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const result = await loginUser(data);

      toast.success("Login successful!");
      login(result.access_token);
    } catch (err: any) {
      toast.error(err.message || "Login error.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-500">Please enter your details to sign in</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <Input
            icon={Mail}
            placeholder="Enter your email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            error={errors.password?.message}
            {...register("password")}
            rightElement={
              <button type="button" className="hover:text-gray-600"></button>
            }
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white 
          font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin" size={20} />}
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?
          <a
            href="/register"
            className="ml-1 text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}
