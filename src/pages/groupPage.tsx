import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useHistory, useLocation } from 'react-router-dom';
import NormalButton from '../components/normalButton';
import GroupStorage, { CardGroup } from '../repository/groupRepository';

const GroupPage = () => {
  const history = useHistory();
  const [cardGroups, setCardGroups] = useState<CardGroup[]>([]);
  const [groupName, setGroupName] = useState<string>();

  useEffect(() => {
    setCardGroups(GroupStorage.getAllGroup());
  }, []);

  const addNewGroup = useCallback(() => {
    if (!groupName) {
      return;
    }

    const ret = GroupStorage.addGroup(groupName);
    if (ret.message) {
      alert(ret.message);
      return;
    }

    setCardGroups([
      ...cardGroups,
      {
        groupId: ret.groupId as number,
        groupName,
      },
    ]);
  }, [groupName, setCardGroups]);

  // redirectTo(link: string) {
  //   this.props.history.push(link);
  // }

  return (
    <div className="content-width80">
      <div style={{ marginTop: '125px' }} />
      <div style={{ maxWidth: '750px', margin: 'auto' }}>
        <h2>Select Card Group</h2>
        {cardGroups.map((item: any) => (
          <NormalButton
            key={item.id}
            addStyle={{ margin: '4px' }}
            title={item.groupName}
            onClick={() => {
              history.push(`/menu/${item.id}`);
            }}
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
          value={groupName}
          onChange={(e) => { setGroupName(e.target.value); }}
        />
        <br />
        <NormalButton
          addStyle={{ marginTop: '4px' }}
          title="Create New Group"
          onClick={addNewGroup}
        />
      </div>
    </div>
  );
};

export default GroupPage;
