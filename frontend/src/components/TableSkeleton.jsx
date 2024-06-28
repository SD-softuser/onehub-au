import React from "react";

const TableSkeleton = () => (
  <div className="table-auto w-full my-3">
    <div className="flex flex-col space-y-3">
      <div className="h-[125px] w-full rounded-xl animate-pulse bg-dark-4 bg-gray-200" />
      <div className="space-y-2">
        <div className="h-6 w-full animate-pulse rounded-md bg-dark-4 bg-gray-200" />
        <div className="h-6 w-full animate-pulse rounded-md bg-dark-4 bg-gray-200" />
        <div className="h-6 w-full animate-pulse rounded-md bg-dark-4 bg-gray-200" />
        <div className="h-6 w-full animate-pulse rounded-md bg-dark-4 bg-gray-200" />
        <div className="h-6 w-full animate-pulse rounded-md bg-dark-4 bg-gray-200" />
        <div className="h-6 w-full animate-pulse rounded-md bg-dark-4 bg-gray-200" />
      </div>
    </div>
  </div>
);

export default TableSkeleton