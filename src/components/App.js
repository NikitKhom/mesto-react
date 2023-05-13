import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../context/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: '', _id: ''});
    const [cards, setCards] = React.useState([]);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userInfo, userCards]) => {
            setCurrentUser(userInfo); 
            setCards(userCards);
        })
        .catch(err => console.log(err));
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(err));
    } 

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(res => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch(err => console.log(err));
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card)
        .then(newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch(err => console.log(err));
    }

    function handleUpdateUser(info) {
        api.changeUserInfo({userName: info.name, userInfo: info.about})
        .then(info => {
            setCurrentUser(info);
            closeAllPopups();
        })
        .catch(err => console.log(err));
        
    }

    function handleUpdateAvatar(avatar) {
        api.setUserAvatar(avatar)
        .then(info => {
            setCurrentUser(info);
            closeAllPopups();
        })
        .catch(err => console.log(err));
    }

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
    
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleСardClick} 
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            setCards={setCards}
            />
            <Footer />

            <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}/>

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}/>

            <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}/>

            <ImagePopup  card={selectedCard} onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>
    );
}

export default App;
