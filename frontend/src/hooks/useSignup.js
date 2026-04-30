import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { serverUrl } from "../App.jsx";
import axios from "axios";

function useSignup() {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (values) => {
    const { password, passwordConfirm } = values;

    if (password !== passwordConfirm) {
      setError("Passwords are not the same");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        values,
        { withCredentials: true },
      );

      if (response.status === 201) {
        alert(response.data.message);
        login(response.data.token, response.data.newUser);
        navigate("/");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return { loading, error, registerUser };
}

export default useSignup;
