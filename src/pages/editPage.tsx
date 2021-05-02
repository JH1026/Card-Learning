import React from 'react';
import { Button, TextField } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GroupStorage from '../repository/groupRepository';
import CardStorage from '../repository/cardRepository';

type PageProps = {
  history: any,
  match: any,
};

type PageState = {
  groupName: string,
  selectGroupId: number,
  selectCardId: number,
  frontText: string,
  backText: string,
  point: number,
  allCards: any[],
  searchedCards: any[],
};

class EditPage extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    const { params } = this.props.match;

    this.state = {
      groupName: '',
      selectGroupId: params.groupId,
      selectCardId: 0,
      frontText: '',
      backText: '',
      point: 0,
      allCards: [],
      searchedCards: [],
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    const { params } = this.props.match;
    const getCards = CardStorage.getAllCard(params.groupId);
    const data = GroupStorage.getDataById(params.groupId);

    this.setState({
      groupName: data.groupName,
      allCards: getCards.slice(),
      searchedCards: getCards.slice(),
    });
  }

  selectCard(cardId: number) {
    const { allCards } = this.state;
    const card = allCards.find((item) => item.id === cardId);
    this.setState({
      selectCardId: card.id,
      frontText: card.frontText,
      backText: card.backText,
      point: card.point,
    });
  }

  chengeFrontText(e: any) {
    this.setState({
      frontText: e.target.value,
    });
  }

  chengeBackText(e: any) {
    this.setState({
      backText: e.target.value,
    });
  }

  updateCard() {
    if (this.state.selectCardId === 0) {
      return;
    }
    const {
      selectGroupId,
      selectCardId,
      frontText,
      backText,
      point,
    } = this.state;

    CardStorage.update(
      selectGroupId,
      selectCardId,
      {
        frontText,
        backText,
        point,
      },
    );

    this.refreshData();
  }

  deleteCard() {
    if (this.state.selectCardId === 0) {
      return;
    }

    if (!confirm("Do you really want to delete this Card?")) {
      return;
    }

    const {
      selectGroupId,
      selectCardId,
    } = this.state;

    CardStorage.delete(
      selectGroupId,
      selectCardId,
    );

    this.refreshData();
  }

  changePoint(cPoint: number) {
    const { point } = this.state;

    this.setState({
      point: point + cPoint,
    });
  }

  searchCards(e: any) {
    const { allCards } = this.state;
    const word = e.target.value;
    const found = allCards.filter((item) => (
      item.frontText.indexOf(word) !== -1 || item.backText.indexOf(word) !== -1
    ));

    this.setState({
      searchedCards: found.slice(),
    });
  }

  render() {
    return (
      <div className="content-width80">
        <div style={{ marginTop: '90px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <div
            style={{
              paddingBottom: 4,
              width: '100%',
              background: '#000',
            }}
          >
            <h2>{this.state.groupName}</h2>
            <h2>Edit Data</h2>
            <div>
              <div>
                <TextField
                  label="InputFrontCard"
                  InputLabelProps={{ style: { color: '#fff' } }}
                  multiline
                  rows={6}
                  style={{ width: '49%' }}
                  inputProps={{ style: { border: '1px solid #fff', color: '#fff' } }}
                  onChange={(e) => this.chengeFrontText(e)}
                  value={this.state.frontText}
                />
                <TextField
                  label="InputBackCard"
                  InputLabelProps={{ style: { color: '#fff' } }}
                  multiline
                  rows={6}
                  style={{ width: '49%' }}
                  inputProps={{ style: { border: '1px solid #fff', color: '#fff' } }}
                  onChange={(e) => this.chengeBackText(e)}
                  value={this.state.backText}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: '3px',
                  marginRight: '2px',
                }}
                onClick={() => this.changePoint(-1)}
              >
                Point
                <ArrowDownwardIcon />
              </Button>
              <span>
                {this.state.point}
                &nbsp;P
              </span>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: '3px',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
                onClick={() => this.changePoint(1)}
              >
                Point
                <ArrowUpwardIcon />
              </Button>
              <Button
                style={{ marginTop: '5px', marginRight: '5px' }}
                variant="contained"
                color="primary"
                onClick={() => this.updateCard()}
              >
                Update Card
              </Button>
              <Button
                style={{ marginTop: '5px' }}
                variant="contained"
                color="secondary"
                onClick={() => this.deleteCard()}
              >
                Delete Card
              </Button>
            </div>
            <div>
              <div
                style={{
                  marginTop: '11px',
                  marginRight: '20px',
                  fontSize: '27px',
                  float: 'left',
                }}
              >
                All Cards
              </div>
              <TextField
                InputLabelProps={
                  { style: { color: '#fff' } }
                }
                inputProps={{ style: { color: '#fff' } }}
                style={{ width: '55%', maxWidth: '250px' }}
                label="Search"
                onChange={(e) => this.searchCards(e)}
              />
            </div>
          </div>
          <div
            style={{
              height: '50vh',
              overflow: 'auto',
            }}
          >
            {this.state.searchedCards.map((item) => (
              <Card
                style={{
                  margin: '4px',
                  width: '97%',
                }}
                key={item.id}
                onClick={() => this.selectCard(item.id)}
              >
                <CardContent
                  style={{
                    borderBottom: '1px solid #00f',
                  }}
                >
                  <Typography variant="body2" component="p">
                    {item.frontText}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="body2" component="p">
                    {item.backText}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default EditPage;
