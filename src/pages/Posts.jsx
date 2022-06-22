import { useEffect, useState } from 'react';
import styles from './Posts.module.css';

const Posts = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    (async () => {
      const data = await fetch('https://codebuddy.review/posts');
      const res = await data.json();
      console.log(res.data.posts);
      setPosts(res.data.posts);
    })();
  }, []);

  console.log(posts);
  return (
    <div className={styles.posts}>
      {posts &&
        posts.length > 0 &&
        posts.map(post => (
          <div className={styles.card} key={post.id}>
            <img src={post.image} alt="avatar" />

            <p>{post.title}</p>
            <p>
              Name : {post.firstName} {post.lastName}
            </p>
            <p>Writeup : {post.writeup}</p>
          </div>
        ))}
    </div>
  );
};

export default Posts;
