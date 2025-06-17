// import { Pagination } from "react-bootstrap";
// import React from "react";

// export default function PaginationBar() {
//     console.log("In Pagination")
//     return (
//       <div>
//         <Pagination className="outline-warning success" size="sm">
//           <Pagination.First />
//           <Pagination.Prev />
//           <Pagination.Item>{1}</Pagination.Item>
//           <Pagination.Item>{2}</Pagination.Item>
//           <Pagination.Item>{3}</Pagination.Item>
//           <Pagination.Item active>{4}</Pagination.Item>
//           <Pagination.Item>{5}</Pagination.Item>
//           <Pagination.Next />
//           <Pagination.Last />
//         </Pagination>
//       </div>
//     );
//   }
  
import React, { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationBar = ({
  totalRecords,
  recordsPerPage,
  currentPage,
  onPageChange
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [pageArray, setPageArray] = useState([]);

  useEffect(() => {
    const pages = Math.ceil(totalRecords / recordsPerPage) || 1;
    setTotalPages(pages);
  }, [totalRecords, recordsPerPage]);

  useEffect(() => {
    const generatePageArray = () => {
      let pages = [];
      if (totalPages <= 9) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 5) {
          pages = [1, 2, 3, 4, 5, 6, 7, 8, '', totalPages];
        } else if (totalPages - currentPage <= 4) {
          pages = [
            1, '',
            totalPages - 7, totalPages - 6, totalPages - 5,
            totalPages - 4, totalPages - 3, totalPages - 2,
            totalPages - 1, totalPages
          ];
        } else {
          pages = [
            1, '',
            currentPage - 2, currentPage - 1, currentPage,
            currentPage + 1, currentPage + 2,
            '', totalPages
          ];
        }
      }
      setPageArray(pages);
    };

    generatePageArray();
  }, [totalPages, currentPage]);

  const handlePageClick = (page) => {
    if (page !== '' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <Pagination className="justify-content-center my-3">
      <Pagination.First onClick={() => handlePageClick(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} />

      {pageArray.map((page, index) => (
        <React.Fragment key={index}>
          {page === '' ? (
            <Pagination.Ellipsis disabled />
          ) : (
            <Pagination.Item
              active={page === currentPage}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </Pagination.Item>
          )}
        </React.Fragment>
      ))}

      <Pagination.Next onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

export default PaginationBar;
