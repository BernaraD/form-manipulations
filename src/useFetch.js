import {useEffect, useState} from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    //getting data from data/db.json
    useEffect(() => {

        const abortCount = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortCount.signal })
                .then(response => {
                    if (!response.ok) {
                        throw Error('Could not fetch data from that resource');
                    }
                    return response.json();
                })
                .then(data => {
                    setData(data);
                    setIsLoading(false);
                    setError(null);
                })
                .catch((error) => {
                    if (error.name === 'AbortError') {
                        console.log('fetch aborted')
                    } else {
                        setIsLoading(false);
                        setError(error.message);
                    }
                })
        }, 1000);
        return () => abortCount.abort();
    }, [url]);

    return {data, isLoading, error}
};

export default useFetch;