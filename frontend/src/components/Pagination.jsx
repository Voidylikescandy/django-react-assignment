import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page items based on current page and total pages
  const getPageItems = () => {
    const items = [];
    const maxDisplayedPages = 5;
    
    // Previous page button
    items.push(
      <BootstrapPagination.Prev 
        key="prev" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // Calculate range of pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);
    
    // Adjust if at the end
    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    // First page
    if (startPage > 1) {
      items.push(
        <BootstrapPagination.Item
          key={1}
          onClick={() => onPageChange(1)}
        >
          1
        </BootstrapPagination.Item>
      );
      if (startPage > 2) {
        items.push(<BootstrapPagination.Ellipsis key="ellipsis1" disabled />);
      }
    }

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <BootstrapPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </BootstrapPagination.Item>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<BootstrapPagination.Ellipsis key="ellipsis2" disabled />);
      }
      items.push(
        <BootstrapPagination.Item
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </BootstrapPagination.Item>
      );
    }

    // Next page button
    items.push(
      <BootstrapPagination.Next
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  // Don't render pagination if only 1 page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <BootstrapPagination>{getPageItems()}</BootstrapPagination>
    </div>
  );
};

export default Pagination; 