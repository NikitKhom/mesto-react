import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';



function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({name: '', link: ''});
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleСardClick(card) {
        setSelectedCard({title: card.title, link: card.link});
    }

    return (
    
        <>
            <Header />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleСardClick}/>
            <Footer />
            <PopupWithForm
                name='profile' 
                title='Редактировать профиль' 
                isOpen={isEditProfilePopupOpen} 
                onClose={closeAllPopups}>
                <input className="popup__text-field popup__text-field_type_name" id="name" type="text" defaultValue="" name="name" required placeholder="Имя" minLength="2" maxLength="40"></input>
                <span className="popup__input-error name-error">.</span>
                <input className="popup__text-field popup__text-field_type_job" id="job" type="text" defaultValue="" name="job" required placeholder="Работа" minLength="2" maxLength="200"></input>
                <span className="popup__input-error job-error">.</span>
            </PopupWithForm>
            <PopupWithForm 
                name='addPlace'
                title='Новое место'
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}>
                <input className="popup__text-field popup__text-field_type_title" id="title" type="text" defaultValue="" name="name" required placeholder="Название" minLength="2" maxLength="30"></input>
                <span className="popup__input-error title-error">.</span>
                <input className="popup__text-field popup__text-field_type_link" id="link" type="url" defaultValue="" name="link" required placeholder="Ссылка на картинку"></input>
                <span className="popup__input-error link-error">.</span>
            </PopupWithForm>
            <PopupWithForm 
                name='avatar'
                title='Обновить аватар'
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}>
                        <input className="popup__text-field popup__text-field_type_avatar" id="avatar" type="url" defaultValue="" name="avatar" required placeholder="Ссылка на картинку"></input>
                        <span className="popup__input-error avatar-error">.</span>
            </PopupWithForm>
            <ImagePopup  card={selectedCard} onClose={closeAllPopups}/>
    

        {/* <div className="popup popup_type_confirm">
            <div className="popup__content">
                <h2 className="popup__title  popup__title_type_confirm">Вы уверены?</h2>
                    <button className="popup__save-button button popup__save-button_type_confirm" type="button">Да</button>
                    <button className="popup__close-button button" type="button"></button>
            </div>
        </div> */}

    </>
    );
    }

export default App;
