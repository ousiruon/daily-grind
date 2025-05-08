export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };
  const getItem = () => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  };
  return {
    setItem,
    getItem
  };
};
