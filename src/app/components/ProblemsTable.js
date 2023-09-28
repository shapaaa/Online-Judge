"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

const ProblemsTable = ({ data }) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => (
        <Link
          href={`/problems/${info
            .getValue()
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor("difficulty", {
      header: "Difficulty",
      cell: (info) => info.getValue(),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="  flex justify-center  rounded">
      <table className="w-9/12 text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="px-6 py-3" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="border-b bg-white" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemsTable;
