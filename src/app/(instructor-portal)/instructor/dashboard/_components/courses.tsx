import { BpCheckedIcon, BpIcon } from "@/components/Inputs/Checkbox"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import { alpha } from "@mui/material/styles"
import * as React from "react"

interface Data {
  id: number
  name: string
  track: string
  progress: string
  status: React.ReactNode
}

function createData(
  id: number,
  name: string,
  track: string,
  progress: string,
  status: React.ReactNode
): Data {
  return {
    id,
    name,
    track,
    progress,
    status,
  }
}

const rows = [
  createData(
    1,
    "Abdul Fatai Saheed",
    "Iterative design",
    "40%",
    <div className="w-fit py-[11px] px-[17px] flex justify-center items-center gap-[10px] rounded-full bg-[#FFA470]/15 text-[#FD7223] font-satoshi font-medium text-[15px] leading-[21.6px] capitalize">
      inactive
    </div>
  ),
  createData(
    2,
    "John Amos Daniel",
    "Iterative design",
    "50%",
    <div className="w-fit py-[11px] px-[17px] flex justify-center items-center gap-[10px] rounded-full bg-[#FFA470]/15 text-[#FD7223] font-satoshi font-medium text-[15px] leading-[21.6px] capitalize">
      inactive
    </div>
  ),
  createData(
    3,
    "Charles Don Cole",
    "Empathy",
    "10%",
    <div className="w-fit py-[11px] px-[17px] flex justify-center items-center gap-[10px] rounded-full bg-[#E9FFF3] text-[#09BB5A] font-satoshi font-medium text-[15px] leading-[21.6px] capitalize">
      active
    </div>
  ),
  createData(
    4,
    "Juliet Ahmed Fathia",
    "Iterative design",
    "13%",
    <div className="w-fit py-[11px] px-[17px] flex justify-center items-center gap-[10px] rounded-full bg-[#E9FFF3] text-[#09BB5A] font-satoshi font-medium text-[15px] leading-[21.6px] capitalize">
      active
    </div>
  ),
  createData(
    5,
    "John David Bolu",
    "Iterative design",
    "10%",
    <div className="w-fit py-[11px] px-[17px] flex justify-center items-center gap-[10px] rounded-full bg-[#FFA470]/15  text-[#FD7223] font-satoshi font-medium text-[15px] leading-[21.6px] capitalize">
      inactive
    </div>
  ),
  createData(
    6,
    "Ali Ayisa Peace",
    "Empathy",
    "45%",
    <div className="w-fit py-[11px] px-[17px] flex justify-center items-center gap-[10px] rounded-full bg-[#E9FFF3] text-[#09BB5A] font-satoshi font-medium text-[15px] leading-[21.6px] capitalize">
      active
    </div>
  ),
]

interface HeadCell {
  id: keyof Data
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "Student Name",
  },
  {
    id: "track",
    label: "Track",
  },
  {
    id: "progress",
    label: "Progress",
  },
  {
    id: "status",
    label: "Status",
  },
]

interface EnhancedTableProps {
  numSelected: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell className="pl-10">
          <Checkbox
            disableRipple
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all courses",
            }}
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            sx={{
              "&:hover": {
                bgcolor: "transparent",
              },
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
interface EnhancedTableToolbarProps {
  numSelected: number
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props
  return (
    <Toolbar
      className="px-6"
      sx={[
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <div className="flex-[1_1_100%] text-[#071C23] font-satoshi font-bold trext-[22px] leading-[29.7px]">
          {numSelected} selected
        </div>
      ) : (
        <div className="flex-[1_1_100%] text-[#071C23] font-satoshi font-bold trext-[22px] leading-[29.7px]">
          Course in progress
        </div>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <button className="w-[153px] shadow-[0px_4px_2px_0px_#00000005] py-[14px] rounded-[7px] bg-[#3FA46E] border border-solid border-[#3FA46E] font-satoshi font-bold text-base/[21px] text-white transition-all duration-300 hover:scale-[0.99] hover:bg-[#3FA46E]/95 flex justify-center items-center mt-4">
          Set Reminder
        </button>
      )}
    </Toolbar>
  )
}
export default function CourseProgressTable() {
  const [selected, setSelected] = React.useState<readonly number[]>([])

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const visibleRows = React.useMemo(() => [...rows], [])

  return (
    <div className="w-full ">
      <div className="bg-white  rounded-[14px] border border-solid border-[#DDDDDD]">
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table className="min-w-[750px] w-full">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id)
                const labelId = `course-table-label-${index}`

                return (
                  <TableRow
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell className="pl-10">
                      <Checkbox
                        disableRipple
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                        sx={{
                          "&:hover": {
                            bgcolor: "transparent",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell className="text-left text-[#545454] font-satoshi font-medium text-base leading-[21.6px] underline underline-offset-2">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-left text-[#545454] font-satoshi font-medium text-base leading-[21.6px]">
                      {row.track}
                    </TableCell>
                    <TableCell className="text-left text-[#545454] font-satoshi font-medium text-base leading-[21.6px]">
                      {row.progress}
                    </TableCell>
                    <TableCell className="text-left text-[#545454] font-satoshi font-medium text-base leading-[21.6px]">
                      {row.status}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
