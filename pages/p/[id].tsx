import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { Stack, Button, Typography, Paper } from '@mui/material';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

// type Props = {
//   post: PostProps
// }

const PostDetail: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <Stack spacing={2}>
        <Typography variant='h4'>{title}</Typography>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <Paper variant="outlined">
        <Typography variant='body1'>{props.content}</Typography>
        </Paper> 
        <Stack spacing={4} direction="row">
        {!props.published && userHasValidSession && postBelongsToUser && (
          <Button variant='contained' onClick={() => publishPost(props.id)}>Publish</Button>
        )}
        
        {userHasValidSession && postBelongsToUser && (
          <Button variant="outlined" onClick={() => deletePost(props.id)}>Delete</Button>
        )}
        </Stack>
      </Stack>

    </Layout>
  );
};

export default PostDetail;