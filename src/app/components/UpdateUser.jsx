"use client"
import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";

const UpdateUser = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleUpdate = async (e) => {
        e.preventDefault();
        if(!id){
            alert("please provide user ID");
            return;
        }
         
        const requestedId = { id };

        if(name){
            requestedId.name = name
        }
        if(email){
            requestedId.email = email
        }
        if(password){
            requestedId.password = password
        }

        const clearForm = () => {
            setId("");
            setName("");
            setEmail("");
            setPassword("");
        }

        try {
            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestedId)
            
            })
            if(response.ok){
                alert('user info updated')
                clearForm()
            } else {

            }
        } catch (error) {
            alert(error)
        }
    }
  return (
    <>
        <div>
            <Input 
                label='ID'
                type='text'
                placeholder='ID'
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <Input 
                label='Name'
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input 
                label='email'
                type='text'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
                label='password'
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button className='mt-2' type="submit" onClick={handleUpdate} >Update User</Button>
      </div>
    </>
  )
}

export default UpdateUser;
