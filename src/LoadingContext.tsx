// LoadingContext.tsx
import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import type { PropsWithChildren } from "react";

interface LoadingContextType {
  register: (label?: string) => () => void;
  allLoaded: boolean;
}

const LoadingContext = createContext<LoadingContextType>({
  register: () => () => {},
  allLoaded: false,
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const totalRef = useRef(0);
  const loadedRef = useRef(0);
  const [allLoaded, setAllLoaded] = useState(false);

  const register = useCallback((label = "unknown") => {
    totalRef.current += 1;

    let called = false;
    // Return an unregister + done tuple, or just track via ref
    const done = () => {
      if (called) return;
      called = true;
      loadedRef.current += 1;
      console.log(
        `[Loading] Done: ${label} (${loadedRef.current}/${totalRef.current})`,
      );

      if (loadedRef.current >= totalRef.current) {
        setTimeout(() => setAllLoaded(true), 2000); //delay
      }
    };

    // Return also an "unregister" so StrictMode cleanup can undo it
    done.unregister = () => {
      if (!called) totalRef.current -= 1;
    };

    return done;
  }, []);

  return (
    <LoadingContext.Provider value={{ register, allLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};
