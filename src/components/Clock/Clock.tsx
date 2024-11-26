import React from 'react';

type State = {
  today: Date;
};

type Props = {
  clockName: string;
};

export class Clock extends React.Component<Props, State> {
  state: Readonly<State> = {
    today: new Date(),
  };

  todayId = 0;

  consoleId = 0;

  componentDidMount(): void {
    this.todayId = window.setInterval(() => {
      this.setState({ today: new Date() });
    }, 1000);

    this.consoleId = window.setInterval(() => {
      // eslint-disable-next-line no-console
      console.log(this.state.today.toUTCString().slice(-12, -4));
    }, 1000);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const clockNameChanged = prevProps.clockName !== this.props.clockName;

    if (clockNameChanged) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevProps.clockName} to ${this.props.clockName}`,
      );
    }
  }

  componentWillUnmount(): void {
    window.clearInterval(this.todayId);
    window.clearInterval(this.consoleId);
  }

  render() {
    const { today } = this.state;
    const { clockName } = this.props;

    return (
      <div className="Clock">
        <strong className="Clock__name">{clockName}</strong>

        {' time is '}

        <span className="Clock__time">
          {today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
