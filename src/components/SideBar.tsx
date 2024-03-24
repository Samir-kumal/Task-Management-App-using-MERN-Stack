import { useState, useCallback } from "react";
import Button from "./Button";
import useDataProvider from "../hooks/useDataProvider";
import ToggleIconClose from "./svgs/ToggleIconClose";
import ToggleIconOpen from "./svgs/ToggleIconOpen";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuthProvider from "../hooks/useAuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "./svgs/DashboardIcon";
import TaskBoardsIcon from "./svgs/TaskBoardsIcon";
import CalendarIcon from "./svgs/CalendarIcon";
import NotificationIcon from "./svgs/NotificationIcon";
import LoadingComponent from "./Common/LoadingComponent";

const SideBar = () => {
  const [visible, setVisible] = useState(true);

  const navigate = useNavigate();
  const handleToggle = useCallback(() => {
    setVisible((previous) => !previous);
  }, [visible]);
  const { token } = useAuthProvider();
  const { data, getTaskItems, setTasksData } = useDataProvider();
  const [tasksSubMenuVisible, setTasksSubMenuVisible] = useLocalStorage(
    "tasksSubMenuVisible",
    false
  );
  const [selectedBoardIndex, setSelectedBoardIndex] = useLocalStorage(
    "selectedBoardIndex",
    null
  );
  const location = useLocation();
  const boardListToggle = useCallback(() => {
    setTasksSubMenuVisible((previous: boolean) => !previous);
  }, []);

  const tabData = [
    {
      id: 1,
      alt: "dashboard",
      title: "Dashboard",
      icon: (
        <DashboardIcon
          fill={
            location.pathname && location.pathname === "/dashboard"
              ? "blue"
              : undefined
          }
        />
      ),
      tabActive:
        location.pathname && location.pathname === "/dashboard" ? true : false,
    },
    {
      id: 2,
      alt: "boards",
      title: "Boards",
      icon: (
        <TaskBoardsIcon
          fill={
            location.pathname && location.pathname === "/dashboard/boards"
              ? "blue"
              : undefined
          }
        />
      ),
      tabActive:
        location.pathname && location.pathname === "/dashboard/boards"
          ? true
          : false,
    },
    {
      id: 3,
      alt: "calendar",
      title: "Calender",
      icon: (
        <CalendarIcon
          fill={
            location.pathname && location.pathname === "/dashboard/calendar"
              ? "blue"
              : undefined
          }
        />
      ),
      tabActive:
        location.pathname && location.pathname === "/dashboard/calendar"
          ? true
          : false,
    },
    {
      id: 4,
      alt: "notifications",
      title: "Notifications",
      icon: (
        <NotificationIcon
          fill={
            location.pathname &&
            location.pathname === "/dashboard/notifications"
              ? "blue"
              : undefined
          }
        />
      ),
      tabActive:
        location.pathname && location.pathname === "/dashboard/notifications"
          ? true
          : false,
    },
  ];

  const handleSideBarButtonClick = (alt: string) => {
    if (selectedBoardIndex) {
      setSelectedBoardIndex(null);
    }
    if( alt !== "boards"){
      setTasksSubMenuVisible(false);
    }
    if (alt !== "dashboard") {
      navigate(`/dashboard/${alt}`);
    } else {
      navigate(`/dashboard`);
    }
  };

  const handleBoardClick = (boardID: string) => {
    setTasksData(null);
    if (boardID) {
      setSelectedBoardIndex(boardID);
      const selectedBoard = data?.find((item) => item._id === boardID);
      if (selectedBoard && selectedBoard?.tasks.length > 0 && token) {
        getTaskItems(boardID, token);
      } else {
        setTasksData([]);
      }
      setTimeout(() => navigate(`/dashboard/boards/${boardID}`), 500);
    }
  };

  return (
    <section
      className={`  md:h-100vh ${
        visible ? "md:w-72" : "w-fit "
      }  z-50 bg-white shadow-2xl md:relative fixed bottom-0 right-0 left-0  flex md:flex-col flex-row  items-center justify-center transition-all duration-300 `}
    >
      <div
        className={`overflow-hidden  ${
          visible ? "lg:w-full w-fit" : " w-fit "
        }   flex lg:flex-col flex-row   justify-between h-full`}
      >
        <div
          className={` lg:h-full md:h-full h-fit ${visible ? "p-5" : "p-2"}`}
        >
          <ul className="flex lg:flex-col md:flex-col flex-row gap-y-2">
            {tabData.map((item) => (
              <section
                key={item.id}
                className={`flex font-poppins flex-row w-full ${
                  item.tabActive ? "text-primary font-bold " : "text-black"
                }   relative gap-x-2 `}
              >
                <Button
                  style={`w-full `}
                  onClick={() => handleSideBarButtonClick(item.alt)}
                >
                  <li className="py-2 px-4 w-full min-w-fit rounded-xl flex flex-col gap-x-4 justify-start items-start">
                    <div
                      className={` flex flex-row items-center justify-center gap-x-2 
                        
                      `}
                    >
                      {item.icon}
                      {visible && (
                        <p className="lg:flex md:flex hidden">{item.title}</p>
                      )}
                    </div>

                    {item.id === 2 && tasksSubMenuVisible && visible && (
                      <ul className="md:flex hidden flex-col mt-4   gap-y-2 w-full">
                        <li className="flex flex-col w-full gap-x-2 bg-black/5 items-start justify-start  gap-y-2">
                          {data && data.length > 0 ? (
                            data.slice(0, 5).map((item) => (
                              <div
                                key={item._id}
                                className="hover:bg-black/10 w-full "
                              >
                                <div
                                  onClick={() => handleBoardClick(item._id)}
                                  className={`text-black text-left font-semibold ${
                                    selectedBoardIndex === item._id
                                      ? "bg-black/10 "
                                      : ""
                                  } w-full flex flex-row items-center justify-start gap-x-3 text-xs px-4 py-2`}
                                >
                                  <div className="w-1 h-1 bg-black rounded-full"></div>
                                  {item.title}
                                </div>
                              </div>
                            ))
                          ) : data && data.length === 0 ? (
                            <p className="text-black">No board found</p>
                          ) : (
                            <div className="hidden items-center justify-center w-full md:flex">
                              <LoadingComponent
                                content=""
                                width="w-full"
                                height="h-10"
                              />
                            </div>
                          )}
                          {data && data.length > 5 && (
                            <button className=" btn-xs mx-8 bg-primary text-white">
                              show all
                            </button>
                          )}
                        </li>
                      </ul>
                    )}
                  </li>
                </Button>
                {item.id === 2 && visible && (
                  <Button
                    onClick={boardListToggle}
                    style={`transition-all duration-300 z-10 absolute lg:flex md:flex hidden  right-0 h-fit w-fit translate-y-4 -translate-x-4 ${
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
        style="absolute -right-6 h-fit w-fit lg:flex md:flex hidden  z-10 top-1/4 rounded-full"
        onClick={handleToggle}
      >
        {visible ? (
          <ToggleIconClose height={30} width={30} />
        ) : (
          <ToggleIconOpen height={30} width={30} />
        )}
      </Button>
    </section>
  );
};

export default SideBar;
