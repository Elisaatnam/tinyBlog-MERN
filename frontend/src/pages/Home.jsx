import axios from "axios";
import { useEffect, useState } from "react";
import CreatePostForm from "../components/CreatePostForm";
import CreatePostImgae from "../components/CreatePostImage";

const Home = () => {
	const [refresh, setRefresh] = useState(true);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get("/api/posts");
			setPosts(data);
		};
		fetchData();
	}, [refresh]);

	const handleDelete = async id => {
		try {
			const { data } = await axios.delete(`/api/posts/${id}`);
			console.log(data);
			setRefresh(prev => !prev);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<main>
			<h1>Tiny MERN Blog</h1>
			{/* <CreatePostForm setRefresh={setRefresh} /> // altes <form> */}
			<CreatePostImgae setRefresh={setRefresh} />
			<section>
				<h2>All Posts:</h2>
				{posts.map(singlePost => (
					<article key={singlePost._id}>
						<img src={singlePost.image?.url} alt={singlePost.title} />
						<h4>{singlePost.title}</h4>
						<p>{singlePost.content}</p>
						<button>Edit</button>
						<button onClick={() => handleDelete(singlePost._id)}>Delete</button>
					</article>
				))}
			</section>
		</main>
	);
};

export default Home;
