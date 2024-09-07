import React from "react";
import "../less/style.less";
import Card from "./Card";


const CardList = ({appState}) => {


    return (
        <>
            {appState.map((heroItem) => (
                <Card key={heroItem?.id} heroItem={heroItem} />
            ))}
        </>

    );
}

export default CardList;

