import SpreadSheet from "@/components/table/spreadsheet";
import { useEffect, useState } from "react";
import { useApiRequest } from "../../components/useFetch";
import { useRouter } from "next/router";
import useStore from "@/store/useStore";

const Dashboard = () => {
  const { userData, userAccess, setUserAcess, setUserData, setLoggedIn } =
    useStore();
  const [loggedIn, setIsLoggedIn] = useState<boolean>();
  const router = useRouter();
  interface UserData {
    email: string;
    name: string;
    phoneNumber: number;
    profilePicture: "";
  }

  const [loading, handleApiRequest] = useApiRequest();
  const [userDashBoardData, setUserDashboardData] = useState<UserData | any>(
    null
  );

  const getUserData = async () => {
    const data = {};
    try {
      const response = await handleApiRequest("GET", "/auth/userdata", data);
      console.log(response.data);
      setUserDashboardData(response.data);
      setUserData(response.data.userBasicInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    const data = {};
    try {
      const response = await handleApiRequest("POST", "/user/logout", data);
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      setUserDashboardData({});
      setUserAcess(false);
      alert("Logout");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setIsLoggedIn(true);
      getUserData();
    } else {
      router.push("/login");
    }
  }, [loggedIn]);

  console.log(userData);
  return userAccess ? (
    <div className="dashboard">
      {loading ? (
        "...Loading"
      ) : (
        <div className="userData">
          <h1 className="text-center">Welcome Back, {userData?.name}</h1>
          <SpreadSheet />
        </div>
      )}
    </div>
  ) : (
    <h1>No access</h1>
  );
};

export default Dashboard;
