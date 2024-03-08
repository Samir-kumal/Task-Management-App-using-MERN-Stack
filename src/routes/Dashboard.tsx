import Footer from "../components/Footer";
import Main from "../components/Main";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col overflow-y-auto h-100vh bg-blue-100/50  justify-center">
      <Main />
      <Footer/>
    </div>
  );
};

export default Dashboard;
