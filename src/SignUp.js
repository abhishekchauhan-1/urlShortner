import React, { useState } from "react";
import './SignUpStyles.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
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

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://url-4s79.onrender.com/auth/signup", {
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

                console.log("User signed up successfully:", data.user);
            } else {
                console.error("Signup failed");
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    return (
        <>
            <div className="signupdiv"></div>
            <div className="SignupForm">
                <form onSubmit={handleSignUp}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    /><br />
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

export default SignUp;
