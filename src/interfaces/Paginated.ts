export interface PaginatedProps {
  page: number;
  pageSize: number;
  search: string;
  type: string;
  isPaginated: number;
}


export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
  // other properties...
}