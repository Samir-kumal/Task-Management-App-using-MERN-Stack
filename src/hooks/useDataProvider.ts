import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const useDataProvider = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataProvider must be used within a DataProvider");
  }
  const { data } = context;
  if (data && data[0] && data[0]._id) {
    const boardId = data[0]._id;
    localStorage.setItem("boardID", boardId);
  }
  return context;
};

export default useDataProvider;