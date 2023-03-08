import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../db/db';
import Bookmark from '@/models/Bookmark';
import Tag from '@/models/Tag';


export default async function createBookmark(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { url, title, tags } = req.body;

  const tagIds = tags.map(async (tag: String) => {
    const existingTag = await Tag.findOne({ name: tag});
    if(existingTag) return existingTag._id;
    const newTag = await Tag.create({ name: tag});
    return newTag._id;
  });

  const newBookmark = await Bookmark.create({ url, title, tags: tagIds });

  res.status(201).send('Bookmark created!');
}