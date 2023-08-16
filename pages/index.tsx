import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from '../lib/prisma'
import {Grid, Stack, Typography} from '@mui/material'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true},
    include: {
      author: {
        select: { name: true},
      },
    },
  });
  return { 
    props: { feed }, 
    revalidate: 10 
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Stack spacing={2}>
        <Typography
          variant="h2"
        >Public Feed</Typography>
        
          {props.feed.map((post) => (
            <div 
              key={post.id}
              >
              <Post post={post} />
            </div>
          ))}
        
      </Stack>
    </Layout>
  )
}

export default Blog
