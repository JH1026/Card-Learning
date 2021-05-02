import React from 'react';
import TextField from '@material-ui/core/TextField';
import NormalButton from '../components/normalButton';
import GroupStorage from '../repository/groupRepository';

type PageProps = {
  history: any,
  common: any,
};

type CardGroupObject = {
  id: number,
  groupName: string,
};

type PageState = {
  cardGroups: CardGroupObject[],
  groupName: string,

};

class GroupPage extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      cardGroups: [],
      groupName: '',
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    this.setState({
      cardGroups: GroupStorage.getAllGroup(),
    });
  }

  addNewGroup() {
    const { cardGroups, groupName } = this.state;
    const ret = GroupStorage.addGroup(groupName);
    if (!ret.code) {
      alert(ret.message);
      return;
    }

    cardGroups.push({
      id: ret.groupId as number,
      groupName,
    });

    this.setState({
      cardGroups: cardGroups.slice(),
      groupName: '',
    });
  }

  redirectTo(link: string) {
    this.props.history.push(link);
  }

  render() {
    return (
      <div className="content-width80">
        <div style={{ marginTop: '125px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <h2>Select Card Group</h2>
          {this.state.cardGroups.map((item: any) => (
            <NormalButton
              key={item.id}
              addStyle={{ margin: '4px' }}
              title={item.groupName}
              onClick={() => this.redirectTo(`/menu/${item.id}`)}
            />
          ))}

          <div style={{ marginTop: '80px' }} />
          <TextField
            InputLabelProps={
              { style: { color: '#fff' } }
            }
            inputProps={{ style: { color: '#fff' } }}
            style={{ width: '55%', maxWidth: '250px' }}
            label="Input Group Name"
            value={this.state.groupName}
            onChange={(e) => { this.setState({ groupName: e.target.value }); }}
          />
          <br />
          <NormalButton
            addStyle={{ marginTop: '4px' }}
            title="Create New Group"
            onClick={() => this.addNewGroup()}
          />
        </div>
      </div>
    );
  }
}

export default GroupPage;
