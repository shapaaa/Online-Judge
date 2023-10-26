"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import Table from "@/app/components/Table";

const SubmissionsTable = ({ submissions }) => {
  const columnHelper = createColumnHelper();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const handleClick = (modalData) => {
    setShowModal(!showModal);
    setModalData(!!modalData ? modalData : "");
  };
  const columns = [
    columnHelper.accessor("userId", {
      header: "User",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("questionId", {
      header: "Problem",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("verdict", {
      header: "Result",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("language", {
      header: "Language",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("program", {
      header: "Code",
      cell: (info) => (
        <button
          type="button"
          class="mb-2 mr-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => handleClick(info.getValue())}
        >
          {"</>"}
        </button>
      ),
    }),
  ];

  return (
    <>
      <Table data={submissions} columns={columns} />
      {showModal && (
        <div
          id="defaultModal"
          tabindex="-1"
          aria-hidden="true"
          class="z-100 fixed left-0 right-0 top-0  h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
        >
          <div class=" relative left-1/4 top-[10px]  max-h-full w-full max-w-2xl">
            <div class="relative rounded-lg bg-white shadow-md shadow-gray-400 dark:bg-gray-700">
              <div class="flex  items-start justify-between rounded-t  px-4 py-[10px] dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Code
                </h3>
                <button
                  type="button"
                  onClick={handleClick}
                  class="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    class="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="px-[20px] py-[10px]">
                <div className="h-[600px] overflow-y-scroll rounded-md border">
                  <Editor
                    value={modalData}
                    disabled
                    highlight={(code) => highlight(code, languages.js)}
                    padding={10}
                    className="min-h-[600px] "
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 16,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SubmissionsTable;
