import "./topbar.css"
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { user ,dispatch} = useContext(Context); 
  const PF="http://localhost:5000/images/"
  const handleLogout=()=>{
     dispatch({type:"LOGOUT"});
  }
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (

    <div className='top'>
        <div className="topLeft">
        <i className="topicon fa-brands fa-facebook"></i>
        <i className="topicon fa-brands fa-twitter"></i>
        <i className="topicon fa-brands fa-pinterest"></i>
        <i className="topicon fa-brands fa-instagram"></i>
        </div>
        <div className="topcenter">
            <ul className="toplist">
                <li className="toplistItem">
                <Link className="link" to="/">HOME</Link>
                </li>
                <li className="toplistItem">
                <Link className="link" to="/">
              DESTINATIONS
              <ul className="subList">
              {/* {cats.map((c)=>(
                    <Link to={`/?cat=${c.name}`}className="link">
                      <li className="sidebarlistitem">{c.name}</li>
                      </Link>

                ))} */}

                  <Link className="link" to="/?cat=india">
                <li>
                    INDIA</li></Link>
                    <Link className="link" to="/?cat=japan">
                <li>JAPAN</li>
                    </Link>
                    <Link className="link" to="/?cat=singapore">
                <li>SINGAPORE</li>                
                    </Link>
                    <Link className="link" to="/?cat=maldives">
                <li>MALDIVES</li>                
                    </Link>
                    <Link className="link" to="/?cat=hong-kong">
                     <li>HONG-KONG</li>
                    </Link>
                    <Link className="link" to="/?cat=china">
                <li>CHINA</li>                
                    </Link>
                    <Link className="link" to="/?cat=spain">
                <li>SPAIN</li>                
                    </Link>
                    <Link className="link" to="/?cat=turkey">
                <li>TURKEY</li>                
                    </Link>
              </ul>
                </Link>
                </li>
                {/* <li className="toplistItem">
                <Link className="link" to="/ideas">
                 IDEAS
                 <ul className="subList">
                <li>Adventure</li>
                <li>Art and Culture</li>
                <li>Festival and Events</li>
                <li>Food and Wine</li>
                <li>Roadtrips</li>
                <li>Winter</li>
                <li>Wildlife and Nature</li>
              </ul>
                 </Link>
                </li> */}
                <li className="toplistItem">
                <Link className="link" to="/Write">
              WRITE
          </Link> 
                </li>
                {user && <li className="toplistItem" onClick={handleLogout}>LOGOUT</li>}
            </ul>
        </div>
        <div className="topRight">
        {user ? (
          <Link className="link" to="/Settings">
            <img className="topimg"src={PF+user.profilePic} alt="" />
              </Link>
          
        ) : (
          <ul className="toplist">
            <li className="toplistItem">
            <Link className="link" to="/login">
              LOGIN
           </Link>         
            </li>
            <li className="toplistItem">
            <Link className="link" to="/Register">
              REGISTER
           </Link>           
            </li>
          </ul>
        )}
        {/* <i className="topSearchIcon fas fa-search"></i> */}
      </div>

   </div>
  )
}
