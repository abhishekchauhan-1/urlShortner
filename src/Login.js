import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import './SignUpStyles.css';

const Login = ({setmyData,setLogin}) => {

    const navigate = useNavigate(); // Replace useHistory with useNavigate

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://url-4s79.onrender.com/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();

                // Save the token in a cookie
                document.cookie = `token=${data.token}; path=/`;

                localStorage.setItem("data",JSON.stringify(data.user))
                localStorage.setItem("name",data.user.name)
                

                console.log("User Login successfully:", data.user);

                setLogin(true);
              
                setmyData({username:data.user.name,links:data.user.links})
                
                  

                

                // Use navigate instead of history.push
              navigate("/after-login");
               //console.log();
              
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error during Login:", error);
        }
    };

    return (
        <>
            <div className="signupdiv"></div>
            <div className="SignupForm">
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    /><br />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default Login;
