import React, {useState, useEffect} from "react";
import api from "../utils/Api";
import Card from "./Card";
import pencil from "../images/change.svg";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([])

    useEffect(() => {
        api
            .getUserInfo()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((error) => {
                console.log(error);
            });

        api
            .getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                        <img alt="Аватар" className="avatar__image" src={userAvatar}/>
                        <div className="avatar__dark"></div>
                        <img
                            alt="Изменить аватар"
                            className="avatar__pencil"
                            src={pencil}
                        />
                    </button>
                    <div className="profile__date">
                        <div className="profile__info">
                            <h1 className="profile__title">{userName}</h1>
                            <button
                                onClick={onEditProfile}
                                aria-label="изменить данные пользоватедя"
                                className="profile__edit-button"
                                type="button"
                            ></button>
                        </div>
                        <p className="profile__subtitle">{userDescription}</p>
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
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;