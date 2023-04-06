import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
    return (
        <div className="body">
            <div className="page">
                <Header/>
                <Main/>
                <Footer/>


                <div className="popup" id="popup-change-avatar">
                    <div className="popup__container">
                        <button aria-label="закрыть попап" className="popup__close" type="button"></button>
                        <div className="popup__content">
                            <div className="card card_with-shadow form">
                                <h2 className="form__title">Обновить аватар</h2>
                                <form className="form__form" noValidate>
                                    <fieldset className="form__user-info">
                                        <input className="input input_type_link" id="avatar" name="avatar"
                                               placeholder="Введите ссылку на аватар"
                                               required type="url"/>
                                        <span className="avatar-error popup__input-error"></span>
                                    </fieldset>
                                    <button className="form__save" type="submit">Сохранить</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="popup" id="popup-delete-card">
                    <div className="popup__container">
                        <button aria-label="закрыть попап" className="popup__close" type="button"></button>
                        <div className="popup__content">
                            <div className="card card_with-shadow form">
                                <h2 className="form__title">Вы уверены?</h2>
                                <form className="form__form" id="deleteCardForm" noValidate>
                                    <button className="form__save" type="submit">Да</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="popup" id="popup-user-profile">
                    <div className="popup__container">
                        <button aria-label="закрыть попап" className="popup__close" type="button"></button>
                        <div className="popup__content">
                            <div className="card card_with-shadow form">
                                <h2 className="form__title">Редактировать профиль</h2>
                                <form className="form__form" id="userForm" noValidate>
                                    <fieldset className="form__user-info">
                                        <input className="input input_type_name" id="username" maxLength="40"
                                               minLength="2"
                                               name="username" placeholder="Имя" required type="text"/>
                                        <span className="username-error  popup__input-error"></span>
                                        <input className="input input_type_about" id="about" maxLength="200"
                                               minLength="2"
                                               name="about" placeholder="О себе" required type="text"/>
                                        <span className="about-error popup__input-error"></span>
                                    </fieldset>
                                    <button className="form__save" type="submit">Сохранить</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="popup" id="popup-new-place">
                    <div className="popup__container">
                        <button aria-label="закрыть попап" className="popup__close" type="button"></button>
                        <div className="popup__content">
                            <div className="card card_with-shadow form">
                                <h2 className="form__title">Новое место</h2>
                                <form className="form__form" id="placeForm" noValidate>
                                    <fieldset className="form__user-info">
                                        <input className="input input_type_name" id="place-name" maxLength="30"
                                               minLength="2"
                                               name="name" placeholder="Название" required type="text"/>
                                        <span className="place-name-error popup__input-error"></span>
                                        <input className="input input_type_link" id="link" name="link"
                                               placeholder="Ссылка на картинку"
                                               required type="url"/>
                                        <span className="link-error popup__input-error"></span>
                                    </fieldset>
                                    <button className="form__save" type="submit">Создать</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="popup popup_dark" id="popup-fullscreen">
                    <div className="popup__container">
                        <button aria-label="закрыть попап" className="popup__close" type="button"></button>
                        <div className="popup__content">
                            <figure className="fullscreen-image">
                                <img alt="" className="fullscreen-image__image" src="src#"/>
                                <figcaption className="fullscreen-image__text"></figcaption>
                            </figure>
                        </div>
                    </div>
                </div>

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
