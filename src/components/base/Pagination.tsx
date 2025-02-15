"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const { t } = useTranslation();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    startPage = Math.max(1, endPage - maxVisiblePages + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`btn btn-sm mx-1 rounded-none ${
            currentPage === i
              ? "bg-black text-white"
              : "bg-gray-200 text-black  "
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination flex items-center justify-center">
      <button
        className="btn btn-sm mx-1 rounded-none"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaLongArrowAltLeft className="me-1" />
        {t("Previous")}
      </button>

      {renderPageNumbers()}

      <button
        className="btn btn-sm mx-1 rounded-none"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {t("Next")}
        <FaLongArrowAltRight className="ms-1" />
      </button>
    </div>
  );
}
