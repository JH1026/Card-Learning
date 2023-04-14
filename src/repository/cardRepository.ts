import OperateLocalStorage from './operateLocalStorage';
import GroupStorage from './groupRepository';

export default class CardStorage extends OperateLocalStorage {
  static keyName = 'card' as string;

  static searchGroupId(groupId: number) : boolean {
    const allGroup = GroupStorage.getAllGroup();
    const searchResult = allGroup.filter((item) => item.groupId === groupId);
    return searchResult.length === 1;
  }

  static loadCard(
    groupId: number,
    data: any,
  ) : void {
    this.addStore(`${this.keyName}_${groupId}`, data);
  }

  static addCard(groupId: number, frontText: string, backText: string) : any {
    if (frontText.length === 0 || backText.length === 0) {
      return {
        message: 'CardTexts need at least one character.',
        code: false,
      };
    }

    if (frontText.length > 200 || backText.length > 200) {
      return {
        message: 'CardTexts are too large.',
        code: false,
      };
    }

    if (!this.searchGroupId(groupId)) {
      return {
        message: 'This Group does not exist.',
        code: false,
      };
    }

    this.addStore(`${this.keyName}_${groupId}`, {
      frontText,
      backText,
      point: 0,
      date: new Date(),
    });

    return {
      message: null,
      code: true,
    };
  }

  static delete(groupId: number, cardId: number) : void {
    this.deleteStore(`${this.keyName}_${groupId}_${cardId}`);
  }

  static update(groupId: number, cardId: number, updData: any) : void {
    const orgData = this.getDataFromJSON(`${this.keyName}_${groupId}_${cardId}`);
    const setData = {
      ...orgData,
      ...updData,
    };
    this.updateStoreByJSON(`${this.keyName}_${groupId}_${cardId}`, setData);
  }

  static bulkUpdate(groupId: number, updateData: any[]) : void {
    updateData.forEach((item) => {
      this.update(groupId, item.id, {
        point: item.toBePoint,
      });
    });
  }

  static getAllCard(groupId: number) : any {
    return this.getAllDataBySameKey(`${this.keyName}_${groupId}`);
  }
}
