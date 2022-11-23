import React, { useState, useEffect } from 'react';
import './Book.scss';
import { createNewBook } from '../../utils/books.utils';
import { useNavigate } from 'react-router-dom';

function PostForm() {
  const navigate = useNavigate();

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/login');
  }, [navigate]);

  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (!author || !title || !year) {
      setErrorMessage(true);
    } else {
      await createNewBook({ author, title, year });
      navigate('/');
      setAuthor('');
      setTitle('');
      setYear('');
      setErrorMessage(false);
    }
  };

  return (
    <div className="post-form">
      <form onSubmit={submitFormHandler} className="form">
        <div className="form__input">
          <label htmlFor="title">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="author"
            autoComplete="off"
          />
        </div>

        <div className="form__input">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            autoComplete="off"
          />
        </div>

        <div className="form__input">
          <label htmlFor="title">Year:</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="year"
            autoComplete="off"
          />
        </div>
        <span style={{ color: 'orangered' }}>
          {errorMessage && 'Please fill the form!'}
        </span>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;
