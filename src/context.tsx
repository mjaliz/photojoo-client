import { createContext, useState } from "react";
import { PropsWithChildren } from "react";
import { Product } from "./services/http";

interface AppContextType {
  appState: AppState;
  setQuery: (query: string) => void;
  setFilters: (filters: AppFilter) => void;
  setProducts: (products: Product[]) => void;
}
export interface AppFilter {
  isHybridSearch: boolean;
  categoryName: string;
  price: PriceFilter;
}
export interface AppState {
  products: Product[];
  query: string;
  filters: AppFilter;
}
export interface PriceFilter {
  priceGte: number;
  priceLte: number;
}

const initialState: AppState = {
  products: [],
  query: "",
  filters: {
    isHybridSearch: true,
    categoryName: "",
    price: { priceGte: 0, priceLte: 1000 },
  },
};

const defaultContext: AppContextType = {
  appState: {
    products: [],
    query: "",
    filters: {
      isHybridSearch: true,
      categoryName: "",
      price: { priceGte: 0, priceLte: 1000 },
    },
  },
  setQuery: () => {},
  setFilters: () => {},
  setProducts: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export function AppProvider({ children }: PropsWithChildren) {
  const [appState, setAppState] = useState<AppState>(initialState);

  const setQuery = (query: string) => {
    setAppState({ ...appState, query });
  };

  const setFilters = (filters: AppFilter) => {
    setAppState({ ...appState, filters });
  };

  const setProducts = (products: Product[]) => {
    setAppState({ ...appState, products });
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        setQuery,
        setProducts,
        setFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default AppContext;
