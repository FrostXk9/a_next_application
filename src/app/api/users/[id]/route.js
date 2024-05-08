import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from 'fs'

// get specific user
export async function GET(_, res){
    const {id} = await res.params;
    const user = users.filter((u)=> u.id === id )
    return NextResponse.json({user, ok: true})
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

// deleting a user 
export async function DELETE(req, res){
    const { id } = res.params;

    const userIndex = users.findIndex((user) => user.id === id);

    if(userIndex === -1){
        return NextResponse.json({result: "user not found"}, {status: 404})
    }


    // Remove the user from the users array
    users.splice(userIndex, 1)


    const updatedUserArray = users

    // convert the updated users array to a JSON string
    const updatedData = JSON.stringify(updatedUserArray, null, 2)

    // write the updated users to a JSON string
    fs.writeFileSync(
        // first provide path
        './src/app/util/db.js',
        // what we want to send or push
        `export const users = ${updatedData};`,
        // encoding
        'utf-8'
    );

    return NextResponse.json({success : "user successfuly deleted"});
}