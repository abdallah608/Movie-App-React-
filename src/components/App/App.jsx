import React, { useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import About from "../About/About";
import Home from "../Home/Home";
import Masterlay from "../Masterlay/Masterlay";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Details from "../Details/Details";
import Notfound from "../Notfound/Notfound";
import Network from "../Network/Network";
import People from "../People/People";
import Register from "../Register/Register";
import Tvshow from "../Tvshow/Tvshow";
import jwtDecode from "jwt-decode";
import Profile from "../Profile/Profile";
import Productedroute from "../Productedroute/Productedroute";
import { Offline, Online } from "react-detect-offline";

function App() {
  const [userData, setUserData] = useState(null)
  let saveUserData=()=>{
    let encodedToken= localStorage.getItem('token');
    let decodedToken=jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  let logOut=()=>{
    localStorage.removeItem('token');
    setUserData(nul);
    return <Navigate to='login'/>
  }
  useEffect(() => {
if(localStorage.getItem('token')){
  saveUserData()
}
  }, [])
  
  
  const rout = createBrowserRouter([
  {
    path: '/',
    element:<Masterlay userData={userData} logOut={logOut}/>,
    errorElement:<Notfound/>,
    children: [
      {index:true , element: <Productedroute userData={userData}><Home/></Productedroute>},
      {path:'movies',element:<Productedroute userData={userData}><Movies/></Productedroute>},
      {path:'details/:id/:mediaType' , element:<Productedroute userData={userData}><Details/></Productedroute>},
      {path:'tvshow' , element: <Productedroute userData={userData}><Tvshow/></Productedroute>},
      {path:'people', element:<Productedroute userData={userData}><People/></Productedroute>},
      {path:'network',element:<Productedroute userData={userData}><Network/></Productedroute>},
      {path:'about',element:<Productedroute userData={userData}><About/></Productedroute>},
      {path:'Profile',element:<Productedroute userData={userData}><Profile userData={userData} /></Productedroute>},
      {path:'login',element:<Login saveUserData={saveUserData }/>},
      {path:'register',element:<Register/>},
  
    ]
  
  }  
  ])
  return (
    <>

    <div>
    <Online><RouterProvider router={rout}/></Online>
    <Offline><div className="alert alert-danger fixed-bottom">
    You are now offline, Please reconnect your internet again
      </div></Offline>
  </div>
    </>
  );
}

export default App;