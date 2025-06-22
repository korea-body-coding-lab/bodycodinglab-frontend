export default interface PageDto<T = any> {
  content: T[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  number: number;
}