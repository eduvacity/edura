"use client"
import { SearchIcon, ViewEyeIcon } from "@/components/SVGs/portal"
import { IconButton } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { isEmpty } from "lodash"
import Link from "next/link"
import React, { useMemo } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"

interface Data {
  id: number
  name: string
  email: string
  phone: string
  action: React.ReactNode
}
interface HeadCell {
  id: keyof Data
  label: string
}

const data = [
  {
    id: 1,
    name: "Benita Micheal",
    email: "benitamicheacl@gmail.com",
    phone: "08101831001",
  },
  {
    id: 2,
    name: "Benita Micheal",
    email: "benitamicheacl@gmail.com",
    phone: "08101831001",
  },
  {
    id: 4,
    name: "Benita Micheal",
    email: "benitamicheacl@gmail.com",
    phone: "08101831001",
  },
  {
    id: 5,
    name: "Benita Micheal",
    email: "benitamicheacl@gmail.com",
    phone: "08101831001",
  },
  {
    id: 6,
    name: "Benita Micheal",
    email: "benitamicheacl@gmail.com",
    phone: "08101831001",
  },
  {
    id: 7,
    name: "Benita Micheal",
    email: "benitamicheacl@gmail.com",
    phone: "08101831001",
  },
  {
    id: 8,
    name: "Benita Micheal",
    email: "benitamicheacl@gmail.com",
    phone: "08101831001",
  },
  {
    id: 9,
    name: "Benita Micheal",
    email: "benitamicheacl@gmail.com",
    phone: "08101831001",
  },
  {
    id: 10,
    name: "Benita Micheal",
    email: "benitamicheacl@gmail.com",
    phone: "08101831001",
  },
  {
    id: 11,
    name: "Benita Micheal",
    email: "benitamicheacl@gmail.com",
    phone: "08101831001",
  },
  {
    id: 12,
    name: "Abdul Fatai Saheed",
    email: "abdulfatai@gmail.com",
    phone: "08101831001",
  },
  {
    id: 13,
    name: "Abdul Fatai Saheed",
    email: "abdulfatai@gmail.com",
    phone: "08101831001",
  },
]

const createData = (
  id: number,
  name: string,
  email: string,
  phone: string,
  action: React.ReactNode
): Data => ({
  id,
  name,
  email,
  phone,
  action,
})

const headCells: readonly HeadCell[] = [
  { id: "name", label: "Full Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "action", label: "Action" },
]

enum PaginationDirection {
  Next = "next",
  Previous = "previous",
}

export default function InstructorQuizPage() {
  const [search, setSearch] = React.useState<string>("")
  const [student, setStudent] = React.useState<string>("all")
  const [page, setPage] = React.useState<number>(0)
  const count = data.length
  const pageSize = 10
  const totalPageemails = Math.ceil(count / pageSize)

  const rows: Data[] = useMemo(
    () =>
      data?.map((row) =>
        createData(
          row.id,
          row.name,
          row.email,
          row.phone,
          <IconButton disableRipple>
            <Link href={`/instructor/student/student/12332`}>
              <ViewEyeIcon />
            </Link>
          </IconButton>
        )
      ),
    []
  )

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (student !== "all" && row.name !== student) return false
      if (search.trim() !== "") {
        const lowerSearch = search.toLowerCase()
        return (
          row.name.toLowerCase().includes(lowerSearch) ||
          row.email.toLowerCase().includes(lowerSearch) ||
          row.phone.toLowerCase().includes(lowerSearch)
        )
      }
      return true
    })
  }, [search, student, rows])

  const startIndex = page * pageSize
  const endIndex = startIndex + pageSize
  const paginatedRows = filteredRows.slice(startIndex, endIndex)

  const handlePageNavigation = (direction: PaginationDirection) => {
    if (direction === PaginationDirection.Next) {
      setPage((prevPage) => Math.min(prevPage + 1, totalPageemails - 1))
    } else {
      setPage((prevPage) => Math.max(prevPage - 1, 0))
    }
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-3">
        <TableContainer className="w-full bg-white rounded-[14px] border border-solid border-[#DDDDDD] py-3 px-4">
          <div className="w-full max-w-[404px] flex gap-2 mb-4">
            <div className="w-full relative">
              <input
                name="search"
                value={search}
                placeholder="Search for User"
                className="bg-white w-full h-[55px] py-4 px-3 pl-10 appearance-none rounded-[7px] border border-solid border-[#BDBCBC] hover:border-pcolor outline-none focus:border-pcolor text-[#4D4D4D] font-arial font-normal text-base/[18.4px] tracking-normal placeholder:text-[#4D4D4D]"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute left-4 top-5">
                <SearchIcon />
              </div>
            </div>
          </div>
          <Table className="min-w-[750px] w-full">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row) => (
                  <TableRow tabIndex={-1} key={row.id}>
                    <TableCell className="text-left text-[#545454] font-satoshi font-medium text-base leading-[21.6px] underline underline-offset-2">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-left text-[#545454] font-satoshi font-medium text-base leading-[21.6px]">
                      {row.email}
                    </TableCell>
                    <TableCell className="text-left text-[#545454] font-satoshi font-medium text-base leading-[21.6px]">
                      {row.phone}
                    </TableCell>
                    <TableCell className="text-left text-[#545454] font-satoshi font-medium text-base leading-[21.6px]">
                      {row.action}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="w-full max-w-[1488px] h-[31px] flex justify-between gap-2">
          <p className="font-arial font-normal text-base/[19.36px] tracking-normal text-[#666667]">
            Showing {startIndex + 1} to {Math.min(endIndex, count)} of {count}{" "}
            entries
          </p>
          <div className="w-[65px] h-full flex gap-[3px]">
            <button
              aria-label="Previous page"
              className="w-[31px] h-[31px] rounded-[3px] border-[0.59px] border-solid bg-pcolor disabled:bg-[#CDCDCD] flex justify-center items-center text-white"
              disabled={page === 0}
              onClick={() => handlePageNavigation(PaginationDirection.Previous)}
            >
              <FaAngleLeft />
            </button>
            <button
              aria-label="Next page"
              className="w-[31px] h-[31px] rounded-[3px] border-[0.59px] border-solid bg-pcolor disabled:bg-[#CDCDCD] flex justify-center items-center text-white"
              onClick={() => handlePageNavigation(PaginationDirection.Next)}
              disabled={page + 1 === totalPageemails || isEmpty(rows)}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
