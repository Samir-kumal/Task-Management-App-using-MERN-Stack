import { useFormik } from "formik";
import Button from "../Button";
import * as Yup from "yup";
import ErrorTextComponent from "./ErrorTextComponent";
import useDataProvider from "../../hooks/useDataProvider";

interface CreateBoardModalProps {
  setModelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBoard: string | null;
  };


const UpdateBoardModal: React.FC<CreateBoardModalProps> = ({
  setModelVisible,
  selectedBoard,
}) => {
  const { updateBoardItem, deleteBoardItem, boardID } = useDataProvider();
  const { values, handleSubmit, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        title: selectedBoard ?? "",
      },
      onSubmit: (values) => {
        if( values.title){
          updateBoardItem(boardID,values.title);
        setModelVisible(false);

        }
      },
      validationSchema: Yup.object({
        title: Yup.string().required("Board name is required"),
      }),
    });
  const formInput = "border-2 p-2 w-full rounded-md border-black/60 my-3";
  const formInputError = "border-2 p-2 w-full rounded-md border-red-500 my-3";
  return (
    <div className="inset-0 bg-black/40 absolute w-lvw z-10  h-[100vh] overflow-hidden flex justify-center  ">
      <div className="lg:w-1/3 md:w-1/2 min-w-[300px] rounded-lg h-fit pb-6 bg-white mt-2 flex flex-col items-center">
        <div className="flex flex-row p-2 justify-between w-11/12 items-center">
          <h2 className="p-2  md:text-lg text-lg font-bold w-10/12 ">
            Update board
          </h2>
          <Button
            style="rounded-md p-1 text-xs bg-red-500 text-white mx-2"
            onClick={() => {
              if (boardID) {
                deleteBoardItem(boardID);
              }
              setModelVisible(false);
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => setModelVisible(false)}
            style="p-2 h-8 flex items-center justify-center bg-primary text-white rounded-md text-xs"
          >
            Close
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex  flex-col items-center w-10/12"
        >
          <label htmlFor="title" className="text-left w-full opacity-60">
            Board Name
          </label>
          <input
            id="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="title"
            className={
              touched.title && errors.title ? formInputError : formInput
            }
          />
          <ErrorTextComponent touched={touched.title} errors={errors.title} />
          <Button type="submit" style="w-full rounded-md bg-primary text-white">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBoardModal;
