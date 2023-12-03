import { useState, useEffect } from 'react';
import { ModifiedFormData } from '../../types/common';
import './Card.scss';

interface CardProps extends ModifiedFormData {
  isLatest: boolean;
}

const Card: React.FC<CardProps> = ({
  name,
  age,
  country,
  email,
  gender,
  password,
  userImage,
  isLatest,
}) => {
  const [hasTemporaryBackground, setHasTemporaryBackground] =
    useState(isLatest);

  useEffect(() => {
    if (isLatest) {
      const timerId = setTimeout(() => {
        setHasTemporaryBackground(false);
      }, 2000);
      return () => clearTimeout(timerId);
    }
  }, [isLatest]);

  const cardClass = hasTemporaryBackground ? 'last-card' : '';

  return (
    <li className={`card ${cardClass}`}>
      <img
        src={userImage}
        style={{ objectFit: 'cover' }}
        width="200px"
        height="200px"
        alt={name}
      />
      <div className="card__details">
        <p className="card__details-info">
          <span>Name: </span>
          {name}
        </p>
        <p className="card__details-info">
          <span>Age: </span>
          {age}
        </p>
        <p className="card__details-info">
          <span>Country: </span>
          {country}
        </p>
        <p className="card__details-info">
          <span>Email: </span>
          {email}
        </p>
        <p className="card__details-info">
          <span>Password: </span>
          {password}
        </p>
        <p className="card__details-info">
          <span>Gender: </span>
          {gender}
        </p>
      </div>
    </li>
  );
};

export default Card;
