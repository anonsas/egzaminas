import React, { useState, useEffect } from 'react';
import './Book.scss';
import { createNewBook } from '../../utils/books.utils';
import { useNavigate } from 'react-router-dom';

function PostForm() {
  const navigate = useNavigate();

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const [invalidAuthor, setInvalidAuthor] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidYear, setInvalidYear] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) navigate('/login');
  }, [navigate]);

  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (!author) {
      setInvalidAuthor(true);
    } else if (!title) {
      setInvalidAuthor(true);
      setInvalidTitle(false);
    } else if (!year) {
      setInvalidAuthor(true);
      setInvalidTitle(true);
      setInvalidYear(false);
    } else {
      await createNewBook({ author, title, year });
      navigate('/');
      setAuthor('');
      setTitle('');
      setYear('');
      setInvalidAuthor(false);
      setInvalidTitle(false);
      setInvalidYear(false);
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
            placeholder="Title"
            autoComplete="off"
          />
          <span style={{ color: 'orangered' }}>
            {invalidAuthor && 'Please enter author!'}
          </span>
        </div>

        <div className="form__input">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            autoComplete="off"
          />
          <span style={{ color: 'orangered' }}>
            {invalidTitle && 'Please enter author!'}
          </span>
        </div>

        <div className="form__input">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Title"
            autoComplete="off"
          />
          <span style={{ color: 'orangered' }}>
            {invalidYear && 'Please enter author!'}
          </span>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;
