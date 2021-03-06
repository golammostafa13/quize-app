import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();

    async function handlSubmit(e){
        
        e.preventDefault();
        try{
            setError("");
            setLoading(true);
            await login(email, password);
            navigate("/quize-app");
        }catch(err){
            console.log(err);
            setLoading(false);

            setError("Failed to login! Something wrong with email or password");
        }
    }

    return(
        <Form style={{height: "330px"}} onSubmit={handlSubmit} >
            <TextInput icon="alternate_email" type="text" required placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextInput icon="lock" type="password" required placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button disabled={loading} type="submit" ><span>Submit Now</span></Button>
            {error && <p className="error">{error}</p>}
            <div class="info">Don't have an account? <Link to="/signup">Signup</Link> instead.</div>
        </Form>
    )
}