import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Card = ({ placeholder, card, cards = [], onClick }) => {
  if (placeholder) {
    return (
      <div className="card placeholder">
        <FontAwesomeIcon size="lg" icon="plus" className="icon" />
      </div>
    )
  } else {
    return (
      <div className="card" onClick={(e) => {
        console.log(e.target);
        if (!e.target.classList.contains('card__delete')) {
          onClick()
        }
      }}>
        <button
          onClick={() => {
            // if (confirm("Are you sure you want to get rid of this card?")) {
            //   removeCardFromHand(card.title)
            // }
          }}
          className="card__delete"
          title="Remove card from hand"
        >
          <FontAwesomeIcon size="sm" icon="remove" />
        </button>
        <div className="card__title">{card.title}</div>
        <div className="card__details">
          <p>
            <div className="card__detail">
              <strong>Dice</strong>
              <span>{card.dice}</span>
            </div>
          </p>
          <p>
            <div className="card__detail">
              <strong>Range</strong>
              <span>{card.range}</span>
            </div>
          </p>
          <p>
            <div className="card__detail">
              <strong>Required</strong>
              <span>{card.required}</span>
            </div>
          </p>
          <p>
            <div className="card__detail">
              <strong>Damage</strong>
              <span>{card.damage}</span>
            </div>
          </p>
        </div>
      </div>
    )
  }
}

export default Card
