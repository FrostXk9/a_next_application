import { users } from "@/app/util/db";
import { NextResponse } from "next/server";


// get specific user
export async function GET(_, res){
    const {id} = await res.params;
    const user = users.filter((u)=> u.id === id )
    return NextResponse.json({user})
}

// login
export async function POST(req, res){
    let { name, email, password } = await req.json();
    const {id} = await res.params;

    const {
        name : userName,
        email: userEmail,
        password: userPassword,
    } = users.find((u) => u.id === id);

    if(userName === name && userEmail === email && userPassword === password){
        return NextResponse.json({result: "You have logged in"})
    } else if(!name || !email || !password){
        return NextResponse.json({result: "Please fill in all input fields"});
    } else{
        return NextResponse.json({result: "Invalid credentials"})
    }

}