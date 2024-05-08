"use client"
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

const DeleteUser = () => {
    const [id, setId] = useState('');
    const handleDelete = async (e) => {
        e.preventDefault()

        if(!id){
            alert("please provide a user ID")
            return;
        }

        const clearForm = () => {
            setId('')
        }

        try {
            const response = await fetch(`/api/users/${id}`, {
                method : 'DELETE',
            });
            if(response.ok){
                alert('user was successfully deleted')
                clearForm()
            } else {
                const data = await response.json()
                alert('Something went wrong while attempting to delete a user')
            }
        } catch (error) {
            alert(error)
        }
    }
  return (
    <div>
      <div>
        <Input 
            label="user ID"
            type="text"
            placeholder="User ID"
            value={id}
            onChange={(e) => setId(e.target.value)} />
            <Button className="mt-2" onClick={handleDelete}>Delete user</Button>
      </div>
    </div>
  )
}

export default DeleteUser
