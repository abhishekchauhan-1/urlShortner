import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import AfterLogin from "./AfterLogin";
import Login from "./Login";

function App() {
  const [mydata, setmyData] = useState({
    username: "",
    links: [],
  });
  const [login,setLogin] =  useState(false);

  const info = localStorage.getItem("data");
  useEffect(()=>{
    if(info){
      setLogin(true);
    }
   
  },[info])
console.log(info);



  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
       {login && (
         <Route path="/after-login" element={<AfterLogin mydata={mydata} login={login} setLogin={setLogin} />} />

       )}
        
      
        <Route path="/login" element={<Login setmyData={setmyData}  setLogin={setLogin}/>} />
      </Routes>
    </Router>
  );
}
 
export default App;
