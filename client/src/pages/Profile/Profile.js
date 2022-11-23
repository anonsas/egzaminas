import { useState, useEffect } from 'react';
import './Profile.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getBookByUser } from '../../utils/books.utils';
import { Card } from '../../components';

function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/login');
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem('accessToken');
    auth.logout();
    navigate('/login');
  };

  useEffect(() => {
    (async () => {
      const books = await getBookByUser(auth.user.id);
      setUserBooks(books);
    })();
  }, [auth.user.id]);

  return (
    <main className="profile">
      <div className="profile__user-container">
        <h1 className="profile__user">Welcome - {auth.user?.username}</h1>
        <button onClick={logoutHandler} className="profile__logout-btn">
          Logout
        </button>
      </div>
      <div className="profile__books-container">
        <h3>Here are your books:</h3>

        <div className="profile__books">
          {userBooks?.map((book) => (
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
      </div>
    </main>
  );
}

export default Profile;
