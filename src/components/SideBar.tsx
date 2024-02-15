import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";

interface Task {
  title: string;
  description: string;
  status: string;
}
interface Board {
  title: string;
  tasks: Task[];
  _id: string;
}
interface SideBarProps {
  handleBoardClick: (boardId: string) => void;
}
const SideBar = ({ handleBoardClick }: SideBarProps) => {
  const [visible, setVisible] = useState(true);
  const [modelVisible, setModelVisible] = useState(false);
  const [modalName, setModalName] = useState("");
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const handleToggle = () => {
    console.log("Toggle");
    setVisible((previous) => !previous);
  };
  const [boards, setboards] = useState<Board[]>([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNkYWQ3YWE2ZTk4NGNjOTYzYTM0NzAiLCJ1c2VyTmFtZSI6IlNhbWlyIEt1bWFsIiwidXNlckVtYWlsIjoia3VtYWxzYW1lZXIxMjRAZ21haWwuY29tIiwiaWF0IjoxNzA3OTc4NDQ5LCJleHAiOjE3MDgyMzc2NDl9.7r2vmiyI0X0PQCwyuIGZT2W0EPWOfO9QN8Y1FSCF5aQ";
  const fetchBoards = async () => {
    const response = await axios.get(
      "http://localhost:9001/boards/65cdad7aa6e984cc963a3470",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = response.data;
    console.log(data);
    setboards(data);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  console.log(boards);
  const handleBoardCreate = async () => {
    setModelVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(modalName);
    const response = await axios.post(
      "http://localhost:9001/createBoard/65cdad7aa6e984cc963a3470",
      { title: modalName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    setModelVisible(false);
    fetchBoards();
    setModalName("");
  };
  return (
    <div
      className={` h-[calc(100vh-4rem)] overflow bg-white shadow-2xl relative transition-all ${
        visible ? "w-60" : "w-0"
      }`}
    >
      <div className="overflow-hidden">
        <h1 className="font-semibold text-xl">All boards ({boards.length})</h1>
        {boards.map((board, index) => (
          <div className={`bg-white`} key={index}>
            <Button
              onClick={() => {
                setCurrentBoardIndex(index);
                handleBoardClick(board._id);
                localStorage.setItem("boardID", board._id);
              }}
              style={`w-full text-left  ${
                currentBoardIndex === index
                  ? "bg-primary text-white"
                  : "bg-white text-black border-b-2"
              } `}
            >
              {board.title}
            </Button>
          </div>
        ))}
        <Button style="w-full h-fit bg-gray-400" onClick={handleBoardCreate}>
          Create new board
        </Button>
      </div>
      <Button
        style="absolute -right-8 top-1/2 rounded-full"
        onClick={handleToggle}
      >
        <p>Toggle</p>
      </Button>
      {modelVisible && (
        <div className="inset-0 bg-black/40 absolute w-[100vw] h-[100vh] flex justify-center  ">
          <div className="w-1/3 rounded-lg h-1/3 bg-white mt-2">
            <div className="flex flex-row p-2 justify-center">
              <h2 className="p-2 text-xl font-bold w-10/12 ">
                Create New board
              </h2>
              <Button
                onClick={() => setModelVisible(false)}
                style="p-2 h-8 flex items-center justify-center rounded-md text-xs"
              >
                Close
              </Button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center"
            >
              <label htmlFor="title" className="text-left w-10/12 opacity-60">
                Board Name
              </label>
              <input
                value={modalName}
                onChange={(e) => {
                  setModalName(e.target.value);
                }}
                type="text"
                name="title"
                className="border-2 p-2 w-10/12 rounded-md border-black/60 my-2"
              />
              <Button type="submit" style="w-10/12 rounded-md">
                Create
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
