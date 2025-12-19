import Pagination from './Pagination';

interface Props {
  page: number;
  pageSize: number;
  total?: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
}

export const ListPagination = ({
  page,
  pageSize,
  total = 0,
  onPageChange,
  onPageSizeChange
}: Props) => {
  if (!total) return null;

  const totalPages = Math.ceil(total / pageSize);

  return (
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      itemsPerPage={pageSize}
      onPageChange={onPageChange}
      onItemsPerPageChange={onPageSizeChange}
    />
  );
};
