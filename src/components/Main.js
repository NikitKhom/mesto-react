import loadingIcon from '../images/loading_icon.svg';
import React from 'react';
import api from '../utils/api';
import Card from './Card';


function Main(props) {

    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);
    
    React.useEffect(() => {
        const apiInfo = api.getUserInfo();
        const apiCards = api.getCards();
        Promise.all([apiInfo, apiCards])
	    .then(values => {
            const info = values[0];
            setUserName(info.name);
            setUserDescription(info.about);
            setUserAvatar(info.avatar);
            const usersCards = values[1].map((card) => {
                return {title: card.name, link: card.link, likes: card.likes.length}
            })
            setCards(usersCards);
	    })
	    .catch(err => console.log(err));
    }, [])
    

    return (
        <main>
          <section className="profile">
              <div className="profile__avatar">
                  <img className="profile__image" src={userAvatar ? userAvatar : loadingIcon} alt="фото профиля"></img>
                  <button className="profile__overlay button" onClick={props.onEditAvatar}></button>
              </div>
              <div className="profile__info">
                  <h1 className="profile__name">{userName}</h1>
                  <button className="profile__edit-button button" type="button" onClick={props.onEditProfile}></button>
                  <p className="profile__personal-info">{userDescription}</p>
              </div>
              <button className="profile__add-button button" type="button" onClick={props.onAddPlace}></button>
          </section>
          <section className="cards">
            {cards.map((card, id) => <Card key={id} card={card} onCardClick={props.onCardClick}/>)}
          </section>
      </main>
    )
}

export default Main;