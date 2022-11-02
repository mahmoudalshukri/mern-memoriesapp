import React from 'react';
import { Container} from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { Routes ,Route, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    const shouldRedirect = true;
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <Navbar />
            </Container>
            <Routes>
            <Route
                path="/"
                element={
                    shouldRedirect ? (
                    <Navigate replace to="/posts?page=1" />
                    ) : (
                    ''
                    )
                }
            />
                <Route path='/posts' exact element={<Home />} />
                <Route path='/posts/search' exact element={<Home />} />
                <Route path='/posts/:id' exact element={<PostDetails />} />
                <Route path='/auth' exact element={!user ? <Auth /> : <Navigate replace to="/posts" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App