import logo from "../assets/playmusic.png";
import "../css/sidebar.css";
import { FaHome, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ():JSX.Element => {

    return (
        <div className="sidebar">
            <div className="row">
                <div 
                    style={{"width": "300px", "userSelect": "none"}} 
                    className="text-white col-auto col-md-3 min-vh-100">
                    <Link to={"/"} className="text-decoration-none align-itemcenter ms-4">
                        <img src={logo} className="logo" alt="" srcSet="" />
                        <span id="logo" className="fs-4 pt-4 align-middle">Photos Hub</span>
                    </Link>

                    <div style={{"paddingTop": "1px", "margin": "0px 10px"}} className="bg-primary"></div>

                    <ul className="nav flex-column ms-5 mt-4">
                        <Link to={"/"}>
                            <li className="nav-item nav-menu fs-5 my-3">
                                <FaHome />
                                <span className="ms-3">Home</span>
                            </li>
                        </Link>
                        <Link to={"search"}>
                            <li className="nav-item nav-menu fs-5 my-3">
                                <FaSearch />
                                <span className="ms-3">Search</span>
                            </li>
                        </Link>
                        {/* <li className="nav-item nav-menu fs-5 my-3">
                            <FaBook />
                            <span className="ms-3">Your Library</span>
                        </li>
                        <li className="nav-item nav-menu fs-5 my-3">
                            <FaPlusSquare />
                            <span className="ms-3">Create Playlist</span>
                        </li> */}
                        {/* <Link to={"/favourite"}>
                            <li className="nav-item nav-menu fs-5 my-3">
                                <FaHeart />
                                <span className="ms-3">Liked Songs</span>
                            </li>
                        </Link> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;