import React from 'react';
import './Header.scss';

const Header = ({ participants }) => {

  return (
    <thead className="auction-table__header">
      <tr className="auction-table__row auction-table__row--header">
        <th className="auction-table__cell auction-table__cell--header">
          Параметры и требования
        </th>

        {participants.map((item) => (
          <th className="auction-table__cell auction-table__cell--header" key={item.id}>
            {item.user_name}
          </th>
        ))}
      </tr>
    </thead>
  )
};

export default Header;