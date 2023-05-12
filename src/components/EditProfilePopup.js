import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]); 

    function handleNameChange(e) {
        setName(e.target.value);
    } 

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    } 

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name='profile' 
            title='Редактировать профиль' 
            isOpen={props.isOpen} 
            onClose={props.onClose}>
            <input className="popup__text-field popup__text-field_type_name" id="name" type="text" defaultValue={name} name="name" required placeholder="Имя" minLength="2" maxLength="40" onChange={handleNameChange} />
            <span className="popup__input-error name-error">.</span>
            <input className="popup__text-field popup__text-field_type_job" id="job" type="text" defaultValue={description} name="job" required placeholder="Работа" minLength="2" maxLength="200" onChange={handleDescriptionChange}/>
            <span className="popup__input-error job-error">.</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;