export const currencyFormat = (number: number): string => {
  if (!number) return '';

  const options = {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 10
  };
  const formated = new Intl.NumberFormat('en-IN', options).format(number).toString();

  return formated;
}

export const setUrlParams = (url: URL, paramsObject: any): URL => {
  Object.keys(paramsObject).forEach( key => {
    url.searchParams.set(key, paramsObject[key]);
  });
  return url;
}
