import { Dispatch, SetStateAction, useState } from "react";

export function useDebounce<T>(timeout: number) {
  const [debounce, setDebounce] = useState<NodeJS.Timeout>();

  return function(value: T, setValue: Dispatch<SetStateAction<T>> | Dispatch<T>) {
    if (debounce) {
      clearTimeout(debounce);
    }

    const st = setTimeout(() => {
      setValue(value);
    }, timeout)

    setDebounce(st);
  }
}