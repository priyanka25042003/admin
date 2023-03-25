import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";


function Navbar() {
 
  useEffect(() => {
    navig()
  }, [])
  const navigate = useNavigate();
  function navig() {
    let auth = localStorage.getItem("admindata")
    if (!auth) {
      navigate('/login')
    }
  }
  const [show, setshow] = useState(true);

  function showsidebar() {
    setshow(show ? false : true)
    console.log(show);
    
   }
    return (
      // <nav className='navbar'>
      //     <ul className="nav-links">
      //         <Link to='/'><li>Home</li></Link>
      //         <Link to='/flight'><li>Flight</li></Link>
      //         <Link to='/hotel'><li>Hotel</li></Link>
      //         <Link to='/bus'><li>Bus</li></Link>
      //     </ul>
      // </nav>    data.pyment = amount

      <>
        {/* // <nav className='navbar'>
        //     <ul className="nav-links">
        //         <Link to='/'><li>Home</li></Link>
        //         <Link to='/flight'><li>Flight</li></Link>
        //         <Link to='/hotel'><li>Hotel</li></Link>
        //         <Link to='/bus'><li>Bus</li></Link>
        //     </ul>
        // </nav> */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Logo
          </a>
         
          <button className="d-block d-md-none" onClick={showsidebar} type="button">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item active">
      <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
    </li>
    <li className="nav-item active">
      <a className="nav-link" href="#">Flight </a>
    </li>
    <li className="nav-item active">
      <a className="nav-link" href="#">Hotel</a>
    </li> */}
              {/* <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <a className="dropdown-item" href="#">Action</a>
        <a className="dropdown-item" href="#">Another action</a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#">Something else here</a>
      </div>
    </li> */}
              {/* <li className="nav-item active">
      <a className="nav-link disabled" href="#">Bus</a>
    </li> */}
            </ul>
            {/* <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
          </div>
        </nav>
       
          

           <Sidebar show = {show} /> 
          
         
          
        
      </>
    );
 }

 export default Navbar;