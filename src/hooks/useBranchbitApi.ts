import { useState } from 'react';
import axios, { AxiosResponse, AxiosError, Method } from 'axios';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (payload?: any) => Promise<void>;
}

function useApi<T>(url: string, method: Method = 'get'): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (payload?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data: payload,
      });
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          setError((axiosError.response.data as { message: string }).message);
        } else {
          setError('Ocurrió un error en la solicitud');
        }
      } else {
        setError('Ocurrió un error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}

export default useApi;
