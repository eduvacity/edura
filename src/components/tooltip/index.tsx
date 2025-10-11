import { styled } from "@mui/material"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import { Colors } from "../theme/colors"

export const StyledMenuTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} arrow={props.arrow} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    width: "100%",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: Colors.primary,
  },
}))
