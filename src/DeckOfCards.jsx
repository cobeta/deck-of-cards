import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card.jsx";

function DeckOfCards() {
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);
    const [drawButtonDisabled, setDrawButtonDisabled] = useState(false);
    const [shuffleButtonDisabled, setShuffleButtonDisabled] = useState(false);


    useEffect(() => {
        async function fetchDeck() {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            setDeckId(res.data.deck_id);
        }
        fetchDeck();
    }, []);

    const drawCard = () => {
        (async () => {
            const res = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);

            if (res.data.cards[0])
                setCards(prevCards => [...prevCards, res.data.cards[0]]);
            else {
                setDrawButtonDisabled(true);
                setCards([]);
            }
        }) ();
        
    };

    const shuffleDeck = () => {
        (async () => {
            setShuffleButtonDisabled(true);
            await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
            setShuffleButtonDisabled(false);
            setDrawButtonDisabled(false);
            setCards([]);
        }) ();
        
    };

    
    if (!deckId) 
        return (
            <div>
                Loading ...
            </div>
    );
    else 
        return (
            <div>
                <div className="header">
                    <h1>Deck of Cards</h1>
                    <div className="buttons">
                        <button onClick={drawCard} disabled={drawButtonDisabled}>Get next card</button>
                        <button onClick={shuffleDeck} disabled={shuffleButtonDisabled}>Suffle Deck</button>
                    </div>
                    
                
                </div>
                      
                <div style={{ marginTop: "20px" }}>
                    {cards.map(card => (
                        <Card
                            key={card.code}
                            src={card.image}
                            alt={`${card.value} of ${card.suit}`}
                            style={{ marginRight: "10px", height: "150px" }}
                        />
                    ))}
                </div>
            </div>
        );
}

export default DeckOfCards;