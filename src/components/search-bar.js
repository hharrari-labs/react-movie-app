import React, { Component } from "react"

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { searchText: "", placeHolder: "Tapez votre films ..." }
  }
  render() {
    return (
      <div>
        <input
          onChange={this.handleChange.bind(this)}
          placheholder={this.state.placeHolder}
        />
      </div>
    )
  }
  handleChange(event) {
    this.setState({ searchText: event.target.value })
  }
}

export default SearchBar
