import React from 'react';
import './Card.scss';

function Card({
  bookId,
  author,
  title,
  year,
  category,
  username,
  authUser,
  openDeleteModalHandler,
}) {
  return (
    <article className="card">
      <h3 className="card__author">{author}</h3>
      <div className="card__details">
        <span>{title}</span>
        <span>{year}</span>
      </div>
      <div className="card__user">
        <span>{username}</span>
        <span>{category}</span>
      </div>

      {authUser && (
        <button
          className="card__delete-btn"
          onClick={() => openDeleteModalHandler(bookId)}
        >
          X
        </button>
      )}
    </article>
  );
}

export default Card;
