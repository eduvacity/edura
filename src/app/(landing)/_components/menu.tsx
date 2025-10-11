"use client"
import { useProgramsMenu } from "@/hooks/useProgramMenu" // Path to the custom hook

export const useMenu = () => {
  const { programs, loading } = useProgramsMenu()

  const menu = [
    { name: "About us" },
    {
      name: "Programs",
      children: programs || [],
    },
    { name: "Become an Instructor" },
  ]

  return { menu, loading }
}
