import Button from "../Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorTextComponent from "./ErrorTextComponent";
import useDataProvider from "../../hooks/useDataProvider";
import { Task } from "../../context/DataProvider";

interface TaskModalProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: Task | null;
}
const UpdateTaskModal: React.FC<TaskModalProps> = ({
  setModalVisible,
  selectedTask,
}) => {
  const { deleteTask, updateTask, boardID } = useDataProvider();
  const token = localStorage.getItem("token");
  const {
    values,
    initialValues,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      title: selectedTask?.title,
      content: selectedTask?.content,
      status: selectedTask?.status,
    },
    onSubmit: (values) => {
      // createBoard(values.title);
      const { title, content, status } = values;
      console.log("boardID", boardID);
      if(selectedTask?._id && title && content && status){
        updateTask(selectedTask._id, title, content, status, token !==null ? token : "" );   
      }

      setModalVisible(false);
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Board name is required"),
      content: Yup.string()
        .required("Content is required")
        .min(15, "Content must be at least 10 characters"),
    }),
  });
  const handleTaskDelete = () => {
    if (selectedTask?._id && token) {
      deleteTask(selectedTask._id, token);
    }
    setModalVisible(false);
  };
  const titleInput = "border-2 p-2 my-3 border-black/30 rounded-md";
  const titleInputError = "border-2 p-2 my-3 border-red-500 rounded-md";
  const contentInput = "border-2 p-2 h-40 my-3 border-black/30 rounded-md";
  const contentInputError = "border-2 p-2 h-40 my-3 border-red-500 rounded-md";
  return (
    <div className="inset-0 absolute h-lvh w-lvw bg-black/40 flex flex-row justify-center">
      <div className="w-1/3 bg-white h-fit translate-y-20 rounded-lg flex flex-col  items-center">
        <div className="flex flex-row justify-between w-full py-2 px-4  items-center">
          <h2 className="text-2xl font-bold">Update Task</h2>
          <div className="flex flex-row gap-x-2">
            <Button
              onClick={handleTaskDelete}
              style="rounded-md bg-red-500 text-white text-xs"
            >
              Delete
            </Button>
            <Button
              onClick={() => setModalVisible(false)}
              style="rounded-md bg-primary text-white text-xs"
            >
              Cancel
            </Button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col p-2 w-10/12">
          <label
            className="text-sm text-black/60 font-semibold"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className={
              touched.title && errors.title ? titleInputError : titleInput
            }
            type="text"
            name="title"
            id="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorTextComponent touched={touched.title} errors={errors.title} />
          <label
            className="text-sm text-black/60 font-semibold"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              touched.content && errors.content
                ? contentInputError
                : contentInput
            }
          />
          <ErrorTextComponent
            touched={touched.content}
            errors={errors.content}
          />

          <label
            className="text-sm text-black/60 font-semibold"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="border-2 p-2 my-2 border-black/30 rounded-md text-xs"
            name="status"
            id="status"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option className="text-sm" value="todo">
              To Do
            </option>
            <option className="text-sm" value="doing">
              Doing
            </option>
            <option className="text-sm" value="done">
              Done
            </option>
          </select>
          <Button
            disabled={
              initialValues.title === values.title &&
              initialValues.content === values.content &&
              initialValues.status === values.status
                ? true
                : false
            }
            type="submit"
            style={`rounded-md text-white  ${
              initialValues.title === values.title &&
              initialValues.content === values.content &&
              initialValues.status === values.status
                ? "bg-gray-500 opacity-50"
                : "bg-primary"
            }`}
          >
            Update Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
