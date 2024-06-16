import React, { useState } from 'react'
import "./Header.css"
import {Add,HomeOutlined, Home,AddOutlined, Search,SearchOutlined, AccountCircle, AccountCircleOutlined} from "@mui/icons-material"
import { Link } from 'react-router-dom'


const Header = () => {
    const [tab,setTab] = useState(window.location.pathname)
  return (
    <div className='header'>
        <Link to="/" onClick={()=>{setTab("/")}}>
        {tab === "/"? <Home style={{color:"black"}}/> : <HomeOutlined/>}
        </Link>

        <Link to="/newpost" onClick={()=>{setTab("/newpost")}}>
        {tab === "/" ? <Add style={{color:"black"}}/> : <AddOutlined/>}
        </Link>

        <Link to="/search" onClick={()=>{setTab("/search")}}>
        {tab === "/" ? <Search style={{color:"black"}}/> : <SearchOutlined/>}
        </Link>

        <Link to="/account" onClick={()=>{setTab("/account")}}>
        {tab === "/" ? <AccountCircle style={{color:"black"}}/> : <AccountCircleOutlined/>}
        </Link>
    </div>
  )
}

export default Header