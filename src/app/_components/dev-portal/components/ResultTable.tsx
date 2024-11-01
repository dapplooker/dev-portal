"use client";
import { useState } from "react";
import Link from "next/link";
import millify from "millify";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../shadecn/ui/table";
import { commonLabels } from "@/app/constants";
import devPortalConstant from "../constants";
import styles from "./ResultTable.module.scss";

interface ResultTableProps {
  columnsData: any[];
  rowsData: any[];
  type: "TopDevelopers" | "TopDapps";
}

const ResultTable = ({ columnsData, rowsData, type }: ResultTableProps) => {
  const [modifiedRowsData, setModifiedRowsData] = useState(rowsData);

  const filteredColumnsData = columnsData.filter((column) => column !== "GITHUB_URL" && column !== "AVATAR_URL");
  const { STARS, FORKS, COMMITS, NAME, PROJECT_NAME } = devPortalConstant.tableColNames;

  const columns: ColumnDef<unknown, any>[] = [
    ...filteredColumnsData.map((column) => {
      if (column === "NAME" || column === "PROJECT_NAME") {
        return {
          accessorKey: column,
          header: () => <div>{column}</div>,
          cell: ({ row }: { row: any }) => {
            const githubUrl = row.original?.GITHUB_URL;
            const avatarUrl = row.original?.AVATAR_URL;
            const name =
              type === "TopDevelopers"
                ? row.original?.NAME || "Loading..."
                : row.original?.PROJECT_NAME || "Loading...";
            return (
              <div className={styles.projectInfoWrapper}>
                <img
                  src={avatarUrl}
                  alt="project name"
                  className={styles.avatar}
                ></img>
                <Link
                  href={`${githubUrl}`}
                  target="_blank"
                  className={styles.projectName}
                >
                  {name}
                </Link>
              </div>
            );
          },
        };
      }
      if (column === STARS || column === FORKS || column === COMMITS) {
        return {
          accessorKey: column,
          header: () => <div>{column}</div>,
          cell: ({ row }: { row: any }) => {
            return <span className={`${column === STARS && styles.customColor}`}>{millify(row.getValue(column))}</span>;
          },
        };
      }
      return {
        accessorKey: column,
        header: column,
      };
    }),
  ];

  const table = useReactTable({
    data: modifiedRowsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {table.getHeaderGroups()[0].headers.length > 0 && (
        <div className={styles.resultTable}>
          <Table className={styles.table}>
            <TableHeader className={styles.tableHeader}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className={styles.tableRow}
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className={styles.tableColumn}
                      key={header.id}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="h-full">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className={styles.tableRow}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className={styles.tableCell}
                        key={cell.id}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className={styles.tableRow}>
                  <TableCell
                    className={styles.tableCell}
                    colSpan={columns.length}
                  >
                    {commonLabels.noDataFound}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default ResultTable;
