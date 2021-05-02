import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GroupStorage from '../repository/groupRepository';
import CardStorage from '../repository/cardRepository';

type PageProps = {
  history: any,
  match: any,
};

type AddedCardType = {
  frontText: string,
  backText: string,
};

type PageState = {
  groupName: string,
  selectGroupId: number,
  frontText: string,
  backText: string,
  addedCards: AddedCardType[],
};

class InputPage extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      groupName: '',
      selectGroupId: 0,
      frontText: '',
      backText: '',
      addedCards: [],
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
      selectGroupId: parseInt(params.groupId, 10),
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

  addCard() {
    const {
      addedCards,
      selectGroupId,
      frontText,
      backText,
    } = this.state;

    const ret = CardStorage.addCard(selectGroupId, frontText, backText);
    if (!ret.code) {
      alert(ret.message);
      return;
    }
    addedCards.push({ frontText, backText });
    this.setState({
      addedCards: addedCards.slice(),
      frontText: '',
      backText: '',
    });
  }

  render() {
    return (
      <div className="content-width80">
        <div style={{ marginTop: '125px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <h2>{this.state.groupName}</h2>
          <h2>Input Data</h2>
          <div>
            <div>
              <TextField
                label="InputFrontCard"
                InputLabelProps={{ style: { color: '#fff' } }}
                multiline
                rows={10}
                style={{ width: '49%' }}
                inputProps={{ style: { border: '1px solid #fff', color: '#fff' } }}
                onChange={(e) => this.chengeFrontText(e)}
                value={this.state.frontText}
              />
              <TextField
                label="InputBackCard"
                InputLabelProps={{ style: { color: '#fff' } }}
                multiline
                rows={10}
                style={{ width: '49%' }}
                inputProps={{ style: { border: '1px solid #fff', color: '#fff' } }}
                onChange={(e) => this.chengeBackText(e)}
                value={this.state.backText}
              />
            </div>
            <Button
              style={{ marginTop: '5px' }}
              variant="contained"
              color="primary"
              onClick={() => this.addCard()}
            >
              Add Card
            </Button>
          </div>
          <h1>Added Cards</h1>
          <div>
            {this.state.addedCards.map((item) => (
              <Card
                style={{
                  margin: '4px',
                  width: '97%',
                }}
                key={item.frontText}
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

export default InputPage;
