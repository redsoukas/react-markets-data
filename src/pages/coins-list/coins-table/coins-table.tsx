import { useNavigate } from 'react-router-dom';
import { Coin, Coins } from 'shared/models';
import styles from 'pages/coins-list/coins-table/coins-table.module.scss';
import { ReactElement } from 'react';

export interface CoinsTableProps {
  cols: Array<string>;
  data: Coins;
}

export const CoinsTable = ({ cols, data }: CoinsTableProps): ReactElement => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {cols.map((col: string) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row) => (
          <CoinTableRowItem key={row?.symbol} coin={row} />
        ))}
      </tbody>
    </table>
  );
};

export interface CoinTableRowItemProps {
  coin: Coin;
}

export const CoinTableRowItem = ({ coin }: CoinTableRowItemProps): ReactElement => {
  const navigate = useNavigate();
  return (
    <tr onClick={() => navigate(`/coin/${coin.id}`)}>
      <td className={styles.rank}>
        <span>{coin.rank}</span>
      </td>
      <td>
        <div className={styles.coin}>
          <img width="24" height="24" loading="lazy" src={coin.image} alt="" />
          <span>
            {coin.name} <span>{coin.symbol}</span>
          </span>
        </div>
      </td>
      <td>{coin.price}</td>
      <td>{coin.high24}</td>
      <td>{coin.low24}</td>
      <td className={coin.priceChange24 >= 0 ? 'positive' : 'negative'}>{coin.priceChange24}%</td>
    </tr>
  );
};
