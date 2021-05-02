import React from 'react';
import {
  Button,
} from '@material-ui/core';
import STUDY_MODE from '../@types/studyMode';
import GroupStorage from '../repository/groupRepository';

type PageProps = {
  history: any,
  match: any,
};

type PageState = {
  groupName: string,
  selectCardAmount: number,
  amountButtons: number[],
  lessPointButtons: number[],
  overPointButtons: number[],
  lessDateButtons: number[],
  overDateButtons: number[],
};

class StudySettingPage extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      groupName: '',
      selectCardAmount: 75,
      amountButtons: [50, 75, 100, 125, 150, 200],
      lessPointButtons: [5, 10, 15],
      overPointButtons: [5, 10, 15],
      lessDateButtons: [5, 15, 30],
      overDateButtons: [5, 15, 30],
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    const { params } = this.props.match;
    const data = GroupStorage.getDataById(params.groupId);

    this.setState({
      groupName: data.groupName,
    });
  }

  changeCardAmount(amount: number) {
    this.setState({ selectCardAmount: amount });
  }

  moveToStudy(mode: string, countCondition = 0 as number) {
    const { params } = this.props.match;
    const { selectCardAmount } = this.state;
    this.props.history.push({
      pathname: `/study/${params.groupId}`,
      state: {
        studyMode: mode,
        cardAmount: selectCardAmount,
        countCondition,
      },
    });
  }

  selectPointMode(point: number, isOver: boolean) {
    this.moveToStudy(
      isOver ? STUDY_MODE.OVER_POINT : STUDY_MODE.LESSER_POINT,
      point,
    );
  }

  selectDateMode(dateCount: number, isPassed: boolean) {
    this.moveToStudy(
      isPassed ? STUDY_MODE.PASSED_DATE : STUDY_MODE.WITHIN_DATE,
      dateCount,
    );
  }

  selectNewOrder() {

  }

  selectRandom() {

  }

  redirectTo(link: string) {
    this.props.history.push(link);
  }

  render() {
    const buttonStyle = {
      width: '180px',
      margin: '4px',
    };

    return (
      <div className="content-width80">
        <div style={{ marginTop: '125px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <h1>{this.state.groupName}</h1>
          <div className="select-mode-area">
            <h2>Number of Cards</h2>
            {this.state.amountButtons.map((item) => (
              <Button
                key={item}
                variant="contained"
                color="primary"
                style={{
                  margin: '4px',
                  color: this.state.selectCardAmount === item ? '#39f' : '#fff',
                  opacity: this.state.selectCardAmount === item ? 0.6 : 1.0,
                }}
                onClick={() => this.changeCardAmount(item)}
              >
                {item}
              </Button>
            ))}

            <h2>Point Condition</h2>
            <div>
              {this.state.lessPointButtons.map((item) => (
                <Button
                  key={item}
                  variant="contained"
                  style={buttonStyle}
                  onClick={() => this.selectPointMode(item, false)}
                >
                  {item}
                  or lower
                </Button>
              ))}
            </div>
            <div>
              {this.state.overPointButtons.map((item) => (
                <Button
                  key={item}
                  variant="contained"
                  style={buttonStyle}
                  onClick={() => this.selectPointMode(item, true)}
                >
                  {item}
                  or higher
                </Button>
              ))}
            </div>
            <h2>Date Condition</h2>
            <div>
              {this.state.lessDateButtons.map((item) => (
                <Button
                  key={item}
                  variant="contained"
                  style={buttonStyle}
                  onClick={() => this.selectDateMode(item, false)}
                >
                  Within
                  {item}
                  days
                </Button>
              ))}
            </div>
            <div>
              {this.state.overDateButtons.map((item) => (
                <Button
                  key={item}
                  variant="contained"
                  style={buttonStyle}
                  onClick={() => this.selectDateMode(item, true)}
                >
                  {item}
                  days passed
                </Button>
              ))}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default StudySettingPage;
