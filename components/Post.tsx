import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {authorName}
        </Typography>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
        size="small">More</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
