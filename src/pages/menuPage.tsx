import React from 'react';
import NormalButton from '../components/normalButton';
import GroupStorage from '../repository/groupRepository';
import CardStorage from '../repository/cardRepository';

type PageProps = {
  history: any,
  match: any,
};

type PageState = {
  groupId: number,
  groupName: string,
};

class MenuPage extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      groupId: 0,
      groupName: '',
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    const { params } = this.props.match;
    const data = GroupStorage.getDataById(params.groupId);

    this.setState({
      groupId: params.groupId,
      groupName: data.groupName,
    });
  }

  saveTheseCards() {
    const { groupId, groupName } = this.state;
    const rawAllCards = CardStorage.getAllCard(groupId);

    // fill delete fragmentation
    const saveFiled = [] as any[];
    const allCards = [] as any[];
    let cardKey = 1;
    rawAllCards.forEach((elm: any) => {
      allCards.push({
        id: cardKey,
        frontText: elm.frontText,
        backText: elm.backText,
        point: elm.point,
        date: elm.date,
      });
      cardKey += 1;
    });

    saveFiled.push({
      groupName,
      cards: allCards,
    });

    const content = JSON.stringify(saveFiled);
    const file = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(file);
    a.download = `${groupName}_CardData.json`;
    a.click();
  }

  redirectTo(link: string) {
    this.props.history.push(link);
  }

  render() {
    return (
      <div className="content-width80">
        <div style={{ marginTop: '125px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <h2>{this.state.groupName}</h2>
          <div>
            <NormalButton
              addStyle={{ fontSize: '30px', marginBottom: '25px' }}
              title="Study Mode"
              onClick={() => this.redirectTo(`/studySetting/${this.state.groupId}`)}
            />
          </div>
          <div>
            <NormalButton
              addStyle={{ fontSize: '30px', marginBottom: '25px' }}
              title="Input Mode"
              onClick={() => this.redirectTo(`/input/${this.state.groupId}`)}
            />
          </div>
          <div>
            <NormalButton
              addStyle={{ fontSize: '30px', marginBottom: '25px' }}
              title="Edit Mode"
              onClick={() => this.redirectTo(`/edit/${this.state.groupId}`)}
            />
          </div>
          <div>
            <NormalButton
              addStyle={{ fontSize: '30px' }}
              title="Save Cards"
              onClick={() => this.saveTheseCards()}
            />
          </div>
          <div>
            <NormalButton
              addStyle={{ fontSize: '30px', marginTop: '50px' }}
              title="Group Select"
              onClick={() => this.redirectTo('/group')}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default MenuPage;
