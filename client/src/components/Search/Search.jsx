import React, { useState } from 'react'
import './Search.css'
import { Button, Typography, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/Action/User'
import User from '../User/User'

const Search = () => {
    const [name, setName] = useState("")
    const { users, loading, error } = useSelector((state) => state.allUsers)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getAllUsers(name))
    }

    return (
        <div className="search">
            <form className="searchForm" onSubmit={handleSubmit}>
                <Typography variant='h3' style={{ padding: "2vmax" }}>Social App</Typography>
                <label htmlFor="searchInput" className="visually-hidden">Username</label>
                <input 
                    id="searchInput"
                    type="text"
                    placeholder='Username'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
                <Button disabled={loading} type='submit'>Search</Button>
            </form>
            <div className="searchResults">
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    users && users.map((user) => (
                        <User 
                            key={user._id}
                            userId={user._id}
                            name={user.name}
                            avatar={user.avatar.url}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Search
