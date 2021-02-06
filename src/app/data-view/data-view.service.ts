import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataViewService {
  private columnsSource = new Subject<string[]>();
  private dataSource = new Subject<any>();

  columnsChanged$ = this.columnsSource.asObservable();
  dataChanged$ = this.dataSource.asObservable();

  alterData(data: any) {
    this.dataSource.next(data);
  }

  alterColumns(columns: string[]) {
    this.columnsSource.next(columns);
  }
}
