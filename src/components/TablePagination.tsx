"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  total: number;
};

const TablePagination = ({ total }: Props) => {
  // page size
  const [page, setPage] = useState<number>(10);
  const [pages, setPages] = useState<number[]>([]);

  const params = useSearchParams();

  const getPagesCount = (total: number, page: number) => {
    let _pages = [];
    let _count = total / page;

    if (total < page) {
      _count = 1;
    } else {
      if (total % page === 0) {
        _count += 0;
      } else {
        _count += 1;
      }
    }

    for (let i = 0; i < _count; i++) {
      _pages.push(i + 1);
    }

    setPages(_pages);
  };

  useEffect(() => {
    if (total === 0) return;
    getPagesCount(total, page);
  }, [total, page]);

  return (
    <div className=" flex flex-row justify-between items-center w-full">
      <div>
        <select
          className=""
          onChange={(e) => setPage(parseInt(e.target.value))}
        >
          <option>10</option>
          <option>50</option>
          <option>100</option>
          <option>200</option>
          <option>250</option>
        </select>
      </div>
      <div className="flex flex-row justify-between items-center gap-3">
        <div>
          <span className="text-sm">Total No Of Records : {total}</span>
        </div>
        <div className="flex flex-row justify-start items-center border">
          <button className="px-3 text-sm" type="button">
            Prev
          </button>
          <div className="flex flex-row justify-start items-center ">
            {pages.map((page, index) => {
              let showPage = false;
              let p = parseInt(params?.get("p") || "") | 0;
              if (page === p - 1) {
                showPage = true;
              } else if (page === p + 1) {
                showPage = true;
              } else if (p === page) {
                showPage = true;
              }
              if (showPage) {
                return (
                  <div
                    key={index}
                    className="h-8 w-8 grid place-content-center border"
                  >
                    {page}
                  </div>
                );
              }
            })}
          </div>
          <button className="px-3 text-sm" type="button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
