import { currencyFormat, setUrlParams } from "shared/utils";

describe('Utils test suite', () => {

  describe('currencyFormat Tests', () => {
    let number: number = 3245223;
    let formatted: string;
  
    beforeEach( () => {
      formatted = currencyFormat(number);
    });
  
    it('Formatted type should be string', () => {
      expect(typeof formatted).toBe('string');
    });
  
    it('Formated value Should contain $ dollar sign', () => {
      expect(formatted).toContain('$');
    });
  
    it('3245223 number Should have 2 commas ($32,45,223)', () => {
      const commas = formatted.match(/,/g);
      expect(commas?.length).toEqual(2);
    });
  });

  describe('setUrlParams tests', () => {

    it('Should set params properly to url without initial query params', () => {

      const url = new URL('https://api.coingecko.com/api/v3/coins/markets');

      const paramsObject = {
        page: 1,
        vs_currency: 'usd'
      };

      const urlWithParams = setUrlParams(url, paramsObject);
      expect(urlWithParams.href).toEqual(`https://api.coingecko.com/api/v3/coins/markets?page=${paramsObject.page}&vs_currency=${paramsObject.vs_currency}`);
    });

    it('Should set params properly to url with initial query params', () => {

      const url = new URL('https://api.coingecko.com/api/v3/coins/markets?page=1&vs_currency=usd');
      const paramsObject = {
        page: 55,
        vs_currency: 'eur',
        per_page: 120
      };

      const urlWithParams = setUrlParams(url, paramsObject);
      expect(urlWithParams.href).toEqual(`https://api.coingecko.com/api/v3/coins/markets?page=${paramsObject.page}&vs_currency=${paramsObject.vs_currency}&per_page=${paramsObject.per_page}`);
    });
  });
});


