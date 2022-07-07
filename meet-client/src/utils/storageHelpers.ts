export const storage = {
    set: <T>(key: string, value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get: <T>(key: string) => {
      return JSON.parse(localStorage.getItem(key) as any) as T;
    },
    delete: (key: string) => {
      localStorage.removeItem(key);
    },
    clear: () => {
      localStorage.clear();
    }
};
