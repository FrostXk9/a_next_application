import React from 'react'
import { Button, Input } from '@material-tailwind/react'
import { useState } from 'react'

const CreateUser = () => {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    // const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!id || !name || !email || !password){
            alert('please fill out all the fields')
        }
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, name, email, password})
            });

            alert("user Created");

        } catch (error) {
            alert(error)
        }
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <Button className='mt-2' type="submit">Save</Button>
      </form>
    </>
  )
}

export default CreateUser;
