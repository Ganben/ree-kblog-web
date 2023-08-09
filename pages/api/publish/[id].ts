import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { options } from '../auth/[...nextauth]';

// PUT /api/publish/:id
export default async function handle(req, res) {
  const sessionServer = await getServerSession(req, res, options)
  if (!sessionServer) {
    res.send({
      content: "protected content"
    })
  }
  const postId = req.query.id;
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
  res.json(post);
}