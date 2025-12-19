import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { PAGINATION_CONFIG } from '../constants/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const itemsPerPageOptions = PAGINATION_CONFIG.pageSizeOptions;

  return (
    <>
      <div className="hidden sm:grid sm:grid-cols-3 sm:items-center w-full">

        {/* IZQUIERDA - Items por página */}
        <div className="flex items-center justify-start text-sm text-text-secondary">
          Mostrar
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="ml-2 bg-background border border-border rounded-md py-1 px-2 text-text-primary
                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            {itemsPerPageOptions.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="ml-2">ítems por página</span>
        </div>

        {/* CENTRO - Página X de Y */}
        <div className="flex justify-center text-sm text-text-secondary">
          Página <span className="mx-1 font-medium">{currentPage}</span>
          de <span className="mx-1 font-medium">{totalPages}</span>
        </div>

        {/* DERECHA - Selector de páginas */}
        <div className="flex justify-end">
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-text-secondary
                   ring-1 ring-inset ring-border hover:bg-background"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page
                  ? 'z-10 bg-blue-100 text-blue-700 ring-1 ring-inset ring-border'
                  : 'text-text-primary ring-1 ring-inset ring-border hover:bg-background'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-text-secondary
                   ring-1 ring-inset ring-border hover:bg-background"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Pagination; 