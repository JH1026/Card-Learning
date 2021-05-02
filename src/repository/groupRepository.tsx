import OperateLocalStorage from './operateLocalStorage';

export default class GroupStorage extends OperateLocalStorage {
  static keyName = 'cardGroup' as string;

  static getAllGroup() : any[] {
    return this.getAllDataBySameKey(this.keyName);
  }

  static searchGroupName(groupName: string) : boolean {
    const allGroup = this.getAllGroup();
    const searchResult = allGroup.filter((item) => item.groupName === groupName);

    return searchResult.length === 0;
  }

  static addGroup(groupName: string) : any {
    if (groupName.length === 0) {
      return {
        message: 'Enter at least one character',
        code: false,
      };
    }

    if (!this.searchGroupName(groupName)) {
      return {
        message: 'This Group Name already exist.',
        code: false,
      };
    }

    const nextId = this.getNextId(this.keyName);
    this.addStore(this.keyName, {
      groupName,
    });

    this.createNextId(`card_${nextId}`);

    return {
      message: null,
      code: true,
      groupId: nextId,
    };
  }

  static getDataById(groupId: number) : any {
    return this.getDataFromJSON(`${this.keyName}_${groupId}`);
  }
}
