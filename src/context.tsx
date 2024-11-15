import { createContext, useState } from "react";
import { PropsWithChildren } from "react";
import { Product } from "./services/http";

interface AppContextType {
  appState: AppState;
  setQuery: (query: string) => void;
  setFilters: (filters: AppFilter) => void;
  setProducts: (products: Product[]) => void;
  setReqStatus: (reqStatus: ReqStatus) => void;
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
  reqStatus: ReqStatus;
}

export interface ReqStatus {
  idle: boolean;
  pending: boolean;
  failed: boolean;
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
  reqStatus: {
    idle: true,
    pending: false,
    failed: false,
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
    reqStatus: {
      idle: true,
      pending: false,
      failed: false,
    },
  },
  setQuery: () => {},
  setFilters: () => {},
  setProducts: () => {},
  setReqStatus: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export function AppProvider({ children }: PropsWithChildren) {
  const [appState, setAppState] = useState<AppState>(initialState);

  const setQuery = (query: string) => {
    setAppState((appState) => {
      return { ...appState, query };
    });
  };

  const setFilters = (filters: AppFilter) => {
    setAppState((appState) => {
      return { ...appState, filters };
    });
  };

  const setProducts = (products: Product[]) => {
    setAppState((appState) => {
      return { ...appState, products };
    });
  };

  const setReqStatus = (reqStatus: ReqStatus) => {
    setAppState((appState) => {
      return { ...appState, reqStatus };
    });
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        setQuery,
        setProducts,
        setFilters,
        setReqStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default AppContext;
