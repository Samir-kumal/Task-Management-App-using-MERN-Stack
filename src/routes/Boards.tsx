import React, { useCallback, useState } from "react";
import SideBar from "../components/SideBar";
import useDataProvider from "../hooks/useDataProvider";
import Button from "../components/Button";
import CreateBoardModal from "../components/Common/CreateBoardModal";
import UpdateBoardModal from "../components/Common/UpdateBoardModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthProvider from "../hooks/useAuthProvider";

const Boards = () => {
  const [createModelVisible, setCreateModelVisible] = useState(false);
  const [updateModelVisible, setUpdateModelVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [boardParams, setBoardParams] = useSearchParams();
  const { token } = useAuthProvider();
  const { getTaskItems, setTasksData,setBoardID } = useDataProvider();
  const navigate = useNavigate();
  const handleCreateBoardClick = useCallback(async () => {
    setCreateModelVisible(true);
    console.log("board rendered");
  }, [createModelVisible]);

  const handleBoardClick = (boardID: string) => {
    // setBoardParams({boardID: "123"});
    navigate(`/dashboard/boards/${boardID}`);
    setBoardID(boardID);
    const selectedBoard = data?.find((item) => item._id === boardID);
    if (selectedBoard && selectedBoard?.tasks.length > 0 && token) {
      getTaskItems(boardID, token);
    } else {
      setTasksData([]);
    }
  };
  const { data } = useDataProvider();
  return (
    <div className="flex flex-row gap-x-16 bg-blue-100/70">
      <SideBar />
      <div className="w-full h-screen">
        <h1>Boards</h1>
        <div className="grid place-content-center grid-cols-3 gap-3">
          {data ? (
            data.map((item) => (
              <Button
                onClick={() => handleBoardClick(item._id)}
                style="p-4 bg-white rounded-xl"
              >
                <p>{item.title}</p>
              </Button>
            ))
          ) : (
            <p>No board found</p>
          )}
          <Button
            onClick={handleCreateBoardClick}
            style="bg-primary text-white"
          >
            Create a new Board
          </Button>
        </div>
      </div>

      {createModelVisible && (
        <CreateBoardModal setModelVisible={setCreateModelVisible} />
      )}
      {updateModelVisible && (
        <UpdateBoardModal
          selectedBoard={selectedBoard}
          setModelVisible={setUpdateModelVisible}
        />
      )}
    </div>
  );
};

export default Boards;
