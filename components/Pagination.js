'use client';

import { useRouter } from 'next/navigation';
import styles from '@/styles/Pagination.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Pagination({ currentPage, totalPages, totalResults }) {
  const router = useRouter();

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      router.push(`/?page=${currentPage + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(`/?page=${currentPage - 1}`);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowButton}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        aria-label="backArrowButton"
      >
        <ArrowBackIcon fontSize="large" />
      </button>
      <span className={styles.paginationInfo}>
        {totalResults} results ({currentPage} of {totalPages})
      </span>
      <button
        className={styles.arrowButton}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="forwardArrowButton"
      >
        <ArrowForwardIcon fontSize="large" />
      </button>
    </div>
  );
}
