import mongoose, { Schema } from 'mongoose';

interface IBookmark {
  url: string;
  title: string;
  tags: Array<{ type: mongoose.Types.ObjectId, ref: 'Tag' }>;
}

const bookmarkSchema = new Schema<IBookmark>({
  url: { type: String, required: true },
  title: { type: String, requred: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
})

const Bookmark = mongoose.model<IBookmark>('Bookmark', bookmarkSchema);

export default Bookmark;