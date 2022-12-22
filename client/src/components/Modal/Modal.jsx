import React, { useState } from 'react';
import './Modal.scss';

const Modal = ({ participants, handleAddParticipant, handleStartAuction }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="participants">
      <form className="participants__form" action="#" onSubmit={(event) => {
        event.preventDefault();
        handleAddParticipant(inputValue);
        setInputValue('');
      }}>
        <input
          className="participants__input" type="text"
          placeholder='Имя участника'
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button className="participants__add-btn">
          Добавить Участника
        </button>
      </form>

      <div className="participants__wrapper">
        <ul className="participants__list">
          {participants.map((item) => (
            <li className="participants__item" key={item.id}>
              {item.user_name}
            </li>
          ))}
        </ul>

        <button
          className="participants__start-btn"
          onClick={handleStartAuction}
        >
          Начать Аукцион
        </button>
      </div>

    </div>
  )
};

export default Modal;