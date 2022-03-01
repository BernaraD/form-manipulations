import "./Create.css"
import {useState} from "react";
import {useHistory} from "react-router-dom";

function Create() {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};

        setIsLoading(true);

        fetch('http://localhost:3000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        })
            .then(() => {
                setIsLoading(false);
                history.push('/')
                console.log('new blog added');
            })
    }

    return (
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    type="text"
                    required
                />
                <label>Blog body:</label>
                <textarea required value={body} onChange={(e) => {
                    setBody(e.target.value)
                }}
                >
                </textarea>

                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="Mario">Mario</option>
                    <option value="Yoshi">Yoshi</option>
                </select>
                {!isLoading && <button>Add</button>}
                {isLoading && <button disabled>Adding blog...</button>}
            </form>
        </div>
    );
}

export default Create;