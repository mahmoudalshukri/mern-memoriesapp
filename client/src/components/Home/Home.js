import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Form from '../Forms/Form';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination/Pagination';
import useStyles from './styles';

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispacth = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const searchPost = () => {
        if(search.trim() || tags ){
            dispacth(getPostsBySearch({ search, tags: tags.join(',')}));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`); 
        }else{
            navigate('/');
        }
    }
    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            searchPost();
        }
    }
    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete)); 
  return (
    <Grow in>
        <Container maxWidth='xl'>
            <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} md={9} sm={6}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} md={3} sm={6}>
                    <AppBar className={classes.appBarSearch} position="static" color='inherit'>
                        <TextField
                            name='search'
                            variant='outlined'
                            label='Search Memories'
                            onKeyPress={handleKeyPress}
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ChipInput 
                            style={{ margin: '10px 0'}}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label='Search Tags'
                            variant='outlined'
                        />
                        <Button onClick={searchPost} color='primary' variant='contained'>Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    {(!searchQuery && !tags.length) && (
                    <Paper className={classes.pagination} elevation={6}>
                        <Pagination page={page} />
                    </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home
