"use client"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginValues = z.infer<typeof LoginSchema>

export default function LoginScreen() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  })

  const [authError, setAuthError] = useState<string | null>(null)

  const onSubmit = async (values: LoginValues) => {
    setAuthError(null)
    await new Promise((r) => setTimeout(r, 500))
    const success = true
    if (!success) {
      setAuthError("Invalid email or password")
      return
    }
    router.push("/student/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#38494E] font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-[540px] rounded-2xl shadow-lg bg-white/80 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/logo.svg"
                alt="App Logo"
                width={160}
                height={160}
                className="mb-3"
              />
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-sm text-gray-600">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {authError && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-2">
                  {authError}
                </div>
              )}

              <div className="flex justify-end items-right text-sm">
                <Link
                  href="#"
                  className="text-[#38494E] hover:underline font-medium text-right"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4D6C62] text-white hover:bg-[#4D6C62]/80 hover:text-black transition-colors duration-300 rounded-xl mt-3"
              >
                {isSubmitting ? "Signing In…" : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
