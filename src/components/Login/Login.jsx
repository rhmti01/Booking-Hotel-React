import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("abolfazlrahmatia@gmail.com");
  const [password, setPassword] = useState("13841384");
  const { user, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };

  // console.log(user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true});
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className=" loginContainer ">
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <h2>Login</h2>
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
            placeholder="Enter User Email . . ."
          />
        </div>{" "}
        <div className="formControl">
          <label htmlFor="passowrd">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="passowrd"
            id="password"
            placeholder="Enter User Password . . ."
          />
        </div>{" "}
        <button type="submit" className="login_btn  btn--primary  ">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
