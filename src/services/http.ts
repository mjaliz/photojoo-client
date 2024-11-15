import axios, { AxiosError } from "axios";
import { AppState } from "../context";

export interface Product {
  id: string;
  metadata: {
    name: string;
    current_price: number;
    category_name: string;
    image_url: string;
  };
}

export interface ApiResponse {
  namespaces: string;
  matches: Product[];
}

export interface ApiError {
  message: string;
  status: number | undefined;
}

let baseUrl = "https://api-photojoo.liara.run";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:8000";
}

export const fetchProducts = async (
  state: AppState
): Promise<ApiResponse | ApiError> => {
  try {
    let filtersQuery = "";
    filtersQuery += `&keyword_search=${state.filters.isHybridSearch}`;
    if (state.filters.price.priceLte > 0) {
      filtersQuery += `&price_gte=${state.filters.price.priceGte}&price_lte=${state.filters.price.priceLte}`;
    }
    if (state.filters.categoryName !== "") {
      filtersQuery += `&category_name=${state.filters.categoryName}`;
    }

    const { data } = await axios.get<ApiResponse>(
      `${baseUrl}/search/?query=${state.query}${filtersQuery}`
    );

    return data;
  } catch (error: unknown) {
    const err = error as AxiosError;
    return {
      message: err.message,
      status: err.response?.status,
    };
  }
};
