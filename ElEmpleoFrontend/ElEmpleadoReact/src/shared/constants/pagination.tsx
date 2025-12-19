export const PAGINATION_CONFIG = {
  defaultPageNumber: 1,
  defaultPageSize: 8,
  pageSizeOptions: [6, 12, 18, 24, 30],
  minPageSize: 1,
  maxPageSize: 100
} as const;
export const PAGINATION_UTILS = {
  getDefaults: () => ({
    pageNumber: PAGINATION_CONFIG.defaultPageNumber,
    pageSize: PAGINATION_CONFIG.defaultPageSize
  }),
  normalize: (pageNumber?: number | null, pageSize?: number | null) => ({
    pageNumber: (pageNumber && pageNumber > 0) ? pageNumber : PAGINATION_CONFIG.defaultPageNumber,
    pageSize: (pageSize && pageSize > 0) ? pageSize : PAGINATION_CONFIG.defaultPageSize
  }),
  isValid: (pageNumber?: number | null, pageSize?: number | null): boolean => {
    return !!(
      pageNumber && pageNumber > 0 &&
      pageSize && pageSize > 0 && pageSize <= PAGINATION_CONFIG.maxPageSize
    );
  }
} as const;
