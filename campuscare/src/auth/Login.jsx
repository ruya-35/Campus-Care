import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "./userStore"; 

export function Login() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    
    const login = useUserStore((state) => state.login);
    const from = location.state?.from?.pathname || "/doctors";

    function handleSubmit(e) {
        e.preventDefault();
        if (username.trim()) {
            login({ name: username });
            navigate(from, { replace: true });
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h2>Student Sign In</h2>
                <div>
                    <label>Username: </label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your student username"
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default Login;