function getPageNumbers(currentPage: number, totalPages: number, maxButtons = 5): number[] {
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(currentPage - half, 0);
    let end = start + maxButtons - 1;
  
    if (end >= totalPages) {
      end = totalPages - 1;
      start = Math.max(end - maxButtons + 1, 0);
    }
  
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
}
export default getPageNumbers;