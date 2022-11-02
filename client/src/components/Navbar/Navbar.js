import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import { useDispatch } from 'react-redux';
import jwt_decode  from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const logout = () => {
      dispatch({type: 'LOGOUT'});
      setUser(null); 
      window.location.reload(false);
    }
    useEffect(() => {
      const token = user?.token;
      if(token){
        const decodedToken = jwt_decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
    <Link to='/' className={classes.brandContainer}>
        <img className={classes.image} src={memoriesText} alt='memories' height='45px' />
        <img className={classes.image} src={memoriesLogo} alt='memories' height='40px' />
    </Link>
    <Toolbar className={classes.toolbar}>
      {user ? (
        <div className={classes.profile}>
          <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
          <Typography component={Link} to='/' variant='h6' className={classes.userName}>{user.result.name}</Typography>
          <Button className={classes.logout} variane='contained' color='secondary' onClick={logout}>Logout</Button>
        </div>
      ):(
        <Button color='primary' variant='contained' component={Link} to='/auth'>Sign In</Button>
      )}
    </Toolbar>
    </AppBar>   
  )
}

export default Navbar