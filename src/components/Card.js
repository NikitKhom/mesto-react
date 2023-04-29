function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
      }  

    return(
            <div className="cards__card">
                <button className="cards__delete-button button" type="button"></button>
                <img className="cards__image" src={props.card.link} alt={props.card.title} onClick={handleClick}></img>
                <div className="cards__stuff">
                    <h2 className="cards__title">{props.card.title}</h2>
                    <div className="cards__group">
                        <button className="cards__like-button button" type="button"></button>
                        <p className="cards__like-count">{props.card.likes}</p>
                    </div>
                </div>
            </div>
    )
}

export default Card;