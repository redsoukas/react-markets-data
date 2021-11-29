import { Coin, CoinVM } from 'shared/models';

export const apiBase = new URL('https://api.coingecko.com/api/v3/coins/markets');

// Initial State
export const initialState = {
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
export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SWITCH_PAGE: {
      const newPage = action?.page;
      return {
        ...state,
        paramsObject: {
          ...state.paramsObject,
          page: newPage
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
      return {
        ...state,
        coins: action?.coins?.map((coin: Coin) => new CoinVM(coin))
      };
    }
    case ActionTypes.UPDATE_LIMIT: {
      const limit = action?.limit;
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
export const updateCoins = (coins: any) => {
  return {
    type: ActionTypes.UPDATE_COINS,
    coins
  };
};

export const switchPage = (page: number) => {
  return {
    type: ActionTypes.SWITCH_PAGE,
    page
  };
};

export const resetFilters = () => {
  return {
    type: ActionTypes.RESET
  };
};

export const updateLimitPerPage = (limit: number) => {
  return {
    type: ActionTypes.UPDATE_LIMIT,
    limit
  };
};
