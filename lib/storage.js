class Storage {
  constructor(storageId, dataObj, tableId, formContainerId) {
    // Pass storageId to save json string data after each operation in localStorage
    // local storageId is important to retrieve old saved data
    this.globalArr;
    this.tableId = tableId;
    this.formContainerId = formContainerId;
    this.storageId = storageId;
    this.createStorage(dataObj)
  }

  createStorage() { }
  readStorage() { }
  updateStorage() { }
  deleteStorage() { }

  checkLocalStorageChange(alertMessage) {
    let event = new StorageEvent("storage", {
      key: this.storageId,
      oldValue: this.getLocalStorage(),
      newValue: this.getLocalStorage(),
    })
    if (window.dispatchEvent(event)) {
      console.log(alertMessage);
    }
  }


  getLocalStorage() {
    return JSON.parse(localStorage.getItem(this.storageId));
  }

  setLocalStorage(globalArr) {
    localStorage.setItem(this.storageId, JSON.stringify(globalArr));
  }

  // create methods to perform operations like save/edit/delete/add data
  createStorage(dataObj) {
    // this.getLocalStorage(this.storageId) != null ? this.globalArr = this.getLocalStorage(this.storageId) : this.globalArr = []
    this.globalArr = this.getLocalStorage(this.storageId) || null
    // this.checkLocalStorageChange("DATA CALLED SUCCESSFULLY !");
    this.globalArr.push(dataObj);
    this.setLocalStorage(this.globalArr);
    this.checkLocalStorageChange("DATA SUBMITTED SUCCESSFULLY !");
    let table = new Table(this.storageId, this.tableId, this.formContainerId);
  }
}