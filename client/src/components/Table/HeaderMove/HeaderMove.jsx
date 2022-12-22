import React from 'react';
import Timer from '../Timer/Timer';
import './HeaderMove.scss';

const HeaderMove = ({ participants, currentParticipantId }) => {

  return (
    <thead className="auction-table__header">
      <tr className="auction-table__row auction-table__row--header">
        <th className="auction-table__cell auction-table__cell--header auction-table__cell--move">
          Ход
        </th>

        {participants.map((item, index) => (
          <th className="auction-table__cell auction-table__cell--header auction-table__cell--move" key={item.id}>
            {currentParticipantId === index &&
              <Timer
                timerEnd={item.time_end}
              />
            }
          </th>
        ))}

      </tr>
    </thead>
  )
};

export default HeaderMove;