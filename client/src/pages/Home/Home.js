import { useState, useEffect } from 'react';
import './Home.scss';
import { Card } from '../../components';
import { getAllBooks } from '../../utils/books.utils';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

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
      <input
        type="text"
        className="home__input"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        placeholder="Search by title"
        autoComplete="off"
      />

      <div className="home__book-list">
        {bookList?.map((book) => (
          <Card
            key={book.id}
            bookId={book.id}
            author={book.author}
            title={book.title}
            year={book.year}
            category={book.category}
            userId={book.UserId}
            username={book.username}
          />
        ))}
      </div>
    </main>
  );
}

export default Home;
