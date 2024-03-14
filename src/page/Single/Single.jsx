import Singlepost from "../../components/Singlepost/Singlepost"
import Sidebar from "../../components/sidebar/Sidebar"
import "./single.css"
import { Link } from "react-router-dom";
export default function Single() {
  return (
    <div className="single">
        {/*post*/}
        <Singlepost/>
        <Sidebar/>
       
    </div>
  )
}
