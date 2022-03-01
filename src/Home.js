import BlogList from "./BlogList";
import useFetch from "./useFetch";

function Home () {

const {data: blogs, isLoading, error} = useFetch('http://localhost:3000/blogs');


    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All blogs"/>}
        </div>
    );
}

export default Home;