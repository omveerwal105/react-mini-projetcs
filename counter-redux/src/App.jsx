import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, reset } from './features/counter/counterSlice';
import { toggleTheme } from './features/theme/themeSlice';
import { fetchPosts } from './features/posts/postsSlice';


const App = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.theme.isLight);

  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const appStyle = {
    backgroundColor: themeMode ? '#fff' : '#333',
    color: themeMode ? '#333' : '#fff',
    textAlign: 'center',
    height: '100vh',
    paddingTop: '100px',
  }

  return (
    <div style={appStyle}>
      <h1>Redux Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>

      <br></br>
      <button style={{ marginTop: '50px' }} onClick={() => dispatch(toggleTheme())}>
        Switch to {themeMode ? 'Dark' : 'light'} Mode
      </button>

      <h2 style={{ marginTop: '40px' }}>📄 Posts</h2>

      <button className='btn btn-primary mb-3' onClick={() => dispatch(fetchPosts())}>Refresh</button>

      {status === 'loading' && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {status === 'failed' && <p>Error: {error}</p>}

      

      {status === 'succeeded' &&
        posts.map((post) => (
          <div key={post.id} style={{ margin: '10px', borderBottom: '1px solid gray' }}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>

        ))
      }

    </div>
  )
}

export default App