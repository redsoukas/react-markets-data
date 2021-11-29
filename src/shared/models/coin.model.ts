import { currencyFormat } from "shared/utils";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: string;
  high24: string;
  rank: number;
  low24: string;
  priceChange24: number;
}

export type Coins = Array<Coin>;


export class CoinVM implements Coin {
  id: string
  name: string;
  symbol: string;
  image: string;
  price: string;
  high24: string;
  rank: number;
  low24: string;
  priceChange24: number;
  constructor (data: any) {
    this.id = data?.id || '';
    this.name = data?.name || '';
    this.symbol = data?.symbol || '-';
    this.image = data?.image || null;
    this.price = currencyFormat(data?.current_price);
    this.high24 = currencyFormat(data?.high_24h);
    this.low24 = currencyFormat(data?.low_24h);
    this.rank = data?.market_cap_rank;
    this.priceChange24 = data?.price_change_percentage_24h
      ? data.price_change_percentage_24h.toFixed(2)
      : ''
  }
}
