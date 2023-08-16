import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/react'
import Post, { PostProps } from '../components/Post'
import prisma from '../lib/prisma'
import Layout from '../components/Layout'
import {Grid, Stack, Typography} from '@mui/material'
// import { Session } from 'next-auth'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts }
  }
}

type DraftsProps = {
  // session: Session
  drafts: PostProps[]
}

// @refresh reset
const Drafts: React.FC<DraftsProps> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Stack spacing={2}>
        <Typography
        variant="h2">
          My Drafts
          </Typography>
        
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
 
      </Stack>

    </Layout>
  );
}

export default Drafts