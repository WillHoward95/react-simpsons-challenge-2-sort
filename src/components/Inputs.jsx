import React, { Component } from "react";

class Inputs extends Component {
  render() {
    return (
      <>
        <p>
          Search by quote or character:{" "}
          <input
            type="text"
            name="search"
            id="search"
            onInput={this.props.onSearch}
          />
        </p>
      </>
    );
  }
}

export default Inputs;
