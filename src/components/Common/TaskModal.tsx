import Button from "../Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorTextComponent from "./ErrorTextComponent";
import useDataProvider from "../../hooks/useDataProvider";
interface TaskModalProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const TaskModal: React.FC<TaskModalProps> = ({ setModalVisible }) => {
  const { createTask, boardID } = useDataProvider();
  const token = localStorage.getItem("token");
  const { values, handleSubmit, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
        status: "todo",
      },
      onSubmit: (values) => {
        // createBoard(values.title);
        console.log("boardID", boardID);

        if (boardID && token) {
          createTask(
            boardID,
            values.title,
            values.content,
            values.status,
            token
          );
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
  const titleInput = "border-2 p-2 my-3 border-black/30 rounded-md";
  const titleInputError = "border-2 p-2 my-3 border-red-500 rounded-md";
  const contentInput = "border-2 p-2 h-40 my-3 border-black/30 rounded-md";
  const contentInputError = "border-2 p-2 h-40 my-3 border-red-500 rounded-md";
  return (
    <div className="inset-0 z-10 absolute h-lvh w-lvw bg-black/40 flex flex-row justify-center">
      <div className="lg:w-1/3 md:w-1/2 z-20 min-w-[260px] bg-white h-fit translate-y-20 rounded-lg flex flex-col  items-center">
        <div className="flex flex-row justify-between w-full py-2 px-4  items-center">
          <h2 className="text-2xl font-bold">Add New Task</h2>
          <Button
            onClick={() => setModalVisible(false)}
            style="rounded-md bg-primary text-white text-xs"
          >
            Cancel
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col p-2 w-11/12">
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
            type="submit"
            style="rounded-md bg-primary text-white shadow-xl"
          >
            Add Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
