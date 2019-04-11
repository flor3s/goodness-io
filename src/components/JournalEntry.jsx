import React, { Component } from "react";
import dateFns from "date-fns";

class JournalEntry extends Component {
  state = {
    mood: "",
    text: "",
    show: false
  };

  closeModal = () => {
    this.setState({ show: false });
  };

  openModal = () => {
    this.setState({ show: true });
  };

  modalClass = () => {
    if (
      dateFns.isSameDay(this.props.day, this.props.showLog) &&
      this.state.show
    ) {
      return "modal display-block";
    } else {
      return "modal display-none";
    }
  };

  buttonClass = day => {
    if (!dateFns.isSameMonth(day, this.props.monthStart)) {
      return "disabled";
    }
  };

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    alert("Updated!");
    this.closeModal();
  };

  handleMoodChange = mood => {
    if (mood === 1) {
      this.setState({ mood: "sentiment_very_satisfied" });
    } else if (mood === 2) {
      this.setState({ mood: "sentiment_satisfied" });
    } else if (mood === 3) {
      this.setState({ mood: "sentiment_dissatisfied" });
    } else if (mood === 4) {
      this.setState({ mood: "sentiment_very_dissatisfied" });
    }
  };

  render() {
    return (
      <>
        <button
          className={`modal-open ${this.buttonClass(this.props.day)}`}
          onClick={() => this.openModal()}
        >
          <span className="icon">{this.state.mood}</span>
        </button>
        <div className={this.modalClass()}>
          <div className="modal-content">
            <div className="close" onClick={() => this.closeModal()}>
              X
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="center-moods">
                <div
                  className="icon mood"
                  onClick={() => this.handleMoodChange(1)}
                >
                  sentiment_very_satisfied
                </div>
                <div
                  className="icon mood"
                  onClick={() => this.handleMoodChange(2)}
                >
                  sentiment_satisfied
                </div>
                <div
                  className="icon mood"
                  onClick={() => this.handleMoodChange(3)}
                >
                  sentiment_dissatisfied
                </div>
                <div
                  className="icon mood"
                  onClick={() => this.handleMoodChange(4)}
                >
                  sentiment_very_dissatisfied
                </div>
              </div>
              <br />
              <label>
                <input
                  type="text"
                  text={this.state.text}
                  onChange={this.handleChange}
                  placeholder="What did you do today?"
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default JournalEntry;
