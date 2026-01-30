import axios from "axios";
import { useCallback, useState } from "react";

const useHttp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (config) => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios({
          url: config.url,
          method: config.method,
          data: config.body,
          ...config,
        });

        setData(res.data);

        return res.data;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  console.log("use Data", data);

  return {
    data,
    loading,
    error,
    sendRequest,
  };
};

export default useHttp;