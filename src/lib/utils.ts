import { RootState, store } from "@/redux/store";
import { type ClassValue, clsx } from "clsx";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Token = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth;
};

export function handleDescription(description: string, maxLength: number) {
  if (description.length <= maxLength) {
    return description; // Description is within the limit, no need to truncate
  } else {
    // Find the last space within the maxLength
    let lastSpaceIndex = description.lastIndexOf(" ", maxLength);

    // If there's no space within the maxLength, just truncate at maxLength
    if (lastSpaceIndex === -1) {
      return description.substring(0, maxLength) + "...";
    } else {
      // Truncate at the last space within maxLength
      return description.substring(0, lastSpaceIndex) + "...";
    }
  }
}

export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function that will be called before the effect is re-applied
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const filterOption = (input: any, option: any) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export const getAuthToken = () : string => {
  const token = store.getState()?.auth?.token;
  return token;
};
