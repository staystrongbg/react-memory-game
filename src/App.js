import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import './index.css';

const cardImages = [
  { src: '/img/Helm_of_the_Magi_Reforged.jpg', matched: false },
  { src: '/img/mana.jpg', matched: false },
  { src: '/img/Touph_Ring_Reforged.jpg', matched: false },
  { src: '/img/Magic_Scroll_Reforged.jpg', matched: false },
  { src: '/img/Platinum_Shield_Reforged.jpg', matched: false },
  { src: '/img/sword80.png', matched: false },
  { src: '/img/fantasy-boots.jpg', matched: false },
  { src: '/img/Mithril_Axe_Reforged.jpg', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort((card) => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    console.log('credits to Legendary theNetNinja');
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        console.log('a match');
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceTwo.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      } else {
        console.log('no match');
      }
      setTimeout(() => resetTurns(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  const resetTurns = () => {
    setChoiceTwo(null);
    setChoiceOne(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className='App'>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
