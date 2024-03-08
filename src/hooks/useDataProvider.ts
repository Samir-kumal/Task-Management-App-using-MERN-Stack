import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const useDataProvider = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataProvider must be used within a DataProvider");
  }

  return context;
};

export default useDataProvider;