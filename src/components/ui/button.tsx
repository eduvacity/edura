import { Loader2 } from "lucide-react"
import SubmitButton from "../Button"

interface ButtonType {
  style?: string
  title: string
  callback?: () => void
  frontIcon?: any
  rareIcon?: any
  isLoading?: boolean
  variant: any
  disabled?: boolean
  spinColor?: string
}

export function CustomButton({
  style,
  title,
  callback,
  frontIcon,
  rareIcon,
  isLoading,
  variant,
  disabled,
  spinColor,
}: ButtonType) {
  return (
    <SubmitButton
      disabled={disabled}
      variant={variant}
      onClick={callback}
      className={`h-[54px] text-xl rounded-[13.33px] font-arial ${style} font-[300] text-[#E6F4ED] bg-[#41A36E] hover:bg-pcolor/90 rounded-[13.33px] gap-[10.67px] p-4 hover:scale-[0.99]`}
    >
      {isLoading && (
        <Loader2
          className={`mr-2 h-[20px] w-[20px] animate-spin ${
            spinColor ? `text-${spinColor}` : "text-[##6F4ED]"
          }`}
        />
      )}
      {!isLoading && rareIcon}
      {title}
      {frontIcon}
    </SubmitButton>
  )
}
