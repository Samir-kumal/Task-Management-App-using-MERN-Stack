import { useState, useCallback } from "react";
import Button from "./Button";
import useAuthProvider from "../hooks/useAuthProvider";
import useDataProvider from "../hooks/useDataProvider";
import ToggleIconClose from "./svgs/ToggleIconClose";
import ToggleIconOpen from "./svgs/ToggleIconOpen";
import CreateBoard from "./Common/CreateBoardModal";
import UserProfileDropDown from "./UserProfileDropDown";
import EditIcon from "./svgs/EditIcon";
import UpdateBoardModal from "./Common/UpdateBoardModal";
import LoadingComponent from "./Common/LoadingComponent";

const SideBar = () => {
  const [visible, setVisible] = useState(true);
  const [createModelVisible, setCreateModelVisible] = useState(false);
  const [updateModelVisible, setUpdateModelVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuthProvider();
  const handleToggle = useCallback(() => {
    setVisible((previous) => !previous);
  }, [visible]);
  const token = localStorage.getItem("token");
  const { data, setBoardID, getTaskData } = useDataProvider();
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

  const handleCreateBoardClick = useCallback(async () => {
    setCreateModelVisible(true);
    console.log("board rendered");
  }, [createModelVisible]);
  const handleUpdateBoardClick = useCallback(
    async (title: string) => {
      setUpdateModelVisible(true);
      setSelectedBoard(title);
    },
    [updateModelVisible, selectedBoard]
  );
  const handleProfileModalClick = useCallback(() => {
    setProfileModalVisible((previous) => !previous);
  }, [profileModalVisible]);

  return (
    <div
      className={` h-[calc(100vh-4rem)] overflow  bg-white shadow-2xl relative transition-all ${
        visible ? "w-60" : "w-0"
      }`}
    >
      <div className="overflow-hidden flex flex-col  justify-between h-full">
        <div className="">
          <h1 className="font-semibold text-lg font-sans pb-4 px-2">
            All boards ({data?.length})
          </h1>
          <div className="h-60 overflow-scroll ">
            {data && data.length > 0 ? (
              data.map((board, index) => (
                <div
                  onMouseEnter={() => {
                    console.log("hovered");
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                  className={` flex flex-row items-center ${
                    currentBoardIndex === index
                      ? "bg-primary  rounded-r-full"
                      : "bg-white "
                  }  `}
                  key={index}
                >
                  <Button
                    onClick={() => {
                      if (token) {
                        setCurrentBoardIndex(index);
                        setBoardID(board._id);
                        getTaskData(board._id, token);
                      }
                    }}
                    style={`w-10/12 text-left text-sm  ${
                      currentBoardIndex === index
                        ? "bg-primary/90 shadow-xl text-white rounded-r-full"
                        : "bg-white text-black/90 border-b-2"
                    } `}
                  >
                    {board.title}
                  </Button>
                  {isHovered && (
                    <button onClick={() => handleUpdateBoardClick(board.title)}>
                      <EditIcon fill="#fff" width={15} height={15} />
                    </button>
                  )}
                </div>
              ))
            ) : data && data.length === 0 && data !== null ? (
              <LoadingComponent/>
            ) : (
              <p className="text-xs px-2 text-red">No board found</p>
            )}
          </div>
          <div className="w-full  flex flex-row justify-center">
            <Button
              style="w-11/12 m h-fit bg-primary/70 font-bold  rounded-md shadow-xl text-white"
              onClick={handleCreateBoardClick}
            >
              Create new board
            </Button>
          </div>
        </div>

        <div className="h-fit flex flex-col gap-y-2">
        {profileModalVisible && <UserProfileDropDown />}
          <button
            onClick={handleProfileModalClick}
            className="w-full relative flex flex-row items-center hover:bg-gray-300"
          >
           
            <div className="flex flex-row w-full justify-start p-2 gap-x-4">
              <div className="rounded-full w-8 h-8 bg-primary flex flex-row items-center justify-center">
                {user && user.userName.includes(" ")
                  ? user?.userName[0] + user?.userName.split(" ")[1]?.[0]
                  : user?.userName[0]}
              </div>
              <p>{user && user.userName}</p>
            </div>
          </button>
        </div>
      </div>
      <Button
        style="absolute -right-6 top-1/4 rounded-full"
        onClick={handleToggle}
      >
        {visible ? (
          <ToggleIconClose height={30} width={30} />
        ) : (
          <ToggleIconOpen height={30} width={30} />
        )}
      </Button>

      {createModelVisible && (
        <CreateBoard setModelVisible={setCreateModelVisible} />
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

export default SideBar;
