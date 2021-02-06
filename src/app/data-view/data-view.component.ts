import { DataViewService } from './data-view.service';
import { Component, ViewChild, OnDestroy, OnChanges, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements AfterViewInit ,OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscriptionColumns: Subscription;
  subscriptionData: Subscription;

  dataSource: any;
  displayColumns: string[];

  constructor(private dataViewService: DataViewService) {}
  
  ngAfterViewInit(){
    this.subscriptionColumns = this.dataViewService.columnsChanged$.subscribe(
      columns => {
        this.displayColumns = columns.slice(0,10);
      });

    this.subscriptionData = this.dataViewService.dataChanged$.subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy() {
    this.subscriptionData.unsubscribe();
    this.subscriptionColumns.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
