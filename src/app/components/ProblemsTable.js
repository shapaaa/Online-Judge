"use client";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import Table from "./Table";

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
  return <Table data={data} columns={columns} />;
};

export default ProblemsTable;
