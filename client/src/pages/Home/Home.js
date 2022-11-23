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
      setBookList(books);
    })();
  }, []);

  return (
    <main className="home">
      {bookList?.map((book) => (
        <Card
          key={book.id}
          bookId={book.id}
          author={book.author}
          title={book.title}
          year={book.year}
          userId={book.UserId}
          username={book.username}
        />
      ))}
    </main>
  );
}

export default Home;
