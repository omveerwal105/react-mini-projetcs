import React, { useEffect, useState } from 'react'

const Effect = () => {

      const [posts, setPosts] = useState([]);
   

    useEffect(() => {
        console.log('Compoennet Mounted')
    }, []);

    useEffect(() => {
        console.log('Count Changed:', posts);
    }, [posts]);

    useEffect(() => {
  const handleClick = () => console.log('Window clicked');
  window.addEventListener('click', handleClick);

  return () => {
    window.removeEventListener('click', handleClick);
    console.log('Event listener removed');
  };
}, []);

useEffect(()=>{
    const interval = setInterval(()=>{
        console.log('tick');
    },1000);

    return () => {
        clearInterval(interval);
        console.log('Clear Interval');
    }
},[]);

  
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceTerm , setDebouncedTerm] = useState('');
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;


        fetch("https://jsonplaceholder.typicode.com/posts", { signal })
            .then(res => res.json())
            .then(data => setPosts(data.slice(0, 10)))
            .catch(err => {
                if (err.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.error("Other fetch error:", err);
                }
            });

            return  () => {
                controller.abort();
                console.log('cleanup: Fetched Abort');
            }

    }, []);

    useEffect(()=>{
        
            const timer = setTimeout(()=>{
                setDebouncedTerm(searchTerm);
            },500);
        
        return () => {
            clearTimeout(timer);
        }
    },[searchTerm]);

    const filtered = posts.filter((post) => {
        const search = debounceTerm.toLowerCase();

        return (
            post.title.toLowerCase().includes(search)
        );
    });


    return (
        <div className="container mt-3">
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search posts by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {filtered.length > 0 ? (
                filtered.map(post => (
                    <div key={post.id} className="card mb-2">
                        <div className="card-body">
                            {post.title}
                        </div>
                    </div>
                ))
            ) : (
                <p>No results found.</p>
            )}
        </div>
    )
}

export default Effect