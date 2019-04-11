import React, { Component } from "react";
import Calendar from "./components/Calendar";
import dateFns from "date-fns";
import "./App.css";

class App extends Component {
  state = {
    selectedDate: new Date(),
    currentMonth: new Date(),
    showLog: null
  };

  onDateClick = day => {
    console.log("hmm");
    this.setState({
      showLog: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
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
            currentMonth={this.state.currentMonth}
            onDateClick={this.onDateClick}
            showLog={this.state.showLog}
            nextMonth={this.nextMonth}
            prevMonth={this.prevMonth}
          />
        </main>
      </div>
    );
  }
}

export default App;
