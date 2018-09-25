import React, { Component } from "react"

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { searchText: "", placeHolder: "Tapez votre films ..." }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control input-lg"
            onChange={this.handleChange.bind(this)}
            placheholder={this.state.placeHolder}
          />
        </div>
      </div>
    )
  }
  handleChange(event) {
    this.setState({ searchText: event.target.value })
  }
}

export default SearchBar
