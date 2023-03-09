import type { NextApiRequest, NextApiResponse } from 'next';
import Tag from '@/models/Tag';

export default async function getTags(req: NextApiRequest, res: NextApiResponse) {

  const tags = await Tag.find();
  res.status(200).json(tags);

}