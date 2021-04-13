interface Table {
  // 返回首次出现的元素的位置
  find: Function;
//   findKth: Function;
  insert: Function;
  delete: Function;
  list: Array<any>;
}

class TableStruct implements Table {
  constructor() {
    this.list = [];
  }
    list: any[];

  find(val: any) {
    return this.list.indexOf(val);
  }

  insert() {}

  delete() {}
}
