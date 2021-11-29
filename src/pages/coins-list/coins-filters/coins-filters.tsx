import styles from 'pages/coins-list/coins-filters/coins-filters.module.scss';
import { BaseSyntheticEvent, ReactElement, useState } from 'react';

export interface CoinsFiltersProps {
  currentPage: number;
  isFinalPage: boolean;
  perPage: number;
  onPaginate: (a: number) => void;
  onReset: () => void;
  onUpdateLimit: (limit: number) => void;
}

export const CoinsFilters = ({
  currentPage = 0,
  perPage = 100,
  isFinalPage = false,
  onPaginate,
  onUpdateLimit,
  onReset
}: CoinsFiltersProps): ReactElement => {
  const prevPage = currentPage - 1 > 0 ? currentPage - 1 : null;
  const nextPage = currentPage + 1;

  const [limit, setLimit] = useState(perPage);

  return (
    <div className={styles.filters}>
      <button className="tag" onClick={() => onReset()}>
        Reset
      </button>
      {prevPage && <button onClick={() => onPaginate(prevPage)}>{prevPage}</button>}
      <span>{currentPage}</span>
      {isFinalPage ? null : (
        <button className="tag" onClick={() => onPaginate(nextPage)}>
          {nextPage}
        </button>
      )}
      <input
        type="number"
        min="1"
        placeholder={`${limit} per page`}
        onChange={(e: BaseSyntheticEvent) => {
          setLimit(e.target.value);
        }}
      />
      <button
        className="tag"
        onClick={() => {
          onUpdateLimit(limit);
        }}
      >
        OK
      </button>
    </div>
  );
};
