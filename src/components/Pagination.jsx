import React from "react";

export default function Pagination({ page, setPage, totalPages }) {
  function prevToggle() {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  function nextToggle() {
    if (page < 100) {
      setPage((prev) => prev + 1);
    }
  }

  return (
    <div className="text-white flex w-full justify-center pb-[50px]   ">
      <div className="flex gap-[10px]">
        <button onClick={prevToggle}>prev</button>
        <p>{page}</p>
        <p>...</p>
        <p>{totalPages}</p>
        <button onClick={nextToggle}>next</button>
      </div>
    </div>
  );
}
