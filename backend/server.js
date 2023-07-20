import "./config/config.js"; // als 1. importieren!
import express from "express";
import "./models/index.js";
import { Post } from "./models/PostModel.js";
import { Author } from "./models/AuthorModel.js";
import multer from "multer";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUDNAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = 9898;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(morgan("dev"));

//! ------------ GET ROUTES ------------------------
//- alle Posts "fetchen"
app.get("/api/posts", async (req, res) => {
	try {
		const allPosts = await Post.find();
		res.send(allPosts);
	} catch (err) {
		console.error(err);
		res.send("There was an error fetching the posts");
	}
});

//- Rute zum finden aller Posts eines Autors anahnd d ID
app.get("/api/postsByAuthor/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const posts = await Post.find({ author: id });
		res.send(posts);
	} catch (err) {
		console.error(err);
		res.send("There was an error fetching the posts by the author");
	}
});

//! ------------ POST ROUTES ------------------------
//- neuen Post hinzufuegen (plus Bild)
app.post("/api/posts", upload.single("image"), async (req, res) => {
	console.log(req.file);
	try {
		const author = await Author.findById(req.body.author);

		if (author === null) {
			return res.send("Author is invalid");
		}

		cloudinary.uploader
			.upload_stream(
				{ resource_type: "image", folder: "MERN-Blog" },
				async (err, result) => {
					const response = await Post.create({
						...req.body,
						image: { url: result.secure_url, imageId: result.public_id },
					});
					res.send(response);
				},
			)
			.end(req.file.buffer);
	} catch (err) {
		console.error(err);
		res.send("There was an error posting the posts");
	}
});

//- neuen Autor hinzufuegen
app.post("/api/newAuthor", async (req, res) => {
	try {
		const newAuthor = await Author.create(req.body);
		res.send(newAuthor);
	} catch (err) {
		console.error(err);
		res.send("There was an creating the author");
	}
});

//! ------------ PUT ROUTES ------------------------
//- Post editieren
app.put("/api/posts/:id", async (req, res) => {
	const { _id } = req.body;
	const editedPost = req.body;

	try {
		const mongoDBRessponse = await Post.findByIdAndUpdate(id, editedPost, {
			new: true,
		}); //* Wenn man ein Dokument in MongoDB mit findByIdAndUpdate aktualisierst, wird standardmäßig das Dokument vor der Aktualisierung (das Originaldokument) zurückgegeben. Indem dmannew: true als Option angibt, weist man MongoDB jedoch an, das aktualisierte Dokument zurückzugeben.

		res.send(mongoDBRessponse);
	} catch (err) {
		console.error(err);
		res.send("There was an error editing the post");
	}
});

//! ------------ DELETE ROUTES ------------------------
app.delete("/api/posts/:id", async (req, res) => {
	const postId = req.params.id;
	try {
		const dbRes = await Post.findByIdAndDelete(postId);
		cloudinary.uploader.destroy(dbRes.image?.imageId, err => console.log(err));
		res.send("post has been deleted");
	} catch (err) {
		console.error(err);
		res.send("There was an error deleting the post");
	}
});

app.listen(PORT, () => console.log(`Server ready on: ${PORT}`));
