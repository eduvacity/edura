"use client"
import { AngleDownWard, AngleForward } from "@/components/SVGs"
import { Colors } from "@/components/theme/colors"
import { Fonts } from "@/components/theme/fonts"
import { StyledMenuTooltip } from "@/components/tooltip"
import {
  Box,
  Card,
  CardHeader,
  Divider,
  List,
  ListItemButton,
  styled,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useRouter } from "next/navigation"
import React from "react"

const StyledList = styled(List)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "& .MuiListItemButton-root": {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    font: `normal normal normal 500 16px/24px ${Fonts.primary}`,
    color: Colors.light,
    padding: "10px 16px",
    "&:focused": {
      backgroundColor: "transparent",
      color: Colors.light,
      borderRadius: 8,
      font: `normal normal normal 500 16px/24px ${Fonts.primary}`,
    },
    "&:hover": {
      backgroundColor: "transparent",
      color: Colors.light,
      borderRadius: 8,
    },
  },
  "& .Mui-selected": {
    backgroundColor: "transparent",
    color: Colors.primary,
    borderRadius: 8,
    font: `normal normal normal 500 16px/24px ${Fonts.primary}`,
    "&:focused": {
      backgroundColor: "transparent",
      color: Colors.primary,
      borderRadius: 8,
    },
    "&:hover": {
      backgroundColor: "transparent",
      color: Colors.primary,
      borderRadius: 8,
    },
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 2,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
})

export default function MenuDropdown({ item, selected }: any) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [content, setContent] = React.useState<any>(null)

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  return (
    <StyledMenuTooltip
      disableFocusListener
      disableTouchListener
      sx={{
        "& .MuiTooltip-tooltipPlacementBottom": {
          position: "relative",
          top: 6,
          backgroundColor: "transparent",
          border: `none`,
        },
      }}
      title={
        <Card className="w-[919px] h-[460px] flex rounded-xl bg-transparent shadow-[0px_4px_6px_-2px_#41A36E08,0px_12px_16px_-4px_#41A36E14,0px_0px_16px_0px_#41A36E29] transition-all duration-300">
          <div className="w-[403px] h-full border border-solid border-[#011B23] flex-col bg-pdarkcolor py-6 px-5 gap-6 shadow-[0px_0px_16px_0px_#41A36E29]">
            <StyledList>
              {item?.children?.map((child: any, index: number) => {
                const selectedItem = content?.name === child.name
                return (
                  <ListItemButton
                    disableRipple
                    alignItems="flex-start"
                    key={`item-${index}`}
                    onClick={() => setContent(child)}
                    selected={selectedItem}
                    className={
                      selectedItem
                        ? "w-full py-4 px-4 flex items-center justify-between gap-2 font-medium font-avant-garde text-base text-left text-pcolor tracking-[0.5px] hover:text-white hover:scale-[0.99] capitalize"
                        : "w-full py-3 px-4 flex items-center justify-between gap-2 font-medium font-avant-garde text-base text-left text-[red] tracking-[0.5px] hover:text-pcolor hover:scale-[0.99] capitalize"
                    }
                  >
                    <span className="w-full">{child.name}</span>
                    <AngleForward />
                  </ListItemButton>
                )
              })}
            </StyledList>
          </div>

          {content !== null ? (
            <Box
              component="div"
              className="w-[516px] h-full bg-white py-6 px-5 flex flex-col gap-6 shadow-[0px_4px_6px_-2px_#41A36E08]"
              sx={{
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                "&::-webkit-scrollbar": {
                  width: 4,
                  height: 4,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: Colors.primary,
                  borderRadius: 30,
                  boxShadow: `inset 2px 2px 2px hsla(0, 0%, 100%, 0.25),inset -2px -2px 2px rgba(0, 0, 0, 0.25)`,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#d1dadd",
                },
              }}
            >
              {content
                ? content?.subpages?.map((item: any, index: any) => {
                    return (
                      <div key={`item-${index}`}>
                        <span className="font-semibold font-avant-garde text-sm tracking-[0em] py-[14px] px-0 text-left capitalize">
                          {item.name}
                        </span>

                        <Divider className="border-[#EAECF0] my-2" />
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          {item.content.map((cont: any, index: number) => {
                            return (
                              <Grid
                                size={{ xs: 12, lg: 6 }}
                                key={`{cont-${index}}`}
                              >
                                <Card
                                  className={
                                    cont.active === true
                                      ? "w-full h-[140px] relative p-[10px] rounded-[5.43px] border-[0.8px] border-solid border-[#011B230F] flex flex-col gap-1 cursor-pointer shadow-[0px_3.104477643966675px_4.656716346740723px_-1.5522388219833374px_#10182808,0px_3.104477643966675px_4.656716346740723px_-1.5522388219833374px_#10182808,0px_9.313432693481445px_12.4179105758667px_-3.104477643966675px_#10182814]"
                                      : "w-full h-[140px] relative p-[10px] rounded-[5.43px] border-[0.8px] border-solid border-[#011B230F] flex flex-col gap-1 shadow-[0px_3.104477643966675px_4.656716346740723px_-1.5522388219833374px_#10182808,0px_3.104477643966675px_4.656716346740723px_-1.5522388219833374px_#10182808,0px_9.313432693481445px_12.4179105758667px_-3.104477643966675px_#10182814] cursor-not-allowed opacity-50"
                                  }
                                  onClick={
                                    cont.active === true
                                      ? () => {
                                          router.push(
                                            `${cont.link}?id=${cont.id}`
                                          )
                                          setAnchorEl(null)
                                        }
                                      : () => {}
                                  }
                                >
                                  <CardHeader
                                    action={
                                      cont.active === true ? (
                                        ""
                                      ) : (
                                        <span className="w-[108px] py-[2px] px-2 rounded-full border-[0.82px] border-solid bg-[#FBF0DD] text-[#E3A229] font-medium font-avant-garde text-xs tracking[0.5px]">
                                          Coming soon...
                                        </span>
                                      )
                                    }
                                  />
                                  <span className="font-bold font-avant-garde text-xs tracking-[0em] text-[#101828] capitalize">
                                    {cont.title}
                                  </span>
                                  <div className="w-full flex gap-1 mt-6">
                                    <span className="font-medium font-avant-garde text-xs text-left tracking-[0em] pr-2 border-r border-solid border-[#D7DEE0]">
                                      Cohort starts: {cont.starts}
                                    </span>
                                    <span className="font-medium font-avant-garde text-xs text-left tracking-[0em]">
                                      {cont.duration}
                                    </span>
                                  </div>
                                </Card>
                              </Grid>
                            )
                          })}
                        </Grid>
                      </div>
                    )
                  })
                : null}
            </Box>
          ) : null}
        </Card>
      }
    >
      <div
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={
          selected
            ? "font-semibold font-avant-garde lg-md:text-sm text-pcolor tracking-[0.5px] hover:text-white flex items-center justify-between cursor-pointer gap-2 capitalize"
            : "font-semibold font-avant-garde lg-md:text-sm text-white tracking-[0.5px] hover:text-pcolor flex items-center justify-between gap-2 capitalize"
        }
      >
        {item.name}{" "}
        <AngleDownWard
          className="w-3 h-3 mt-[2px]"
          style={{
            color: "inherit",
            ...(open && {
              transform: `rotate(-180deg)`,
            }),
          }}
        />
      </div>
    </StyledMenuTooltip>
  )
}
