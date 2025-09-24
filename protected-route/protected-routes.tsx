"use client";


import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin"); // redirect if not logged in
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null; // don’t render protected content until redirect happens
  }

  return <>{children}</>;
}
