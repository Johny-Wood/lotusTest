import React from 'react';
import Header from './Header/Header';
import HeaderMove from './HeaderMove/HeaderMove';
import './Table.scss';

const Table = ({ participants, currentParticipantId }) => {

  return (
    <table className="auction-table">
      <HeaderMove participants={participants} currentParticipantId={currentParticipantId} />
      <Header participants={participants} />
      <tbody className="auction-table__body">
        <tr className="auction-table__row">
          <td className="auction-table__cell">Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>

          {participants.map((item) => (
            <td className="auction-table__cell auction-table__cell--value" key={item.id}>12</td>
          ))}
        </tr>
        <tr className="auction-table__row">
          <td className="auction-table__cell">Lorem ipsum dolor.</td>

          {participants.map((item) => (
            <td className="auction-table__cell auction-table__cell--value" key={item.id}>12</td>
          ))}
        </tr>
        <tr className="auction-table__row">
          <td className="auction-table__cell">Lorem ipsum.</td>

          {participants.map((item) => (
            <td className="auction-table__cell auction-table__cell--value" key={item.id}>12</td>
          ))}
        </tr>
        <tr className="auction-table__row">
          <td className="auction-table__cell">Lorem.</td>

          {participants.map((item) => (
            <td className="auction-table__cell auction-table__cell--value" key={item.id}>12</td>
          ))}
        </tr>
        <tr className="auction-table__row">
          <td className="auction-table__cell">Lorem.</td>

          {participants.map((item) => (
            <td className="auction-table__cell auction-table__cell--value" key={item.id}>12</td>
          ))}
        </tr>
      </tbody>
    </table>
  )
};

export default Table;