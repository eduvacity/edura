"use client"
import { AngleDownWard, AngleUpwardIcon, UserIcon } from "@/components/SVGs"
import { Colors } from "@/components/theme/colors"
import { Fonts } from "@/components/theme/fonts"
import { updateKey } from "@/lib/utils/utils"
import { CardHeader, Collapse, Menu, MenuItem } from "@mui/material"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import { styled } from "@mui/material/styles"
import { motion, useCycle } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"
import { useMenu } from "./menu"
import { MenuToggle } from "./sidebar/menuToggle"

const StyledList = styled(List)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  "& .MuiListItemButton-root": {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    font: `normal normal normal 500 16px/24px ${Fonts.primary}`,
    color: Colors.secondary,
    padding: "10px 16px",
    backgroundColor: "transparent",
    "&:focused": {
      backgroundColor: "transparent",
      color: Colors.primary,
      borderRadius: 8,
      font: `normal normal normal 500 16px/24px ${Fonts.primary}`,
    },
    "&:hover": {
      backgroundColor: "transparent",
      color: Colors.primary,
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
const StyledMenu = styled((props: any) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(() => ({
  "& .MuiPaper-root": {
    width: "100%",
    background: Colors.secondary,
    transition: "all 0.25s",
  },
}))

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

export default function MenuLists() {
  const { menu } = useMenu()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = React.useRef(null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [content, setContent] = React.useState<any>(null)
  const [openNest, setOpenNest] = React.useState(-1)

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const handleClick = (item: any, index: number) => {
    setContent(item)
    setOpenNest((prevIndex) => (prevIndex === index ? -1 : index))
  }
  return (
    <div className="flex xl:hidden relative top-0  right-[55px]">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        ref={containerRef}
      >
        <div className="absolute">
          <MenuToggle toggle={() => toggleOpen()} />
        </div>
      </motion.nav>
      {isOpen ? (
        <motion.div variants={variants}>
          <div className="max-w-[550px]  bg-pdarkcolor border-t py-4 px-6 flex absolute top-[60px] left-auto -right-[70px]">
            <List
              component="nav"
              disablePadding
              className="w-full flex flex-col gap-[10px] py-6 px-2 "
            >
              {menu?.map((item, i) => {
                const selected = pathname.startsWith(
                  `/${updateKey(item.name.toLowerCase())}`
                )
                return (
                  <div key={i}>
                    {item?.children ? (
                      <>
                        <ListItemButton
                          disableRipple
                          id="popover-button"
                          aria-controls={open ? "popover-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleOpen}
                          key={`item:${i}`}
                          sx={{
                            py: 0,
                            minHeight: 48,
                          }}
                          selected={selected}
                          className="w-full flex justify-between font-medium font-avant-garde text-base gap-[10px] items-center text-white"
                        >
                          <span className="w-full">{item.name}</span>{" "}
                          <AngleDownWard
                            style={{
                              ...(open && {
                                transform: `rotate(-180deg)`,
                              }),
                            }}
                          />{" "}
                        </ListItemButton>
                        <StyledMenu
                          id="popover-menu"
                          MenuListProps={{
                            "aria-labelledby": "popover-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          <StyledList className="bg-[rgba(249,_250,_251,_1)] px-4 w-full min-h[200px]">
                            {item?.children?.map(
                              (child: any, index: number) => {
                                const selectedItem =
                                  content?.name === child.name
                                return (
                                  <div key={`item-${index}`}>
                                    <ListItemButton
                                      disableRipple
                                      onClick={() => handleClick(child, index)}
                                      alignItems="flex-start"
                                      selected={selectedItem}
                                      className={
                                        selectedItem
                                          ? "w-full py-6 px-4 flex justify-between items-center font-medium font-avant-garde text-lg text-left text-pcolor tracking-[0.5px] hover:text-white hover:scale-[0.99] capitalize"
                                          : "w-full py-6 px-4 flex justify-between items-center font-medium font-avant-garde text-lg text-left text-white tracking-[0.5px] hover:text-pcolor hover:scale-[0.99] capitalize"
                                      }
                                    >
                                      <span className="w-full">
                                        {child.name}
                                      </span>
                                      {openNest === index ? (
                                        <AngleDownWard />
                                      ) : (
                                        <AngleUpwardIcon />
                                      )}
                                    </ListItemButton>
                                    <Collapse
                                      in={openNest === index}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      {content !== null ? (
                                        <div key={`item-${index}`}>
                                          {content?.subpages?.map(
                                            (cont: any, index: number) => {
                                              return (
                                                <div
                                                  key={`item-${index}`}
                                                  className="w-full flex flex-col gap-1"
                                                >
                                                  <span className="font-semibold font-avant-garde text-base tracking-[0em] text-[#101828] py-8 px-2 text-left capitalize">
                                                    {cont.name}
                                                  </span>

                                                  <Divider className="border-[#EAECF0]" />
                                                  <Grid
                                                    container
                                                    spacing={2}
                                                    sx={{ mt: 1 }}
                                                  >
                                                    {cont?.content?.map(
                                                      (
                                                        sub: any,
                                                        index: number
                                                      ) => {
                                                        return (
                                                          <Grid
                                                            size={{
                                                              xs: 12,
                                                              lg: 6,
                                                            }}
                                                            key={`{cont-${index}}`}
                                                          >
                                                            <div
                                                              className={
                                                                sub.active ===
                                                                true
                                                                  ? "w-full h-[140px] relative p-[10px] rounded-[5.43px] border-[0.8px] border-solid border-[#011B230F] flex flex-col gap-1 cursor-pointer shadow-[0px_3.104477643966675px_4.656716346740723px_-1.5522388219833374px_#10182808,0px_3.104477643966675px_4.656716346740723px_-1.5522388219833374px_#10182808,0px_9.313432693481445px_12.4179105758667px_-3.104477643966675px_#10182814]"
                                                                  : "w-full h-[140px] relative p-[10px] rounded-[5.43px] border-[0.8px] border-solid border-[#011B230F] flex flex-col gap-1 shadow-[0px_3.104477643966675px_4.656716346740723px_-1.5522388219833374px_#10182808,0px_3.104477643966675px_4.656716346740723px_-1.5522388219833374px_#10182808,0px_9.313432693481445px_12.4179105758667px_-3.104477643966675px_#10182814] cursor-not-allowed opacity-50"
                                                              }
                                                              onClick={() => {
                                                                router.push(
                                                                  `${sub.link}?id=${sub.id}`
                                                                )
                                                                toggleOpen()
                                                              }}
                                                            >
                                                              <CardHeader
                                                                action={
                                                                  sub.active ===
                                                                  true ? (
                                                                    ""
                                                                  ) : (
                                                                    <span className="w-[108px] py-[2px] px-2 rounded-full border-[0.82px] border-solid bg-[#FBF0DD] text-[#E3A229] font-medium font-avant-garde text-xs tracking[0.5px]">
                                                                      Coming
                                                                      soon...
                                                                    </span>
                                                                  )
                                                                }
                                                              />

                                                              <span className="font-bold font-avant-garde text-sm tracking-[0em] text-[#101828] capitalize">
                                                                {sub.title}
                                                              </span>
                                                              <div className="w-full flex gap-1 mt-2">
                                                                <span className="font-medium font-avant-garde text-xs text-left tracking-[0em] pr-2 border-r border-solid border-[#D7DEE0]">
                                                                  {" "}
                                                                  Cohort starts:{" "}
                                                                  {sub.starts}
                                                                </span>
                                                                <span className="font-medium font-avant-garde text-xs text-left tracking-[0em]">
                                                                  {sub.duration}
                                                                </span>
                                                              </div>
                                                            </div>
                                                          </Grid>
                                                        )
                                                      }
                                                    )}
                                                  </Grid>
                                                </div>
                                              )
                                            }
                                          )}
                                        </div>
                                      ) : null}
                                    </Collapse>
                                  </div>
                                )
                              }
                            )}
                          </StyledList>
                          <Divider sx={{ my: 0.5 }} />
                        </StyledMenu>
                      </>
                    ) : (
                      <>
                        <ListItemButton
                          onClick={() => {
                            router.push(
                              `/${updateKey(item.name.toLocaleLowerCase())}`
                            )
                            toggleOpen()
                          }}
                          key={`item:${i}`}
                          sx={{
                            py: 0,
                            minHeight: 48,
                          }}
                          className="w-[320px] font-medium font-avant-garde text-base text-white"
                        >
                          {item.name}
                        </ListItemButton>
                      </>
                    )}
                  </div>
                )
              })}
              <Divider sx={{ borderColor: "rgba(27, 49, 57, 1)", my: 0.5 }} />
              <div className="w-full flex flex-col gap-3 mt-2">
                <MenuItem disableRipple>
                  <span
                    onClick={() => router.push("/auth/login")}
                    className="w-[160px] py-3 flex items-center gap-[10px] justify-start font-bold font-avant-garde text-sm rounded-[49px] bg-transparent hover:scale-[0.99] cursor-pointer"
                  >
                    <UserIcon className="flex-shrink-0" /> Student portal
                  </span>
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <button
                    className="w-[140px] py-3 px-5 flex items-center justify-center font-medium font-avant-garde text-sm rounded-[49px] bg-pcolor hover:scale-[0.99] cursor-pointer"
                    onClick={() => router.push("/signup")}
                  >
                    Apply now
                  </button>
                </MenuItem>
              </div>
            </List>
          </div>
        </motion.div>
      ) : null}
    </div>
  )
}
