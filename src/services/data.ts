import { BehaviorSubject } from 'rxjs';

interface IData {
  title: string;
  body: string;
  id: number;
  userId: number;
}

class DataService {
  private data = new BehaviorSubject<IData[]>([])
  private startIndex = new BehaviorSubject<number>(0);

  constructor() {
     fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json: IData[]) => this.data.next(json))
  }

  getData() {
    return this.data.asObservable();
  }

  changeItemOfPlace(draggableIndex: number, dropIndex: number) {
    const newData = [...this.data.value];

    newData.splice(dropIndex, 0, newData.splice(draggableIndex, 1)[0])

    this.data.next(newData);

  }

  setStartIndex(index: number) {
    this.startIndex.next(index);
  }

  getStartIndex() {
    return this.startIndex.asObservable();
  }

}

export const dataService = new DataService();