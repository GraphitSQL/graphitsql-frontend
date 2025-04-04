import { useEffect, useState } from 'react';

const useDebounce = (value: any, delay: number): [string, any] => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return [debouncedValue, setDebouncedValue];
};

export default useDebounce;
