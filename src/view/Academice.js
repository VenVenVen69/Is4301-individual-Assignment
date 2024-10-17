import './Academice.css'
import React, {useState, useEffect} from 'react';
import { auth, db, logout, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function Academice() {
    const [user, loading, error] = useAuthState(auth);
    const [is_login, setIsLogin] = useState(false);

    useEffect(() => {
        if (loading) return;
        // if (!user) return navigate("/");
        if(!user) {
            setIsLogin(false)
            return 
        }
        console.log("login");
        
        setIsLogin(true)
        
      }, [user, loading]);

  return (
    <div className="Academice">
        {!is_login ? <button className='login-but' onClick={signInWithGoogle}>Sign In With Google</button> : 
            <>
                <h3>Academice</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Module Code</th>
                            <th>Module Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>BT1101</td>
                            <td>Introduction to Business Analytics</td>
                        </tr>
                        <tr>
                            <td>BT2101</td>
                            <td>Econometrics Modelling for Business Analytics</td>
                        </tr>
                        <tr>
                            <td>BT2102</td>
                            <td>Data Management and Visualisation</td>
                        </tr>
                        <tr>
                            <td>BT2103</td>
                            <td>Optimization Methods in Business Analytics</td>
                        </tr>
                    </tbody>
                </table>
            </>
        }
        
    </div>
  );
}

export default Academice;
