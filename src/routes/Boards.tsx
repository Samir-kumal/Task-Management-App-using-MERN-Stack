import { useCallback, useEffect, useState } from "react";
import useDataProvider from "../hooks/useDataProvider";
import Button from "../components/Button";
import CreateBoardModal from "../components/Common/CreateBoardModal";
import UpdateBoardModal from "../components/Common/UpdateBoardModal";
import { useNavigate } from "react-router-dom";
import useAuthProvider from "../hooks/useAuthProvider";
import EditIcon from "../components/svgs/EditIcon";
import taskLength from "../helper/TasksLength";
import LoadingComponent from "../components/Common/LoadingComponent";
import NoItemsFound from "../components/Common/NoItemsFound";
import Footer from "../components/Footer";

const Boards = () => {
  const [createModelVisible, setCreateModelVisible] = useState(false);
  const [updateModelVisible, setUpdateModelVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const { token } = useAuthProvider();
  const { getTaskItems, setTasksData, setBoardID} =
    useDataProvider();

  const navigate = useNavigate();
  const handleCreateBoardClick = useCallback(async () => {
    setCreateModelVisible(true);
    console.log("board rendered");
  }, [createModelVisible]);

  const handleUpdateBoardClick = useCallback(
    async (title: string, id: string) => {
      setUpdateModelVisible(true);
      setSelectedBoard(title);
      setBoardID(id);
    },
    [updateModelVisible, selectedBoard]
  );

  const handleBoardClick = (boardID: string) => {
    setTasksData(null);
    if (boardID) {
      const selectedBoard = data?.find((item) => item._id === boardID);
      if (selectedBoard && selectedBoard?.tasks.length > 0 && token) {
        getTaskItems(boardID, token);
      } else {
        setTasksData([]);
      }
      setTimeout(() => navigate(`/dashboard/boards/${boardID}`), 500);
    }
  };
  const { data, getBoardItems } = useDataProvider();

  useEffect(() => {
    getBoardItems();
  }, []);
  return (
    <div className="flex flex-col w-full px-4 bg-blue-100">
      <div className="w-full h-screen">
        <div className="p-4 flex flex-row items-center gap-x-2">
          <h1 className="font-bold text-2xl text-black font-poppins">Boards</h1>

          <button
            onClick={handleCreateBoardClick}
            className="btn btn-active bg-white rounded-full text-xs flex flex-row  text-black btn-sm font-poppins "
          >
            + Create a board
          </button>
        </div>
        <div className="grid w-full place-content-center grid-cols-3 gap-y-3 gap-x-6 p-4">
          {data && data.length > 0 ? (
            data.map((item) => {
              const { completedTasks, totalTasks, progress } = taskLength(item);
              return (
                <div
                  className="group w-full relative shadow-sm"
                  key={item._id}
                >
                  {" "}
                  <Button
                    onClick={() => handleBoardClick(item._id)}
                    style="p-4 bg-white w-full "
                  >
                    <h1 className="text-lg text-black font-semibold overflow-hidden font-poppins text-left">
                      {item.title}
                    </h1>
                    <div className="flex flex-row items-center mt-4 justify-between font-poppins">
                      <p className="text-xs">Progress</p>
                      <p className="text-xs text-right text-black font-poppins">
                        {completedTasks}/{totalTasks}
                      </p>
                    </div>

                    <progress
                      className="progress progress-primary  w-full  mt-2"
                      value={progress}
                      max="100"
                    ></progress>
                  </Button>
                  <button
                    className="group-hover:block hidden absolute right-4 transition-all duration-300 top-4"
                    onClick={() => handleUpdateBoardClick(item.title, item._id)}
                  >
                    <EditIcon fill="#000" width={15} height={15} />
                  </button>
                </div>
              );
            })
          ) : data && data?.length === 0  ? (
            <NoItemsFound content="No board Found" />
          ) : (
            <LoadingComponent content="Loading Boards" />
          )}
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
      <Footer/>
    </div>
  );
};

export default Boards;
