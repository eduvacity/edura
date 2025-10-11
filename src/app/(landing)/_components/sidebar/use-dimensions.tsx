"use client"
import { useLayoutEffect, useState } from "react"

// Custom hook to measure dimensions of an element
export const useDimensions = (ref: any) => {
  // Store dimensions in state to trigger re-renders on changes
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return // Return if ref is not yet available (e.g., during SSR)

    // Function to update the dimensions based on current element size
    const updateDimensions = () => {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      })
    }

    // Attach a ResizeObserver to track size changes
    const observer = new ResizeObserver(() => {
      updateDimensions()
    })

    observer.observe(ref.current) // Start observing the ref element's size

    // Initial update for the dimensions on the first render
    updateDimensions()

    // Cleanup function to disconnect the observer when the component unmounts
    return () => observer.disconnect()
  }, [ref])

  // Safely return null when dimensions haven't been measured yet
  if (dimensions.width === 0 && dimensions.height === 0) {
    return null
  }

  return dimensions
}
