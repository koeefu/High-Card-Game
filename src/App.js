import { useState } from "react";
import "./index.css";

const ranks = [
  { mark: 2, score: 2 },
  { mark: 3, score: 3 },
  { mark: 4, score: 4 },
  { mark: 5, score: 5 },
  { mark: 6, score: 6 },
  { mark: 7, score: 7 },
  { mark: 8, score: 8 },
  { mark: 9, score: 9 },
  { mark: 10, score: 10 },
  { mark: "J", score: 11 },
  { mark: "Q", score: 12 },
  { mark: "K", score: 13 },
  { mark: "A", score: 14 },
];
const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];

function createDeck() {
  //create a deck of cards
  const deck = [];
  suits.forEach((suit) =>
    ranks.forEach((rank) => {
      const card = { rank: rank, suit: suit };
      deck.push(card);
    })
  );

  //shuffle cards
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  // console.log(deck);
  return deck;
}

export default function App() {
  const [players, setPlayers] = useState([
    { name: "player 1", card: null, title: "Your Card" },
    { name: "computer", card: null, title: "Computer's Card" },
  ]);
  const [result, setResult] = useState("Let's start the GAMEEE!");

  function handleCards() {
    const newDeck = createDeck();

    const playersNewCard = players.map((player) => ({
      ...player,
      card: newDeck.pop(),
    }));

    setPlayers(playersNewCard);
    // console.log(players);

    const playerScore = playersNewCard[0].card.rank.score;
    const computerScore = playersNewCard[1].card.rank.score;

    const highestScorer = playersNewCard.reduce((highest, player) =>
      player.card.rank.score > highest.card.rank.score ? player : highest
    );

    console.log(highestScorer);

    if (playerScore > computerScore) {
      setResult("You Win!");
    } else if (playerScore < computerScore) {
      setResult("Computer Wins!");
    } else {
      setResult("It's a Draw!");
    }
  }

  return (
    <div className="container">
      <div className="app">
        <h1>High Card Game</h1>

        <div className="cards">
          {players.map((player, i) => (
            <Card key={i} player={player} />
          ))}
        </div>
        <h2>{result}</h2>
        <button onClick={handleCards}>START</button>
      </div>
    </div>
  );
}

function Card({ player }) {
  return (
    <div className="card">
      <h3>{player.title}</h3>
      <div
        className={`card-details ${
          player.card
            ? player.card.suit === "Clubs"
              ? "style-clubs"
              : player.card.suit === "Diamonds"
              ? "style-diamonds"
              : player.card.suit === "Hearts"
              ? "style-hearts"
              : "style-spades"
            : "style-back"
        }`}
      >
        {player.card ? `${player.card.rank.mark}` : "?"}
      </div>
    </div>
  );
}
