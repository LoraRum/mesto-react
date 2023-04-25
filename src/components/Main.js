import React, {useState, useEffect, useContext} from "react";
import api from "../utils/Api";
import Card from "./Card";
import pencil from "../images/change.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ cards,onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDisLike, onCardDelete }) {
    // const [cards, setCards] = useState([]);
    const currentUser = useContext(CurrentUserContext);

    // useEffect(() => {
    //     api
    //         .getInitialCards()
    //         .then((data) => {
    //             setCards(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    return (
        <main>
            <section className="profile">
                <div className="profile__about">
                    <button
                        onClick={onEditAvatar}
                        aria-label="обновить аватар"
                        className="avatar"
                        type="button"
                    >
                        <img
                            alt="Аватар"
                            className="avatar__image"
                            src={currentUser.avatar}
                        />
                        <div className="avatar__dark"></div>
                        <img
                            alt="Изменить аватар"
                            className="avatar__pencil"
                            src={pencil}
                        />
                    </button>
                    <div className="profile__date">
                        <div className="profile__info">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button
                                onClick={onEditProfile}
                                aria-label="изменить данные пользоватедя"
                                className="profile__edit-button"
                                type="button"
                            ></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>

                <button
                    onClick={onAddPlace}
                    aria-label="добавить новое место"
                    className="profile__add-button"
                    type="button"
                ></button>
            </section>
            <section aria-label="Галерея фотографий" className="groups">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDisLike={onCardDisLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;