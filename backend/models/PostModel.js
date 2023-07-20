import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		minlength: 5,
		required: true,
	},
	author: {
		type: mongoose.Types.ObjectId,
		required: true,
		immutable: true, // = nicht veraenderbar
	},
	image: {
		type: {
			url: String,
			imageId: String,
		},
		required: true,
	},
});

export const Post = mongoose.model("Post", postSchema);
