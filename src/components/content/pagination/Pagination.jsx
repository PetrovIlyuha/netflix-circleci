import React, { useState } from 'react';
import './Pagination.scss';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const changePage = (type) => {
    switch (type) {
      case 'prev':
        if (currentPage >= 1) {
          setCurrentPage((prev) => prev - 1);
        }
        break;
      case 'next':
        if (currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
        break;
    }
  };
  return (
    <React.Fragment>
      <button
        className={
          currentPage === 1 ? 'paginate-button disable' : 'paginate-button'
        }
        onClick={() => changePage('prev')}
      >
        Previous
      </button>
      <span className="pageCount">
        {currentPage} / {totalPages}
      </span>
      <button
        className={
          currentPage === totalPages
            ? 'paginate-button disable'
            : 'paginate-button'
        }
        onClick={() => changePage('next')}
      >
        Next
      </button>
    </React.Fragment>
  );
};

export default Pagination;
