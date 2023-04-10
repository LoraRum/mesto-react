function PopupWithImage() {
    return (
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
    )
}

export default PopupWithImage;