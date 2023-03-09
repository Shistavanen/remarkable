import mongoose, { Schema } from 'mongoose';

interface ITag {
  name: string;
  bookmarks: mongoose.Types.ObjectId[];
}

const tagSchema = new Schema<ITag>({
  name: {type: String, required: true, unique: true},
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark', default: [] }]
})

export default mongoose.models.Tag || mongoose.model<ITag>('Tag', tagSchema);