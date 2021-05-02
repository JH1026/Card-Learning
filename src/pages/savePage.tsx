import React from 'react';
import { Button } from '@material-ui/core';
import GroupStorage from '../repository/groupRepository';
import CardStorage from '../repository/cardRepository';

type PageProps = {
  history: any,
  match: any,
};

type PageState = {
};

class SavePage extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
  }

  saveAllCard() {
    const allGroups = GroupStorage.getAllGroup();
    const saveAllData = [] as any[];
    allGroups.forEach((item) => {
      const rawAllCards = CardStorage.getAllCard(item.id);

      // fill delete fragmentation
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

      saveAllData.push({
        groupName: item.groupName,
        cards: allCards,
      });
    });

    const content = JSON.stringify(saveAllData);
    const file = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(file);
    a.download = 'allCardData.json';
    a.click();
  }

  render() {
    return (
      <div className="content-width80">
        <div style={{ marginTop: '90px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <Button
            style={{ fontSize: '30px', marginTop: '5px', marginRight: '5px' }}
            variant="contained"
            color="primary"
            onClick={() => this.saveAllCard()}
          >
            Save All Card
          </Button>
        </div>
      </div>
    );
  }
}

export default SavePage;
