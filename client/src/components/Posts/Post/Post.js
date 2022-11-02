import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumpUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';
const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const Likes = () => {
    if(post.likes.length > 0){
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ?(
          <><ThumpUpAltIcon fontSize='small' /> &nbsp; {post.likes.lingth > 2 ? `You and ${post.likes.length - 1 }Others`: `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ):(
          <><ThumpUpAltIcon fontSize='small' /> &nbsp; {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        )
    }
    return <><ThumpUpAltIcon fontSize='small' /> &nbsp; Like</>
  }
  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }
  return (
    <Card className={classes.card} raised elevation={6}>
    <ButtonBase className={classes.cardAction} onClick={openPost}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}  />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      
      <div className={classes.details}>
      <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
        <Typography className={classes.title} color='textSecondary' variant='body2' gutterBottom component='p'>{post.message}</Typography>
      </CardContent> 
    </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes/>
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
          <Button size='small' color='secondary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small'/>
            Delete
          </Button>
        )}
        <div className={classes.overlay2}>
        {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
          <Button style={{ color: '#fff'}} size='small' onClick={() => {setCurrentId(post._id)}}>
            <MoreHorizIcon fontSize='medium' />
          </Button>
          )}
        </div>
      </CardActions>
    </Card>
  )
}

export default Post