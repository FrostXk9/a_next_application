"use client"
import { Button, Card, Input, List, ListItem } from '@material-tailwind/react'
import { useEffect, useState } from 'react'

const SpecificUser = () => {
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState([]);

    const fetchUserdata = async () => {
        const response = await fetch(`/api/users/${userId}`)
        if(response.ok === true){
            const res = await response.json()
            console.log(res.user);
            setUserData(res.user)
        }else{
            console.log('error fetching data');
            setUserData(null)
        }
    }
  return (
    <div className='w-96'>

        <div className='w-72 flex'>
            <Input label='enter user Id' type='text' value={userId} onChange={(e) => setUserId(e.target.value)}/>
            <Button className='ml-1' onClick={fetchUserdata}>FetchUser</Button>
        </div>
            {userData ? (
                userData.map((d) => {
                    return <div key={d.id}>
                        <Card className='w-96 mt-5 bg-orange-900 shadow'>
                            <List>
                                <ListItem>ID {d.id}</ListItem>
                                <ListItem>{d.name}</ListItem>
                                <ListItem>{d.age}</ListItem>
                                <ListItem>{d.email}</ListItem>
                                <ListItem>{d.password}</ListItem>
                            </List>
                        </Card>
                    </div>
                })
            ) : (
                <p className='mt-5'>Search for a specific user</p>
            )}
    </div>
  )
}

export default SpecificUser;
