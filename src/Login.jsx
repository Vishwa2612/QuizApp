import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const history = useHistory();
  const [err, setErr] = useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        history.push('/selectform/');
    } catch (err) {
        history.push('/selectform/');
        setErr(true);
    }
  };

  const signup = () =>{
    history.push('/signup');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-violet-500">
      <div className="w-full max-w-md p-6 bg-white border border-black rounded-2xl">
        <span className="text-3xl font-bold text-center block mb-4">Quiz App</span>
        <span className="text-xl font-semibold text-center block mb-8">Login</span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-2">
            <Label name="email">Email Id</Label>
            <Input id="email" type="email" required className="p-2 border rounded" />
          </div>
          <div className="mb-2">
            <Label htmlFor="terms">Password</Label>
            <Input id="password" type="password"  required className="p-2 border rounded" />
          </div>
          <div className="flex justify-center">
            <Button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green">
              Sign in
            </Button>
          </div>
        </form>
        <p className="text-center mt-4">Don't have an account?</p>
        <Button onClick={signup} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ml-[163px]">SignUp</Button>
      </div>
    </div>
  );
}

export default Login;
