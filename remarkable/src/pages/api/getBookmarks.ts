import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../db/db';
import mongoose from 'mongoose';
import Bookmark from '@/models/Bookmark';
import Tag from '@/models/Tag';


export default async function createBookmark(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { tags } = req.query;
  console.log('TAGS: ', tags);
  //TODO: account for one tag, currently is splitting on comma
  const splitTags = tags.split(',').map(tag => tag.trim());
  const searchTags = splitTags.length > 0 ? splitTags : tags; //TODO Refactor, perhaps send array from front end instead of string

  console.log('SEARCHTAGS: ', searchTags)

  const tagIds = await Promise.all(searchTags.map(async (tag) => {
    const foundTag = await Tag.findOne({name: tag});
    return foundTag._id
  }));

  console.log('TAGIDS: ', tagIds);


  const bookmarks = await Bookmark.aggregate([
    {
      $match: {
        tags: { $in: tagIds }
      }
    },
    {
      $addFields: {
        relevance: { $size: { $setIntersection: ['$tags', tagIds] } }
      }
    },
    {
      $match: {
        $or: [
          { tags: { $all: tagIds } },
          { relevance: { $gt: 0 } }
        ]
      }
    },
    {
      $sort: {
        relevance: -1
      }
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        url: { $first: "$url" },
        tags: { $push: "$tags" },
        relevance: { $first: "$relevance" }
      }
    },
    {
      $project: {
        _id: 1,
        title: 1,
        url: 1,
        tags: 1,
        relevance: 1
      }
    }
  ])

  console.log('BOOKMARKS: ', bookmarks)

  res.status(200).json(bookmarks);
}