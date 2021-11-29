import { Coin, Coins, CoinVM } from 'shared/models';

export const apiBase = new URL('https://api.coingecko.com/api/v3/coins/markets');

type CoinListParams = { [key: string]: any };

interface CoinListState {
  coins: Coins;
  paramsObject: CoinListParams;
}

// Initial State
export const initialState: CoinListState = {
  coins: [],
  paramsObject: {
    page: 1,
    vs_currency: 'usd',
    per_page: 100
  }
};

// Action Types
export enum ActionTypes {
  SWITCH_PAGE,
  UPDATE_LIMIT,
  RESET,
  UPDATE_COINS
}

// Reducer
export const reducer = (state: CoinListState = initialState, action: any): CoinListState => {
  switch (action.type) {
    case ActionTypes.SWITCH_PAGE: {
      const { page } = action?.payload;
      return {
        ...state,
        paramsObject: {
          ...state.paramsObject,
          page
        }
      };
    }
    case ActionTypes.RESET: {
      return {
        ...state,
        ...initialState
      };
    }
    case ActionTypes.UPDATE_COINS: {
      const { coins } = action?.payload;
      return {
        ...state,
        coins: coins?.map((coin: Coin) => new CoinVM(coin))
      };
    }
    case ActionTypes.UPDATE_LIMIT: {
      const { limit } = action?.payload;
      return {
        ...state,
        paramsObject: {
          ...state.paramsObject,
          per_page: limit
        }
      };
    }
    default: {
      return state;
    }
  }
};

// Actions
export const updateCoins = (coins: Coins): Record<string, unknown> => {
  return {
    type: ActionTypes.UPDATE_COINS,
    payload: {
      coins
    }
  };
};

export const switchPage = (page: number): Record<string, unknown> => {
  return {
    type: ActionTypes.SWITCH_PAGE,
    payload: {
      page
    }
  };
};

export const resetFilters = (): Record<string, unknown> => {
  return {
    type: ActionTypes.RESET
  };
};

export const updateLimitPerPage = (limit: number): Record<string, unknown> => {
  return {
    type: ActionTypes.UPDATE_LIMIT,
    payload: {
      limit
    }
  };
};
