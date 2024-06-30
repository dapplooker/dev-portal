"use client";
import { commonLabels } from "@/app/constants";
import { ColumnDef, useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../shadecn/ui/table";
import styles from "./TopDevelopersTable.module.scss";

interface TopDevelopersTableProps {
  columnsData: any[];
  rowsData: any[];
}

const TopDevelopersTable = ({ columnsData, rowsData }: TopDevelopersTableProps) => {
  const columns: ColumnDef<unknown, any>[] = [
    ...columnsData.map((column) => {
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
                    <TableRow key={headerGroup.id}>
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
                <TableBody className="overflow-y-auto">
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

export default TopDevelopersTable;
