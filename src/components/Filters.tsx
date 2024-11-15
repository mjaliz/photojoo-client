import { Button, Input, Slider } from "@nextui-org/react";
import { FormEvent, useContext, useState } from "react";
import { Checkbox } from "@nextui-org/react";

import AppContext from "../context";

export default function Filters() {
  const { appState, setFilters } = useContext(AppContext);
  const [pricesFilter, setPricesFilter] = useState([
    appState.filters.price.priceGte,
    appState.filters.price.priceLte,
  ]);
  const [isHybridSearch, setIsHybridSearch] = useState(
    appState.filters.isHybridSearch
  );
  const [category, setCategory] = useState(appState.filters.categoryName);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFilters({
      isHybridSearch,
      price: { priceGte: pricesFilter[0], priceLte: pricesFilter[1] },
      categoryName: category,
    });
  };
  const handleChange = (value: number | number[]) => {
    const prices = value as number[];
    setPricesFilter(prices);
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-10">
        <Checkbox isSelected={isHybridSearch} onValueChange={setIsHybridSearch}>
          Hybrid search
        </Checkbox>
        <Input value={category} onValueChange={setCategory} label="Category" />
        <Slider
          label="Price Range"
          step={10}
          minValue={0}
          maxValue={1000}
          defaultValue={pricesFilter}
          formatOptions={{ style: "currency", currency: "USD" }}
          className=""
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="solid"
          color="primary"
          fullWidth
          className="mt-8"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
