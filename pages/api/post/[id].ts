import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]";
import prisma from '../../../lib/prisma';
// import Router from 'next/router';

// async function deletePost(id: string): Promise<void> {
//     await fetch(`/api/post/${id}`, {
//       method: 'DELETE',
//     });
//     Router.push('/');
//   }

// DELETE /api/post/:id
export default async function handle(req, res) {
  const session = await getServerSession(req, res, options)
  if (!session) {
    res.send({
      content: "protected content"
    })
  }
  const { title, content } = req.body;

   
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email || 'empty@empty'} },
    },
  });
  res.json(result);
}