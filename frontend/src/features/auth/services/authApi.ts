import { RegisterData } from "../schemas/registerSchema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthResponse {
  id: string;
  email: string;
  name: string;
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  const payload = {
    name: data.name,
    email: data.email,
    password: data.password,
  };

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message || "An error occurred while registering.";
    
    throw new Error(errorMessage);
  }

  return response.json();
}