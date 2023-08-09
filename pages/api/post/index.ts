import { getServerSession } from 'next-auth/next';
import { options } from '../auth/[...nextauth]';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const sessionServer = await getServerSession(req, res, options)
  const { title, content } = req.body;

  const session = await getSession({ req });
  console.log( session?.user?.email || 'empty getsession')
  console.log( sessionServer?.user?.email || 'empty serversession')
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: sessionServer?.user?.email } },
    },
  });
  res.json(result);
}