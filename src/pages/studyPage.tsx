import React from 'react';
import {
  Button,
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CardStorage from '../repository/cardRepository';
import STUDY_MODE from '../@types/studyMode';

const randomizeCard = (ary: any[]) => {
  const result = ary.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = result[i];
    result[i] = result[r];
    result[r] = tmp;
  }

  return result;
};

const makeDisplayDate = (date: string) => {
  const inputDate = new Date(date);
  return `${inputDate.getFullYear()}/${inputDate.getMonth() + 1}/${inputDate.getDate()}`;
};

type PageProps = {
  history: any,
  location: any,
  match: any,
};

type DisplayObject = {
  point: number,
  card: string,
  date: string,
};

type PageState = {
  mainCard: any[],
  updatePoints: any[],
  isStarted: boolean,
  isFront: boolean,
  cardAmount: number,
  cardKey: number,
  display: DisplayObject,
};

class StudyPage extends React.Component<PageProps, PageState> {
  bindKeyDownAction : any;

  constructor(props: PageProps) {
    super(props);

    this.state = {
      mainCard: [],
      updatePoints: [],
      isStarted: false,
      cardAmount: 0,
      isFront: true,
      cardKey: 0,
      display: {
        point: 0,
        card: 'Please press [S] key to start the study',
        date: '',
      },
    };

    this.bindKeyDownAction = this.keyDownAction.bind(this);
  }

  componentDidMount() {
    window.addEventListener(
      'keydown',
      this.bindKeyDownAction,
      false,
    );
    this.refreshData();
  }

  componentWillUnmount() {
    window.removeEventListener(
      'keydown',
      this.bindKeyDownAction,
      false,
    );
  }

  keyDownAction(e: any) {
    const keyName = e.key;
    if (keyName === 'n') this.flipCard(true);
    else if (keyName === 'b') this.flipCard(false);
    else if (keyName === 's') this.learningStart();
  }

  refreshData() {
    const { params } = this.props.match;

    if (this.props.location.state === undefined) {
      this.props.history.push(
        `/studySetting/${params.groupId}`,
      );
      return;
    }

    const { countCondition, cardAmount, studyMode } = this.props.location.state;

    const allCards = CardStorage.getAllCard(params.groupId);
    const selectedCards = this.selectCardsByMode(allCards, studyMode, countCondition);

    if (selectedCards.length === 0) {
      alert('There are no card in the conditions you select.');
      this.props.history.push(
        `/studySetting/${params.groupId}`,
      );
      return;
    }

    const radomizedCards = randomizeCard(selectedCards);
    const useCards = radomizedCards.slice(0, cardAmount);

    this.initPoints(useCards);

    this.setState({
      mainCard: useCards.slice(),
      cardAmount: useCards.length,
    });
  }

  initPoints(useCards: any[]) {
    const initPoints = [] as any[];

    useCards.forEach((item: any) => {
      initPoints[item.id] = 0;
    });

    this.setState({
      updatePoints: initPoints,
    });
  }

  selectCardsByMode(
    allCards: any[],
    studyMode: string,
    countCondition: number,
  ) : any[] {
    if (studyMode === STUDY_MODE.OVER_POINT) {
      return allCards.filter((item: any) : any => (
        item.point >= countCondition
      ));
    }

    if (studyMode === STUDY_MODE.LESSER_POINT) {
      return allCards.filter((item: any) : any => (
        item.point <= countCondition
      ));
    }

    if (studyMode === STUDY_MODE.PASSED_DATE) {
      return allCards.filter((item: any) : any => (
        (new Date().getTime() - new Date(item.date).getTime()) / 86400000 >= countCondition
      ));
    }

    if (studyMode === STUDY_MODE.WITHIN_DATE) {
      return allCards.filter((item: any) : any => (
        (new Date().getTime() - new Date(item.date).getTime()) / 86400000 <= countCondition
      ));
    }

    return [];
  }

  learningStart() {
    if (this.state.isStarted) {
      return;
    }

    const { mainCard, cardKey } = this.state;

    this.setState({
      isStarted: true,
      isFront: true,
      cardKey: 0,
      display: {
        card: mainCard[cardKey].frontText,
        date: makeDisplayDate(mainCard[cardKey].date),
        point: mainCard[cardKey].point,
      },
    });
  }

  flipCard(isForward: boolean) {
    if (!this.state.isStarted) {
      return;
    }

    const toBe = {
      isFront: false as boolean,
      cardKey: 0 as number,
      display: {
        card: '' as string,
        date: '' as string,
        point: 0 as number,
      },
    };

    if (isForward) {
      if (this.state.isFront) {
        toBe.display.card = this.state.mainCard[this.state.cardKey].backText;
        toBe.isFront = false;
        toBe.cardKey = this.state.cardKey;
      } else {
        toBe.cardKey = this.state.cardKey + 1;
        if (toBe.cardKey >= this.state.mainCard.length) {
          toBe.cardKey = this.state.mainCard.length - 1;
          toBe.display.card = this.state.mainCard[toBe.cardKey].backText;
        } else {
          toBe.isFront = true;
          toBe.display.card = this.state.mainCard[toBe.cardKey].frontText;
        }
      }
    } else if (!this.state.isFront) {
      toBe.display.card = this.state.mainCard[this.state.cardKey].frontText;
      toBe.isFront = true;
      toBe.cardKey = this.state.cardKey;
    } else {
      toBe.cardKey = this.state.cardKey - 1;
      if (toBe.cardKey < 0) {
        toBe.cardKey = 0;
        toBe.display.card = this.state.mainCard[toBe.cardKey].frontText;
      } else {
        toBe.isFront = false;
        toBe.display.card = this.state.mainCard[toBe.cardKey].backText;
      }
    }

    const inputDate = this.state.mainCard[toBe.cardKey].date;
    toBe.display.point = this.state.mainCard[toBe.cardKey].point;

    this.setState({
      isFront: toBe.isFront,
      cardKey: toBe.cardKey,
      display: {
        card: toBe.display.card,
        date: makeDisplayDate(inputDate),
        point: toBe.display.point,
      },
    });
  }

  changePoint(point: number) {
    const { updatePoints, mainCard, cardKey } = this.state;

    updatePoints[mainCard[cardKey].id] += point;
    this.setState({
      updatePoints: updatePoints.slice(),
    });
  }

  finishLearning() {
    const { params } = this.props.match;
    const { updatePoints } = this.state;
    const updateData = [] as any[];

    this.state.mainCard.forEach((item: any) => {
      const toBePoint = item.point + updatePoints[item.id] + 1;
      updateData.push(
        {
          id: item.id,
          toBePoint,
        },
      );
    });

    CardStorage.bulkUpdate(params.groupId, updateData);

    this.setState({
      display: {
        card: 'Finish Learning!',
        date: '',
        point: 0,
      },
    });

    setTimeout(() => this.props.history.push(
      `/studySetting/${params.groupId}`,
    ), 1500);
  }

  render() {
    return (
      <div className="content-width80">
        <div style={{ marginTop: '80px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <div
            style={{
              borderBottom: '1px solid #3f51b5',
              paddingBottom: '4px',
            }}
          >
            <div
              style={{
                marginBottom: '10px',
              }}
            >
              Press [N] or [B] to flip Card
            </div>
            <span>
              {this.state.isFront ? 'F' : 'B'}
              &nbsp;
              {this.state.cardKey + 1}
              /
              {this.state.cardAmount}
            </span>
            <Button
              variant="contained"
              color="primary"
              style={{
                marginLeft: '10px',
              }}
              onClick={() => this.changePoint(-1)}
            >
              Point
              <ArrowDownwardIcon />
            </Button>
            <span
              style={{
                marginLeft: '5px',
              }}
            >
              {this.state.display.point}
              &nbsp;P
            </span>
            <Button
              variant="contained"
              color="primary"
              style={{
                marginLeft: '5px',
              }}
              onClick={() => this.changePoint(1)}
            >
              Point
              <ArrowUpwardIcon />
            </Button>

            <span
              style={{
                marginLeft: '10px',
              }}
            >
              Date:
              {this.state.display.date}
            </span>
            <Button
              variant="contained"
              color="primary"
              style={{
                marginLeft: '50px',
              }}
              onClick={() => this.finishLearning()}
            >
              Finish
            </Button>
          </div>
          <div
            style={{
              fontSize: '35px',
              paddingTop: '70px',
            }}
          >
            {this.state.display.card.split('\n').map((item) => (
              <>
                {item}
                <br />
              </>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default StudyPage;
