import {useHistory, useParams} from "react-router-dom";
import useFetch from "./useFetch";

function BlogDetails() {
    const {id} = useParams();
    const {data, isLoading, error} = useFetch('http://localhost:3000/blogs/' + id);
    const history = useHistory();

    const handleDelete = () => {
        fetch('http://localhost:3000/blogs/' + data.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
        console.log('delete btn clicked')
    }
    return (
        <div className="blog-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}, or it has been deleted</div>}
            {data && (
                <article>
                    <div>
                        <h2>{data.title}</h2>
                        <div> {data.body}</div>
                        <p>Written by: {data.author}</p>
                    </div>

                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;