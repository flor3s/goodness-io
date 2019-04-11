import React, { Component } from "react";
import dateFns from "date-fns";
import JournalEntry from "./JournalEntry";

class Calendar extends Component {
  state = {};

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.props.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.props.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.props.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.props.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth } = this.props;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];
    const selected = this.props.selectedDate;

    let days = [];
    let day = startDate;
    let formattedDate = "";

    let dayClass = day => {
      if (dateFns.isSameDay(day, selected)) {
        return "selected";
      } else if (!dateFns.isSameMonth(day, monthStart)) {
        return "disabled";
      } else {
        return "";
      }
    };

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;

        days.push(
          <div
            className={`col cell ${dayClass(cloneDay)}`}
            key={day}
            onClick={() => {
              this.props.onDateClick(dateFns.parse(cloneDay));
            }}
          >
            <span className="number">{formattedDate}</span>
            <JournalEntry
              day={cloneDay}
              showLog={this.props.showLog}
              monthStart={monthStart}
            />
          </div>
        );

        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
