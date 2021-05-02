import React from 'react';
import { Button } from '@material-ui/core';
import GroupStorage from '../repository/groupRepository';
import CardStorage from '../repository/cardRepository';
import { clearStorage, checkInit } from '../repository/setting';

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

  registerData(allData: any[]) {
    allData.forEach((item) => {
      const ret = GroupStorage.addGroup(item.groupName);
      if (!ret.code) {
        alert(ret.message);
        return;
      }
      item.cards.forEach((elm: any) => {
        CardStorage.loadCard(
          ret.groupId,
          elm,
        );
      });
    });
  }

  readJSON(e: any, isReplace: boolean) {
    if (e.target.files.length === 0) {
      return;
    }

    if (isReplace) {
      clearStorage();
      checkInit();
    }

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const readResult = reader.result as string;
      if (readResult === null) {
        return;
      }
      const allData = JSON.parse(readResult);

      this.registerData(allData);

      alert('End data loading.');
      this.props.history.push('/group');
    };

    reader.readAsText(file);
  }

  render() {
    return (
      <div className="content-width80">
        <div style={{ marginTop: '90px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <div>
            <label htmlFor="upload-card-data-1">
              <input
                accept="*.json"
                style={{ display: 'none' }}
                id="upload-card-data-1"
                multiple
                type="file"
                onChange={(e) => this.readJSON(e, true)}
              />
              <Button
                style={{ fontSize: '30px', marginTop: '5px', marginRight: '5px' }}
                variant="contained"
                color="primary"
                component="span"
              >
                Replace Card Data With Existing Data
              </Button>
            </label>
          </div>

          <div>
            <label htmlFor="upload-card-data-2">
              <input
                accept="*.json"
                style={{ display: 'none' }}
                id="upload-card-data-2"
                multiple
                type="file"
                onChange={(e) => this.readJSON(e, false)}
              />
              <Button
                style={{ fontSize: '30px', marginTop: '5px', marginRight: '5px' }}
                variant="contained"
                color="primary"
                component="span"
              >
                Add Card Data To Existing Data
              </Button>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default SavePage;
