import axios from "axios";
import { useRef } from "react";

const CreatePostForm = ({ setRefresh }) => {
	const titleRef = useRef();
	const contentRef = useRef();
	const authorRef = useRef();

	const handleSubmit = async () => {
		const newPost = {
			title: titleRef.current.value,
			content: contentRef.current.value,
			author: authorRef.current.value,
		};

		const response = await axios.post("/api/posts", newPost);
		console.log(response);
		setRefresh(prev => !prev);
	};

	return (
		<section>
			<h2>Add a new post:</h2>
			<div>
				<input type='text' placeholder='title' ref={titleRef} />
				<input type='text' placeholder='content' ref={contentRef} />
				<input type='text' placeholder='author' ref={authorRef} />

				<button onClick={handleSubmit}>Submit</button>
			</div>
		</section>
	);
};

export default CreatePostForm;
