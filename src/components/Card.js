import React from "react";

function Card({ card }) {
    return (
        <div className="group card" key={card._id}>
            <img
                alt=""
                className="group__image"
                src={card.link}
                style={{ backgroundImage: `url(${card.link})` }}
            />
            <div className="group__box">
                <h2 className="group__text">{card.name}</h2>
                <div className="group__likes">
                    <button
                        aria-label="кнопка лайк"
                        className="group__like"
                        type="button"
                    ></button>
                    <span className="group__like-sum">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;