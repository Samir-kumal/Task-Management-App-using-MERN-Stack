import { useState, useCallback } from "react";
import Button from "./Button";
import useDataProvider from "../hooks/useDataProvider";
import ToggleIconClose from "./svgs/ToggleIconClose";
import ToggleIconOpen from "./svgs/ToggleIconOpen";
import CreateBoard from "./Common/CreateBoardModal";
import EditIcon from "./svgs/EditIcon";
import UpdateBoardModal from "./Common/UpdateBoardModal";
import LoadingComponent from "./Common/LoadingComponent";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuthProvider from "../hooks/useAuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardIcon from "./svgs/DashboardIcon";
import TaskBoardsIcon from "./svgs/TaskBoardsIcon";
import CalendarIcon from "./svgs/CalendarIcon";
import NotificationIcon from "./svgs/NotificationIcon";

const SideBar = () => {
  const [visible, setVisible] = useState(true);
  const [createModelVisible, setCreateModelVisible] = useState(false);
  const [updateModelVisible, setUpdateModelVisible] = useState(false);
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleToggle = useCallback(() => {
    setVisible((previous) => !previous);
  }, [visible]);
  const { token } = useAuthProvider();
  const { data, setBoardID, getTaskItems, setTasksData } = useDataProvider();
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [tasksSubMenuVisible, setTasksSubMenuVisible] = useLocalStorage("tasksSubMenuVisible",false);
  const [selectedBoardIndex, setSelectedBoardIndex] = useLocalStorage( "selectedBoardIndex", null);


  const [sideBarIndex, setSideBarIndex] = useLocalStorage("sideBarIndex", 1);

  const tabData = [
    {
      id: 1,
      alt: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon fill={sideBarIndex ===1 ? "blue" : undefined} />,
    },
    {
      id: 2,
      alt: "boards",
      title: "Boards",
      icon: <TaskBoardsIcon fill={sideBarIndex ===2 ? "blue" : undefined} />,
    },
    {
      id: 3,
      alt: "calendar",
      title: "Calender",
      icon: <CalendarIcon fill={sideBarIndex ===3 ? "blue" : undefined} />,
    },
    {
      id: 4,
      alt: "notifications",
      title: "Notifications",
      icon: <NotificationIcon fill={sideBarIndex ===4 ? "blue" : undefined} />,
    },
  ];

  const handleSideBarButtonClick = (alt: string, id: number) => {
    setSideBarIndex(id);
    if(selectedBoardIndex){
      setSelectedBoardIndex(null);
      setTasksSubMenuVisible(false);
    }
    if (alt !== "dashboard") {
      navigate(`/dashboard/${alt}`);
    }else{
      navigate(`/dashboard`);
    }
  };

  const handleBoardClick = (boardID: string) => {
    // setBoardParams({boardID: "123"});
   if(boardID){
    setBoardID(boardID);
    setSelectedBoardIndex(boardID);
    const selectedBoard = data?.find((item) => item._id === boardID);
    if (selectedBoard && selectedBoard?.tasks.length > 0 && token) {
      getTaskItems(boardID, token);
    } else {
      setTasksData([]);
    }
   setTimeout(()=>navigate(`/dashboard/boards/${boardID}`),500)
   }

  };

  return (
    <section
      className={` h-[calc(100vh-4rem)] overflow   bg-white shadow-2xl relative transition-all duration-300 ${
        visible ? "w-72" : "w-fit "
      }`}
    >
      <div
        className={`overflow-hidden ${
          visible ? "w-full" : " w-fit "
        }   flex flex-col   justify-between h-full`}
      >
        <div className={` h-full ${visible ? "p-5" : "p-2"}`}>
          <ul className="flex flex-col gap-y-2">
            {tabData.map((item) => (
              <section   key={item.id}  className={`flex font-poppins flex-row w-full ${item.id === sideBarIndex
                ? "text-primary font-bold "
                : "text-black"}   relative gap-x-2 `}>
                <Button style = {`w-full `}
                
                  onClick={() => handleSideBarButtonClick(item.alt, item.id)}
                >
                  <li className="py-2 px-4 w-full min-w-fit rounded-xl flex flex-col gap-x-4 justify-start items-start">
                    <div
                      className={` flex flex-row items-center justify-center gap-x-2 
                        
                      `}
                    >
                      {item.icon}
                      {visible && <p className="">{item.title}</p>}
                      
                    </div>

                    {item.id === 2 && tasksSubMenuVisible && visible && (
                      <ul className="flex flex-col mt-4   gap-y-2 w-full">
                       
                        <li className="flex flex-col w-full gap-x-2 bg-black/5 items-start justify-start  gap-y-2">
                          {data ? (
                            data.map((item) => (
                              <li className = "hover:bg-black/10 w-full ">
                                <Button onClick={()=>handleBoardClick(item._id)} style={`text-black text-left font-semibold ${selectedBoardIndex === item._id ?"bg-black/10 ": "" } w-full flex flex-row items-center justify-start gap-x-3 text-xs px-4 py-2`}>
                                  <div className="w-1 h-1 bg-black rounded-full"></div>
                                   {item.title}</Button>
                              </li>
                            ))
                          ) : (
                            <p className="text-black">No board found</p>
                          )}
                        </li>
                      </ul>
                    )}
                  </li>
                </Button>
                {item.id === 2 && visible && (
                  <Button
                    onClick={() => setTasksSubMenuVisible(!tasksSubMenuVisible)}
                    style={`transition-all duration-300 z-10 absolute  right-0 h-fit w-fit translate-y-4 -translate-x-4 ${
                      tasksSubMenuVisible ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    {" "}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 128 128"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.3335 80L64.0002 37.3333L106.667 80"
                        stroke="black"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                )}
              </section>
            ))}
          </ul>
        </div>
      </div>
      <Button
        style="absolute -right-6 h-fit w-fit  z-10 top-1/4 rounded-full"
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
    </section>
  );
};

export default SideBar;
