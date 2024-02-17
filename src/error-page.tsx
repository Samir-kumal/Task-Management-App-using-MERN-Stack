import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div
      id="error-page"
      className="h-[100vh] w-full flex flex-col items-center justify-center"
    >
      <h2 className="font-bold text-2xl">Oops!</h2>
      <h1 className="text-6xl font-bold">404</h1>
      <p>Page Not Found</p>
    </div>
  );
};

export default ErrorPage;
