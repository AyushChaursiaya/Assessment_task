import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { serverUrl } from "../App.jsx";

function useLogin() {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`${serverUrl}/api/auth/login`, values, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert(response.data.message);
        login(response.data.token, response.data.user);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
}

export default useLogin;
