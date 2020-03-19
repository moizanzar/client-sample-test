import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/interface';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import { debounceTime,distinctUntilChanged,tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit, AfterViewInit  {

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService
  ) { 

  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('startDate') startDate: MatDatepicker<any>;
  @ViewChild('endDate') endDate: MatDatepicker<any>;
  // @ViewChild('input') input: ElementRef;

  filterGroup:FormGroup = new FormGroup({
    search : new FormControl('')
  });

  formatMomentSendToServer: string = 'YYYY-MM-DD';
  displayedColumns: string[] = ['name', 'price', 'Created Date'];
  
  products: Product[] = []
  dataSource = new MatTableDataSource(this.products);
  generalSearch:string = "";

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllProducts();
      }
    });
  }

  getAllProducts(params:any = {}){
    this.apiService.create('product').get(params)
    .subscribe((response)=>{
      if(response.status === 'success'){
        this.dataSource = response.data.data;
        this.paginator.length = response.data.totalRows;
      }
    },(err)=>{
      console.log(err);
    });
  }

  private getQueryParams() {
    let startDate = this.startDate.startAt;
    let endDate = this.endDate.startAt;
    let params: any = {};
    params.sortField = this.sort.active;
    params.sortDirection = this.sort.direction;
    params.limit = (this.paginator.pageIndex + 1) * this.paginator.pageSize;
    params.offset = this.paginator.pageIndex * this.paginator.pageSize;
    if(startDate)
    params.startDate = moment(startDate).format(this.formatMomentSendToServer);
    if(endDate)
    params.endDate = moment(endDate).format(this.formatMomentSendToServer);
    if(this.filterGroup.controls.search.value)
      params.generalSearch = this.filterGroup.controls.search.value;
    return params;
  }

  filter(){
    let params = this.getQueryParams();
    this.getAllProducts(params);
  }

  reset(){
    this.filterGroup.reset();
    this.startDate.select(null);
    this.endDate.select(null);
  }

  ngAfterViewInit():void{
    this.filterGroup.controls.search.valueChanges
    .pipe(
        debounceTime(500),
        distinctUntilChanged()
    ).subscribe(()=>{
      const params = this.getQueryParams();
      this.getAllProducts(params);
    })

  }

  ngOnInit(): void {
    this.getAllProducts();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sort.sortChange.subscribe((value)=>{
      let params: any = this.getQueryParams();
      this.getAllProducts(params);
    })

    this.paginator.page.subscribe((value)=>{
      let params: any = this.getQueryParams();
      this.getAllProducts(params);
    })
  }
}
