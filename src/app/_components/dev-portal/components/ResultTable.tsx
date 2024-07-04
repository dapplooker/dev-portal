"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import millify from "millify";
import { ColumnDef, useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../shadecn/ui/table";
import { ProjectInfo } from "@/app/interface";
import { commonLabels, routes } from "@/app/constants";
import devPortalConstant from "../constants";
import styles from "./ResultTable.module.scss";

interface ResultTableProps {
  columnsData: any[];
  rowsData: any[];
}

const ResultTable = ({ columnsData, rowsData }: ResultTableProps) => {
  const { STARS, FORKS, COMMITS, NAME, PROJECT_NAME } = devPortalConstant.tableColNames;

  const columns: ColumnDef<unknown, any>[] = [
    ...columnsData.map((column) => {
      if (column === PROJECT_NAME || column === NAME) {
        return {
          accessorKey: column,
          header: () => <div>{column}</div>,
          cell: ({ row }: { row: any }) => {
            const projectInfo: ProjectInfo = row.getValue(column);
            const avatarUrl = projectInfo?.avatarUrl;
            return (
              <div className={styles.projectInfoWrapper}>
                <Image
                  src={avatarUrl}
                  alt="project name"
                  className={styles.avatar}
                  width={20}
                  height={20}
                />
                <Link
                  href={`${routes.github}${projectInfo?.title}`}
                  target="_blank"
                  className={styles.projectName}
                >
                  {projectInfo.title}
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
    data: rowsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {table.getHeaderGroups()[0].headers.length > 0 && (
        <div className={styles.resultTable}>
          {
            <>
              <Table className={styles.table}>
                <TableHeader className={styles.tableHeader}>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className={styles.tableRow}
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            className={styles.tableColumn}
                            key={header.id}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        );
                      })}
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
            </>
          }
        </div>
      )}
    </>
  );
};

export default ResultTable;
