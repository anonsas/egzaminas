import { useState, useEffect } from 'react';
import './Home.scss';
import { Card } from '../../components';
import { getAllBooks } from '../../utils/books.utils';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    (async () => {
      const books = await getAllBooks();
      // setBookList(books.postList);
      setBookList(books);
    })();
  }, []);

  return (
    <main className="home">
      {bookList?.map((post) => (
        <Card
          key={post.id}
          postId={post.id}
          title={post.title}
          text={post.postText}
          userId={post.UserId}
          username={post.username}
          // likesCount={post.Likes.length}
        />
      ))}
    </main>
  );
}

export default Home;
