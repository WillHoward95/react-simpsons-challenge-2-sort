import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";
import Inputs from "./components/Inputs";

class App extends Component {
  state = { quoteSearch: "", characterSearch: "" };

  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
    );

    //fixed the api data to have unique id
    data.forEach((element, index) => {
      element.id = index + Math.random();
    });

    this.setState({ simpsons: data });
  }

  onLikeToggle = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];
    //invert if liked or not liked
    simpsons[indexOf].liked = !simpsons[indexOf].liked;
    this.setState({ simpsons });
  };

  onDelete = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];
    simpsons.splice(indexOf, 1);
    this.setState({ simpsons });
  };

  onQuoteSearch = (e) => {
    this.setState({ quoteSearch: e.target.value });
  };

  onCharacterSearch = (e) => {
    this.setState({ characterSearch: e.target.value });
  };

  render() {
    const { simpsons, quoteSearch, characterSearch } = this.state;

    if (!simpsons) return <Loading />;

    if (simpsons.length === 0) return <p>You deleted everything!</p>;

    //calculate the total
    let total = 0;
    simpsons.forEach((char) => {
      if (char.liked) total++;
    });

    let filteredList = [...simpsons];

    if (quoteSearch) {
      filteredList = simpsons.filter((item) => {
        if (item.quote.toLowerCase().includes(quoteSearch.toLowerCase())) {
          return true;
        }
      });
    }

    if (characterSearch) {
      filteredList = simpsons.filter((item) => {
        if (
          item.character.toLowerCase().includes(characterSearch.toLowerCase())
        ) {
          return true;
        }
      });
    }

    return (
      <>
        <h1>Total no of liked chars #{total}</h1>
        <Inputs
          simpsons={simpsons}
          onQuoteSearch={this.onQuoteSearch}
          onCharacterSearch={this.onCharacterSearch}
        />

        <Simpsons
          simpsons={filteredList}
          onDelete={this.onDelete}
          onLikeToggle={this.onLikeToggle}
        />
      </>
    );
  }
}

export default App;
