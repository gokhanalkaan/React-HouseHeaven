import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HouseRoundedIcon from '@mui/icons-material/HouseRounded'
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import { Badge } from '@mui/material'
import styled from 'styled-components'
import { Divider } from '@mui/material'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { FavoritesContext } from '../context/FavoritesContext';
const Container = styled.div`
  position: relative;
`
const NavBar = styled.div`
  //border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`

const Left = styled.div`
  flex: 1;
`

const Right = styled.div`
  margin-right: 15px;

  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const List = styled.div`
  flex: 2;
  list-style-type: none;
  display: flex;

  justify-content: space-between;
`

const Line = styled.div`
  background-color: white;

  height: 55px;
  width: 5px;
  font-size: 5px;
  opacity: ${(props) => (props.val === props.scroll ? 0.8 : 0.1)};
`

const NavList = styled.div`
  background-color: white;

  height: 100px;
  width: 100px;
  position: absolute;
  top: 40px;
  z-index: 3;
  list-style: none;
  display: flex;
  flex-direction: column;

  -webkit-box-shadow: 10px 10px 15px -7px rgba(0,0,0,0.4);
-moz-box-shadow: 10px 10px 15px -7px rgba(0,0,0,0.4);
box-shadow: 10px 10px 15px -7px rgba(0,0,0,0.4);

  right: 35px;
`

const ListItem = styled.p`
  cursor: pointer;
`

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const { count } = useContext(FavoritesContext);

  const [open, setOpen] = useState(false)
  return (
    <Container>
      <NavBar>
        <Left>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>HouseHaven</h2>
          </Link>
        </Left>

        <List>
          <Link
            to={'/houses'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItem>Houses</ListItem>
          </Link>
          <ListItem>My Projects</ListItem>
          <Divider />
          <ListItem>My Blogs</ListItem>
          <Divider />
          <ListItem>My Trips</ListItem>
        </List>

        <Right>
          <Link
            to={'/favorites'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Badge badgeContent={count} color="primary">
              <FavoriteBorderIcon />
            </Badge>
          </Link>

          <Link
            to={'/favorites'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Badge
              badgeContent={0}
              color="primary"
              style={{ margin: '0px 13px' }}
            >
              <HouseOutlinedIcon />
            </Badge>
          </Link>
          {user ? (
            <div
              onClick={() => setOpen(!open)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Gokhan Alkan{' '}
              {open ? (
                <KeyboardArrowUpOutlinedIcon />
              ) : (
                <KeyboardArrowDownOutlinedIcon />
              )}
            </div>
          ) : (
            <Link
              to={'/login'}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span style={{ cursor: 'pointer' }}>Login</span>
            </Link>
          )}
        </Right>
      </NavBar>

      {open && (
        <NavList>
          <Link
            to={'/myHouses'}
            style={{ textDecoration: 'none', color: 'inherit' ,marginLeft:"0px" }}
          >
            <li style={{fontSize:"15px"}}>Your Houses</li>
          </Link>
      <br/>

      <Link
            to={'/rentedHouses'}
            style={{ textDecoration: 'none', color: 'inherit' ,marginLeft:"0px" }}
          >
     
          <li style={{fontSize:"15px" ,width:"100%"}}>Rented Houses</li>

        </Link>
          <br/>
          <li
            style={{ cursor: 'pointer', textAlign: 'start' ,fontSize:"15px" ,width:"100%",textAlign:"start" }}
            onClick={() => {
              dispatch({ type: 'LOGOUT' })
              setOpen(false)
              axios.post(`http://localhost:8800/api/auth/logOut`, {},{withCredentials: true, credentials: 'include'})
            }}
          >
            LogOut
          </li>
        </NavList>
      )}
    </Container>
  )
}

export default Navbar
