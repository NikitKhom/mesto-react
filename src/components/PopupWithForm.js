function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}  >
            <div className="popup__content">
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} noValidate>
                    <fieldset className="popup__set">
                        {props.children}
                        <button className={`popup__save-button button popup__save-button_type_${props.name}`} type="submit">Сохранить</button>
                    </fieldset>
                </form>
                <button className="popup__close-button button" type="button" onClick={props.onClose}></button> 
            </div>
        </div>
    )
}

export default PopupWithForm;