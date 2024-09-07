import React from "react";
import "../less/style.less";


const Card = ({heroItem}) => {


    return (
        <div className="main__item">
            <img src={heroItem?.image} alt="" className="main__item-img"/>
            <div className="main__item-content">
                <h2 className="item-content__name">{heroItem?.name}</h2>
                <div className="item-content__status">{heroItem?.status}</div>
                <div className="item-content__subtitle">Last known location:</div>
                {/*<div className="item-content__text">{heroItem.location.name}</div>*/}
                <div className="item-content__btn">Добавить в избранное</div>
            </div>
        </div>
    );
}

export default Card;

