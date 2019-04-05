import React, { Component } from "react";
import Calendar from "./components/Calendar";
import dateFns from "date-fns";
import "./App.css";

class App extends Component {
  state = {
    selectedDate: new Date()
  };

  onDateClick = day => {
    console.log(day);
    this.setState({
      selectedDate: day
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">face</span>
            <span>
              <b>goodness</b>.io
            </span>
          </div>
        </header>
        <main>
          <Calendar
            selectedDate={this.state.selectedDate}
            onDateClick={this.onDateClick}
          />
        </main>
      </div>
    );
  }
}

export default App;
