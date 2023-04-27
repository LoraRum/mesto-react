import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React, { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch((error) => {
                console.log(`Error retrieving data: ${error}`);
            });
    }, []);

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.likeCard(card._id, !isLiked).then((newCard) => {
            setCards((state) =>
                state.map((c) => (c._id === card._id ? newCard : c))
            );
        });
    }

    function handleCardDisLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.dislikeCard(card._id, isLiked).then((newCard) => {
            setCards((state) =>
                state.map((c) => (c._id === card._id ? newCard : c))
            );
        });
    }

    function handleCardDelete(cardId) {
        api.removeCard(cardId)
            .then(() => {
                setCards((cards) =>
                    cards.filter((card) => card._id !== cardId)
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleUpdateUser({ name, about }) {
        api.updateUserInfo({ name, about })
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Error updating user data: ${error}`);
            });
    }

    function handleUpdateAvatar(avatar) {
        api.editAvatar(avatar)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Error updating avatar: ${error}`);
            });
    }

    return (
        <div className="body">
            <div className="page">
                <CurrentUserContext.Provider value={currentUser}>
                    <Header />
                    <Main
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        onCardDisLike={handleCardDisLike}
                    />
                    <Footer />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />

                    <PopupWithForm
                        title={"Вы уверены?"}
                        name={"popup-delete-card"}
                        buttonText={"Да"}
                    ></PopupWithForm>

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />

                    <PopupWithForm
                        title={"Новое место"}
                        name={"popup-new-place"}
                        buttonText={"Создать"}
                        isOpen={isAddPlacePopupOpen}
                        onClose={() => closeAllPopups(false)}
                    >
                        <input
                            className="input input_type_name"
                            id="place-name"
                            maxLength="30"
                            minLength="2"
                            name="name"
                            placeholder="Название"
                            required
                            type="text"
                        />
                        <span className="place-name-error popup__input-error"></span>

                        <input
                            className="input input_type_link"
                            id="link"
                            name="link"
                            placeholder="Ссылка на картинку"
                            required
                            type="url"
                        />
                        <span className="link-error popup__input-error"></span>
                    </PopupWithForm>

                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </CurrentUserContext.Provider>
            </div>
        </div>
    );
}

export default App;
