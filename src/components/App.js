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
import AddPlacePopup from "./AddPlacePopup";

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
        api.likeCard(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleCardDisLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.dislikeCard(card._id, isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((error) => {
                console.log(error);
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

    function handleAddPlaceSubmit({ name, link }) {
        api.addCard({ name, link })
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Error adding a new place: ${error}`);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
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

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />

                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
