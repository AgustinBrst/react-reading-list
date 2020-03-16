import { useState, useEffect } from "react";

function getLocalStorageValue(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorageValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function useLocallyStoredState(key, initialState) {
  const [state, setState] = useState(() => {
    const existingState = getLocalStorageValue(key);
    if (existingState === null) {
      setLocalStorageValue(key, initialState);
      return initialState;
    } else {
      return existingState;
    }
  });

  useEffect(() => {
    setLocalStorageValue(key, state);
  }, [state, key])

  return [state, setState];
}

export { useLocallyStoredState }