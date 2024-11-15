import { useContext, useEffect } from "react";
import AppNavbar from "./components/AppNavbar";
import AppContext from "./context";
import { fetchProducts } from "./services/http";
import ProductList from "./components/ProductList";
import Filters from "./components/Filters";
import InitialMessage from "./components/InitialMessage";
import NotFound from "./components/NotFound";
import AppSpinner from "./components/AppSpinner";

function App() {
  const { appState, setProducts, setReqStatus } = useContext(AppContext);
  console.log(appState);

  useEffect(() => {
    const fetchItems = async () => {
      setReqStatus({ idle: false, pending: true, failed: false });
      const res = await fetchProducts(appState);

      if ("matches" in res) {
        setReqStatus({ idle: false, pending: false, failed: false });
        setProducts(res.matches);
      }
      if ("message" in res) {
        setReqStatus({ idle: false, pending: false, failed: true });
      }
    };
    if (appState.query !== "") {
      fetchItems();
    }
  }, [
    appState.query,
    appState.filters.price,
    appState.filters.categoryName,
    appState.filters.isHybridSearch,
  ]);

  const renderContent = () => {
    if (appState.reqStatus.idle) {
      return <InitialMessage />;
    }
    if (appState.reqStatus.pending) {
      return <AppSpinner />;
    }
    if (appState.products.length > 0) {
      return <ProductList products={appState.products} />;
    } else {
      return <NotFound />;
    }
  };

  return (
    <>
      <AppNavbar />
      <div className="container mx-auto grid grid-cols-7 2xl:grid-cols-6 gap-10 py-5">
        <div className="col-span-5">{renderContent()}</div>
        <div className="col-span-2 2xl:col-span-1">
          <Filters />
        </div>
      </div>
    </>
  );
}

export default App;
