import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import React, { useState } from 'react';

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }
    return (
        <div className="body">
            <div className="page">
                <Header/>
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                />
                <Footer/>

                {isEditAvatarPopupOpen && (
                    <PopupWithForm
                    title={'Обновить аватар'}
                    name={'popup-change-avatar'}
                    buttonText={'Сохранить'}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={() => setEditAvatarPopupOpen(false)}
                >
                    {[
                        <input
                            className="input input_type_link"
                            id="avatar"
                            placeholder="Введите ссылку на аватар"
                            required
                            type="url"
                        />,
                        <span className="avatar-error popup__input-error"></span>
                    ]}
                </PopupWithForm>
                    )}

                <PopupWithForm
                    title={'Вы уверены?'}
                    name={'popup-delete-card'}
                    buttonText={'Да'}
                >
                    <div>
                        <input
                            className="input input_type_link"
                            id="avatar"
                            name="avatar"
                            placeholder="Введите ссылку на аватар"
                            required
                            type="url"
                        />
                        <span className="avatar-error popup__input-error"></span>
                    </div>
                </PopupWithForm>

                {isEditProfilePopupOpen && (
                    <PopupWithForm
                    title={'Редактировать профиль'}
                    name={'popup-user-profile'}
                    buttonText={'Сохранить'}
                    isOpen={isEditProfilePopupOpen}
                    onClose={() => setEditProfilePopupOpen(false)}
                >
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                </PopupWithForm>
                    )}

                {isAddPlacePopupOpen && (
                    <PopupWithForm
                    title={'Новое место'}
                    name={'popup-new-place'}
                    buttonText={'Создать'}
                    isOpen={isAddPlacePopupOpen}
                    onClose={() => setAddPlacePopupOpen(false)}
                    >
                    <div>
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
                    </div>
                    <div>
                        <input
                            className="input input_type_link"
                            id="link"
                            name="link"
                            placeholder="Ссылка на картинку"
                            required
                            type="url"
                        />
                        <span className="link-error popup__input-error"></span>
                    </div>
                </PopupWithForm>
                    )}

                <PopupWithImage/>

                <template id="card-template">
                    <div className="group card">
                        <img alt="" className="group__image" src="src#"/>
                        <div className="group__box">
                            <h2 className="group__text"></h2>
                            <div className="group__likes">
                                <button aria-label="кнопка лайк" className="group__like" type="button"></button>
                                <span className="group__like-sum">0</span>

                            </div>

                        </div>
                        <button aria-label="кнопка удаления" className="group__remove" type="button"></button>
                    </div>
                </template>
            </div>
        </div>
    );
}


export default App;
