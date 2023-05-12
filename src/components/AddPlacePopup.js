import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const nameRef = React.useRef('');
    const linkRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({ 
            cardName: nameRef.current.value,
            cardLink: linkRef.current.value
        });
        nameRef.current.value = '';
        linkRef.current.value = '';
        props.onClose();
      } 

    return (
        <PopupWithForm 
        onSubmit={handleSubmit}
        name='addPlace'
        title='Новое место'
        isOpen={props.isOpen}
        onClose={props.onClose}>
        <input className="popup__text-field popup__text-field_type_title" id="title" type="text" defaultValue=""  name="name" required placeholder="Название" minLength="2" maxLength="30" ref={nameRef} />
        <span className="popup__input-error title-error">.</span>
        <input className="popup__text-field popup__text-field_type_link" id="link" type="url" defaultValue=""  name="link" required placeholder="Ссылка на картинку" ref={linkRef} />
        <span className="popup__input-error link-error">.</span>
    </PopupWithForm>
    )
}

export default AddPlacePopup;