import { useEffect, useState } from "react";

const getStorageValue = (key: string, defaultValue: string) => {
  if (typeof window !== "undefined") {
    const saved = sessionStorage.getItem(key);
    const initial = JSON.parse(saved!);
    return initial || defaultValue;
  }
}


const useSessionStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value])

  return [value, setValue];
}

export default useSessionStorage;