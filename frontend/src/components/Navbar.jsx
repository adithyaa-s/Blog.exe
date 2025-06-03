import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export default function Navbar({ handleOpen }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const userObject = jwtDecode(token);
          console.log("User", userObject);
          setUser(userObject.username);
        } catch (err) {
          console.error("Invalid token");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div>
      <div className="container-fluid py-3 border">
        <div className="row align-items-center">
          <div className="col-4 text-start">
            <h1 style={{ cursor: "pointer" }} onClick={handleOpen}>
              More
            </h1>
          </div>
          <div className="col-4 text-center">
            <h1
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/feed")}
              className="m-0"
            >
              Blog.exe
            </h1>
          </div>
          <div className="col-4 text-end">
            {user && (
              <h1
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/user/${user}`)}
              >
                Your Profile
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
