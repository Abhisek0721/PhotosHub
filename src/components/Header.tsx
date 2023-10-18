import "../css/header.css";
import { Link, useNavigate } from "react-router-dom";
import { HeaderInterface } from "../interface/headerInterface";

const Header = (isAuth:HeaderInterface):JSX.Element => {

    const navigate = useNavigate();

    const logoutEvent = ():void => {
        localStorage.removeItem("userToken");
        navigate("/login");
    }

    return (
        <div id="header"  className="container-fluid min-vw-100 text-white">
            {
                (!isAuth.isAuth)?(
                    <div  className="py-3 float-end">
                        <Link to={"/signup"}>
                            <button className="header-btn">Sign up</button>
                        </Link>
                        <Link to={"/login"}>
                            <button className="header-btn btn-bg mx-3">Log in</button>
                        </Link>
                    </div>
                ):(
                    <div  className="py-3 float-end">
                        <button onClick={logoutEvent} className="header-btn bg-light text-dark">Log out</button>
                    </div>
                )
            }
        </div>
    );
}

export default Header;
