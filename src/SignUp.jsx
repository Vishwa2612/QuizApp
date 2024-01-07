import { auth, db} from "../firebase";
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp=()=>{
    const history = useHistory();
    const [err, setErr] = useState(false);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db,"users",res.user.uid),{
                uid:res.user.uid,
                displayName,
                email,
            });
            history.push("/selectedform/");
        } catch (err) {
            history.push("/selectedform/");
            setErr(true);
        }
    };

    const login=()=> {
        history.push('/');
    }

    return (
        <div className='h-screen flex items-center justify-center bg-violet-500'>
            <div className='w-full max-w-md p-6 bg-white border border-black rounded-2xl'>
                <span className="text-3xl font-semiblod text-center block mb-4">Quiz App</span>
                <span className="text-xl font-semibold text-center block mb-8">Sign Up</span>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label name="username" className="font-semibold text-gray-800">Username</Label>
                        <Input id="username" className="border border-gray-300 p-2 rounded w-full" placeholder="Enter name" required />
                    </div>
                    <div className="mb-4">
                        <Label name="email" className="font-semibold text-gray-800">Email</Label>
                        <Input id="email" type="email" className="border border-gray-300 p-2 rounded w-full" placeholder="Enter Email Id" required />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password" className="font-semibold text-gray-800">Password</Label>
                        <Input id="password" type="password" className="border border-gray-300 p-2 rounded w-full" placeholder="Enter Password" required/>
                    </div>
                    <div className="flex justify-center">
                        <Button  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green" type="submit">
                            Sign up
                        </Button>
                    </div>
                    {err && <span className='ml-[117px] text-red-500 '>Something went wrong</span>}
                </form>
                <p className="text-center mt-4">Already have an account?</p>
                <Button onClick={login} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ml-[163px]">Login</Button>
            </div>
        </div>
    );
};

export default SignUp;