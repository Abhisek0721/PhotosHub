import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import { useEffect, useState } from "react";

const BasePage = ():JSX.Element => {

    const navigate = useNavigate();
    
    const [isAuth, setIsAuth] = useState(false);

    useEffect(()=>{
        let checkToken:string|null = localStorage.getItem("userToken");
        if(!checkToken){
            navigate("/login");
        }else{
            setIsAuth(true);
        }
    },[]);


    return (
        <div className="position-absolute top-0">
            <Header isAuth={isAuth} />
            <section className="d-flex min-vw-100">
                {/* sidebar */}
                <div
                    // style={{"width": "15%"}}
                    className={``}
                >
                    <Sidebar />
                </div>
                {/* component render */}
                <div 
                    style={{"width": "100%"}}
                    className={`container-fluid bg-dark text-white h-100 min-vh-100`}>
                        <div style={{"marginTop": "100px", "marginLeft": "300px"}}>
                            <Outlet />
                        </div>
                </div>
            </section>
        </div>
    );
}

export default BasePage;