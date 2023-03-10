import mongoose, { Schema } from 'mongoose';

interface IBookmark {
  url: string;
  title: string;
  tags: Array<{ type: mongoose.Types.ObjectId, ref: 'Tag' }>;
}

const bookmarkSchema = new Schema<IBookmark>({
  url: { type: String, unique: true, required: true },
  title: { type: String, requred: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
})

export default mongoose.models.Bookmark || mongoose.model<IBookmark>('Bookmark', bookmarkSchema);