import React from 'react';
import { Card, Button, Typography } from 'antd';
import { CardMedia } from '@material-ui/core/';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card} >
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      {/* <div className={classes.overlay}>
        <Typography.Title level={4}>{post.creator}</Typography.Title>
        <Typography.Text>{moment(post.createdAt).fromNow()}</Typography.Text>
      </div> */}
      <div className={classes.overlay2}>
        <Button size="small" onClick={() => setCurrentId(post._id)} icon={<EditOutlined />} />
      </div>
      <Typography.Title className={classes.title} level={4}>{post.creator}</Typography.Title>
      <Typography.Text level={4}>{moment(post.createdAt).fromNow()}</Typography.Text>
      <Typography.Paragraph>Phone: {post.phone}</Typography.Paragraph>
      <Typography.Paragraph>Address: {post.address}</Typography.Paragraph>
      <Typography.Paragraph>e-mail: {post.email}</Typography.Paragraph>
      <Typography.Paragraph>School Name: {post.schoolName}</Typography.Paragraph>
      <Typography.Paragraph>School Address: {post.schoolAddress}</Typography.Paragraph>
      <Typography.Paragraph>School Phone: {post.schoolPhone}</Typography.Paragraph>
      <Typography.Paragraph>School Email: {post.schoolEmail}</Typography.Paragraph>
      <div className={classes.cardActions}>
        <Button size="small" onClick={() => setCurrentId(post._id)} icon={<EditOutlined />} />
        <Button size="small" type="danger" onClick={() => dispatch(deletePost(post._id, post))} icon={<DeleteOutlined />} />
      </div>
    </Card>
  );
};

export default Post;


