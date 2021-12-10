import { BehaviorSubject, of, switchMap } from 'rxjs';

class DragService {
  private isDragging$ = new BehaviorSubject(false);
  private isGrid$ = new BehaviorSubject(false);

  getIsDragging() {
    return this.isDragging$.value;
  }

  listenIsDragging() {
    return this.isDragging$.asObservable().pipe(switchMap(item => of(item)));
  }

  defineIsDragging(value: boolean) {
    this.isDragging$.next(value);
  }

  listenIsGrid() {
    return this.isGrid$.asObservable();
  }

  setIsGrid() {
    this.isGrid$.next(!this.isGrid$.value);
  }


}

const dragService = new DragService();

export default dragService;