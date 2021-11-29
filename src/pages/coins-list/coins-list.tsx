import { ReactElement, useEffect, useReducer } from 'react';
import { CoinsTable } from 'pages/coins-list/coins-table/coins-table';
import {
  apiBase,
  initialState,
  reducer,
  resetFilters,
  switchPage,
  updateCoins,
  updateLimitPerPage
} from 'pages/coins-list/state';
import { CoinsFilters } from 'pages/coins-list/coins-filters/coins-filters';
import { useFetch } from 'shared/hooks';
import { setUrlParams } from 'shared/utils';
import { Loader } from 'shared/components';

export const CoinsList = (): ReactElement => {
  const [{ paramsObject, coins }, dispatch] = useReducer(reducer, initialState);

  // setup api url
  const apiUrl = setUrlParams(apiBase, paramsObject);
  const { data, loading } = useFetch(apiUrl?.href);

  // we assume if data is empty - pagination went too far
  const isFinalPage = data?.length === 0;
  const currentPage = paramsObject?.page;
  const perPage = paramsObject?.per_page;

  // init data
  useEffect(() => {
    dispatch(updateCoins(data));
  }, [data]);

  const onPaginate = (pageNum: number): void => {
    dispatch(switchPage(pageNum));
  };

  const onUpdateLimit = (limit: number): void => {
    dispatch(updateLimitPerPage(limit));
  };

  const onReset = () => {
    dispatch(resetFilters());
  };

  const paginationParams = {
    currentPage,
    isFinalPage: isFinalPage,
    perPage,
    onPaginate,
    onReset,
    onUpdateLimit
  };

  const cols = ['#', 'Name', 'Price', 'High 24', 'Low 24', 'Change 24'];

  return (
    <div className="container">
      {loading ? <Loader /> : <CoinsFilters {...paginationParams} />}
      <CoinsTable cols={cols} data={coins} />
    </div>
  );
};
