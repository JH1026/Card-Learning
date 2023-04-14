export default class OperateLocalStorage {
  static keyName: string;

  static setStore(key: string, data: any) : void {
    localStorage.setItem(key, String(data));
  }

  static updateStoreByJSON(key: string, data: any) : void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getDataFromJSON(key: string) : any {
    const retData = localStorage.getItem(key);

    if (retData === null) {
      return null;
    }

    return JSON.parse(retData);
  }

  static getNumberFromStore(key: string) : number {
    const retData = localStorage.getItem(key);

    if (retData === null) {
      throw new Error(`localStorage can not get data by ${key}`);
    }
    return parseInt(retData, 10);
  }

  static getNextId(key: string) : number {
    const retData = localStorage.getItem(`${key}_nextId`);
    if (retData === null) {
      throw new Error(`localStorage could not get data by ${key}`);
    }
    return parseInt(retData, 10);
  }

  static getAllDataBySameKey(key: string) : any[] {
    const nextId = this.getNextId(key);

    let keyNumber = 1;
    const retData = [] as any;
    let data = this.getDataFromJSON(`${key}_${keyNumber}`);

    while (keyNumber < nextId) {
      if (data !== null) {
        retData.push(data);
      }
      keyNumber += 1;
      data = this.getDataFromJSON(`${key}_${keyNumber}`);
    }

    return retData;
  }

  static createNextIdIfNotExist(key: string) : void {
    try {
      this.getNumberFromStore(`${key}_nextId`);
    } catch (error) {
      this.createNextId(`${key}`);
    }
  }

  static createNextId(key: string) : void {
    localStorage.setItem(`${key}_nextId`, '1');
  }

  static addStore(key: string, data: any) : void {
    let nextId = this.getNumberFromStore(`${key}_nextId`);

    const setData = {
      ...data,
      id: nextId, // @todo 要リフレッシュ
    };

    localStorage.setItem(`${key}_${nextId}`, JSON.stringify(setData));
    nextId += 1;
    this.setStore(`${key}_nextId`, nextId);
  }

  static deleteStore(key: string) : void {
    localStorage.removeItem(key);
  }
}
