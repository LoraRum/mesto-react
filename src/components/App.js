import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React, {useState} from 'react';

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

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

    return (
        <div className="body">
            <div className="page">
                <Header/>
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                />
                <Footer/>

                <PopupWithForm
                    title={'Обновить аватар'}
                    name={'popup-change-avatar'}
                    buttonText={'Сохранить'}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={() => closeAllPopups(false)}
                >
                    <input
                        className="input input_type_link"
                        id="avatar"
                        placeholder="Введите ссылку на аватар"
                        required
                        type="url"
                    />
                    <span className="avatar-error popup__input-error"></span>
                </PopupWithForm>

                <PopupWithForm
                    title={'Вы уверены?'}
                    name={'popup-delete-card'}
                    buttonText={'Да'}
                >
                </PopupWithForm>

                <PopupWithForm
                    title={'Редактировать профиль'}
                    name={'popup-user-profile'}
                    buttonText={'Сохранить'}
                    isOpen={isEditProfilePopupOpen}
                    onClose={() => closeAllPopups(false)}
                >
                    <input
                        className="input input_type_name"
                        id="username"
                        maxLength="40"
                        minLength="2"
                        name="username"
                        placeholder="Имя"
                        required
                        type="text"
                    />
                    <span className="username-error popup__input-error"></span>

                    <input
                        className="input input_type_about"
                        id="about"
                        maxLength="200"
                        minLength="2"
                        name="about"
                        placeholder="О себе"
                        required
                        type="text"
                    />
                    <span className="about-error popup__input-error"></span>
                </PopupWithForm>

                <PopupWithForm
                    title={'Новое место'}
                    name={'popup-new-place'}
                    buttonText={'Создать'}
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

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>
        </div>
    );
}

export default App;
