import { useState, useEffect } from "react";

const initialState: any = {
  loading: false,
  data: [],
  error: ''
};

export const useFetch = (url: string) => {
  const [fetchState, setFetchState] = useState(initialState);
  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setFetchState({ ...initialState, loading: true });
      try {
        const response = await fetch(url);
        const resData = await response.json();
        setFetchState({ loading: false, data: resData, error: '' });
      } catch (err) {
        setFetchState({ loading: false, data: [], error: err });
      }
    };

    fetchData();
  }, [url]);

  return fetchState;
};
