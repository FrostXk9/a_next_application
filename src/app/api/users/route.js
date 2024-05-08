import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from 'fs'

export function GET(){
    const data = users;
    return NextResponse.json({data: data}, {status: 200});
}




export async function POST(req, res){
    let { id, name, email, password } = await req.json();
    // const {id} = await res.params;

    // check if data is provided
    if(!id || !name || !email || !password){
        return NextResponse.json({result: "Required field not found"}, {status: 400})
    } else {
        //add new user in the memory array
        users.push({id, name, email, password})

        // extract just the user array from updated data
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

        return NextResponse.json({success : "user successfuly created"})
    }
}

//update user
export async function PUT(req, res){
    let { id, name, email, password } = await req.json();

    // find the user in users array by ID
    const userIndex = users.findIndex((user) => user.id === id)

    if(userIndex === -1){
        return NextResponse.json({result: "user not found"}, {status: 404})
    }

    if(name){
        users[userIndex].name = name
    }
    if(email){
        users[userIndex].email = email
    }
    if(password){
        users[userIndex].password = password
    }

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

    return NextResponse.json({success : "user successfuly updated"})
}