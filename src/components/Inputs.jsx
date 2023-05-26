import React, { Component } from "react";

class Inputs extends Component {
  render() {
    return (
      <>
        <p>
          Search by quote:{" "}
          <input
            type="text"
            name="search"
            id="search"
            onInput={this.props.onQuoteSearch}
          />
        </p>

        <p>
          Search by character name:{" "}
          <input
            type="text"
            name="search"
            id="search"
            onInput={this.props.onCharacterSearch}
          />
        </p>
      </>
    );
  }
}

export default Inputs;
