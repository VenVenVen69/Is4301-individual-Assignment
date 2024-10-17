import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './view/Home';
import Academice from './view/Academice';
import Admission from './view/Admission';
import logo from './logo.jpg';
import './App.css';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db, logout, signInWithGoogle } from "./view/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data.name);
      
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    // if (!user) return navigate("/");
    if(!user) return 
    console.log("login");
    

    fetchUserName();
  }, [user, loading]);
  return (
    <div className='App'>
      <Router>
      <header className="App-header">
        <div >
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        
        <div className='nav_work'>
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/academice">Academice</Link>
          </p>
          <p>
            <Link to="/admission">Admission</Link>
          </p>
          {
            !user ? 
            <button onClick={signInWithGoogle}>
              Login with Google
            </button>
            :
            <div className='userinfo'>
              <div>{user?.email}</div>
              <button onClick={logout}>
                Logout
              </button> 
            </div>
          }
          
        </div>

          
      </header>

      {/* routing section */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/academice" element={<Academice />} />
        <Route path="/admission" element={<Admission />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
