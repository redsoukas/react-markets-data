import { useState } from 'react';
import { useFetch } from 'shared/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { CoinDetailsVM, Github } from 'shared/models';
import { ProgressBar } from 'shared/components/progressBar/progressBar';
import { Loader } from 'shared/components';
import { PriceChart } from 'pages/coin-details/price-chart/price-chart';
import { Description } from 'pages/coin-details/description/description';
import { Percentage, Reputation } from 'shared/models/coin-details.model';
import styles from 'pages/coin-details/coin-details.module.scss';

export const CoinDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const coinDetailsApiUrl = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`;

  const coinDetailsFetchState = useFetch(coinDetailsApiUrl);

  const chartIntervals: any = {
    DAY_1: '1',
    DAY_14: '14',
    MONTH_1: '30',
    MONTH_3: '90',
    YEAR_1: '365',
    MAX: 'max'
  };

  const [chartInterval, setChartInterval] = useState(chartIntervals.DAY_14);

  const chartApiUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${chartInterval}&interval=${chartInterval}}`;

  const chartApiFetchState = useFetch(chartApiUrl);

  const coinData = new CoinDetailsVM(coinDetailsFetchState?.data);

  if (coinDetailsFetchState?.loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <button
        className="tag"
        onClick={() => {
          navigate('/');
        }}
      >
        All coins
      </button>
      <div>
        <div className={styles.header}>
          <img src={coinData.image} alt="" />
          <strong className={styles.price}>{coinData.price}</strong>
          <span>{coinData.symbol}</span>
          <span>Rank #{coinData.rank}</span>
        </div>
        <h1 className={styles.title}>{coinData.name}</h1>

        <Description content={coinData.description} />
        <SocialLinks social={coinData?.social} />
        <ContactLinks contact={coinData?.contactLinks} />
        <GithubStats {...coinData?.github} />
        <Votes upvotes={coinData.upvotePercentage} downvotes={coinData.downvotePercentage} />
        <PriceChange priceChangePercentage={coinData?.priceChangePercentage} />

        <p>
          The highest price since the creation of the coin (ATH) was{' '}
          <strong>{coinData?.ath}</strong> at <strong>{coinData?.athDate}</strong> & the lowest
          price since the creation of the coin (ATL) was <strong>{coinData?.atl}</strong> at{' '}
          <strong>{coinData?.atlDate}</strong>
        </p>
      </div>

      <div className={styles.chartFilters}>
        <label htmlFor="interval">Chart Interval (days):</label>
        <select
          value={chartInterval}
          onChange={(e) => {
            setChartInterval(e.target.value);
          }}
          id="interval"
        >
          {Object.keys(chartIntervals).map((key: any) => {
            return <option key={key}>{chartIntervals[key]}</option>;
          })}
        </select>
      </div>
      <PriceChart state={chartApiFetchState} title={`${coinData?.name} price chart`} />
    </div>
  );
};

export const SocialLinks = ({ social }: any) => {
  const nonEmpty = Object.keys(social).filter((key) => social[key].link !== '');
  if (nonEmpty?.length === 0) return null;
  return (
    <ul className={styles.info}>
      <label>social</label>
      {Object.keys(social).map((key) => {
        const link = social[key]?.link;
        const subs = social[key]?.subs;
        if (!social[key]?.link) return null;
        return (
          <li key={key}>
            <a className="tag" target="_blank" rel="noopener noreferrer" href={link}>
              {key}
            </a>
            {subs && <span style={{ position: 'absolute', padding: '8px' }}>{subs}</span>}
          </li>
        );
      })}
    </ul>
  );
};

export const Votes = ({ upvotes, downvotes }: Reputation) => {
  return (
    <div className={styles.votes}>
      <div>
        <span>Upvotes: {upvotes}%</span>
        <span>Downvotes: {downvotes}%</span>
      </div>
      <ProgressBar percentage={upvotes} />
    </div>
  );
};

export const PriceChange = ({ priceChangePercentage }: Percentage) => {
  return (
    <ul className={styles.info}>
      <label>Price Change Percentage</label>
      {Object.keys(priceChangePercentage)?.map((key) => {
        const perc = priceChangePercentage[key];
        if (!perc) return null;
        return (
          <li key={key}>
            <strong>{key}: </strong>
            <i className={perc >= 0 ? 'positive' : 'negative'}>{perc}%</i>
          </li>
        );
      })}
    </ul>
  );
};

export const ContactLinks = ({ contact }: any) => {
  return (
    <ul className={styles.info}>
      {Object.keys(contact)?.map((key) => {
        if (!contact[key]?.length) return null;
        return (
          <li key={contact[key]}>
            <label>{key}: </label>
            {contact[key]?.map((link: string) => {
              if (!link) return null;
              return (
                <a className="tag" target="_blank" rel="noreferrer noopener" key={link} href={link}>
                  {link}
                </a>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
};

export const GithubStats = ({ repos, forks, stars, subscribers, issues }: Github) => {
  if (!repos?.length) return null;
  return (
    <div>
      <ul className={styles.info}>
        <label>Github</label>
        <li>
          {repos?.map((repo) => {
            return (
              <a key={repo} className="tag" target="_blank" rel="noreferrer noopener" href={repo}>
                {repo}
              </a>
            );
          })}
        </li>
        {forks && (
          <li>
            <span>Forks: {forks}</span>
          </li>
        )}
        {stars && (
          <li>
            <span>Stars: {stars}</span>
          </li>
        )}
        {subscribers && (
          <li>
            <span>Subscribers: {subscribers}</span>
          </li>
        )}
        {issues && (
          <li>
            <span>Issues: {issues}</span>
          </li>
        )}
      </ul>
    </div>
  );
};
