import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: number[] // Custom value for the slider
  onValueChange?: (value: number[]) => void // Custom change handler
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, onValueChange, value, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = [parseFloat(event.target.value)]
      onValueChange?.(newValue)
    }

    return (
      <input
        type="range"
        ref={ref}
        className={cn(
          "w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer",
          "accent-red-500",
          className
        )}
        value={value?.[0]}
        onChange={handleChange}
        {...props}
      />
    )
  }
)

Slider.displayName = "Slider"

export { Slider }
