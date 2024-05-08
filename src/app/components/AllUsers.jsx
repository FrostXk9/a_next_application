"use client"
import { List, ListItem, Card } from "@material-tailwind/react";
import { useState, useEffect } from "react";
const AllUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await fetch('/api/users')
            const usersInfo = await response.json();
            // console.log(usersInfo.data);
            setUsers(usersInfo.data)
        };
        fetchAllUsers();
    }, [])
  return (
    <div>
      {users && users.map((user) => {
        return <Card key={user.id}>
            <List>
                <ListItem>{user.name}</ListItem>
            </List>
            {/* <div>{user.email}</div>
            <div>{user.age}</div> */}
        </Card>
      })}
    </div>
  )
}

export default AllUsers
