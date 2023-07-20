import axios from "axios";

const CreatePostImgae = ({ setRefresh }) => {
	const handleSubmit = async e => {
		e.preventDefault();
		const formData = new FormData(e.target); // bezieht sofort alle Daten aus d <form>

		const respone = await axios.post("/api/posts", formData);
		setRefresh(prev => !prev);
		console.log(respone);
		e.target.reset(); // setzt d <form> zurueck
	};
	return (
		<form onSubmit={handleSubmit}>
			<input type='text' placeholder='Title' name='title' />
			<input type='text' placeholder='Content' name='content' />
			<input type='text' placeholder='AuthorId' name='author' />
			<input type='file' placeholder='Image' name='image' />
			<button type='submit'>Submit</button>
		</form>
	);
};

export default CreatePostImgae;
