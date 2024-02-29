import { useState,useEffect } from "react";

const useLocalStorage = (key: string, initialValue: null) => {
    const [localStorageValue, setLocalStorageValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });
    
useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageValue));
  }, [localStorageValue, key]);

  return [localStorageValue, setLocalStorageValue];
};
export default useLocalStorage;