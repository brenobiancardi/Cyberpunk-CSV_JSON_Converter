import { Component, Input, OnInit, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements  OnInit, AfterViewInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() data: any[];
  @Input() columns: string[];

  dataSource: any;
  displayColumns: string[];
  
  @Output() columnsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  
  constructor() { }
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.data = [];
    this.displayColumns = this.columns.slice(0,10);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
