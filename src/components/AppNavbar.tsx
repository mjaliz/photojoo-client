import { FormEvent, useContext } from "react";
import { Navbar, NavbarContent, Input } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";

import AppContext from "../context";
import { fetchProducts } from "../services/http";

export default function AppNavbar() {
  const { appState, setQuery, setReqStatus, setProducts } =
    useContext(AppContext);
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (appState.query !== "") {
      setReqStatus({ idle: false, pending: true, failed: false });
      const res = await fetchProducts(appState);

      if ("matches" in res) {
        setReqStatus({ idle: false, pending: false, failed: false });
        setProducts(res.matches);
      }
      if ("message" in res) {
        setReqStatus({ idle: false, pending: false, failed: true });
      }
    }
  };
  return (
    <Navbar isBordered>
      <NavbarContent className="items-center w-full" justify="center">
        <form onSubmit={handleFormSubmit} className="w-full">
          <Input
            classNames={{
              base: "w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="What dress you looking for..."
            size="md"
            startContent={<SearchIcon size={18} />}
            type="search"
            value={appState.query}
            onValueChange={setQuery}
          />
        </form>
      </NavbarContent>
    </Navbar>
  );
}
