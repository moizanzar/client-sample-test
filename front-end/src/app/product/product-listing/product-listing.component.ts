import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/interface';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { debounceTime,distinctUntilChanged,tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements AfterViewInit  {

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService
  ) { 

  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('startDate') startDate: MatDatepicker<any>;
  @ViewChild('endDate') endDate: MatDatepicker<any>;

  filterGroup:FormGroup = new FormGroup({
    search : new FormControl('')
  });

  formatMomentSendToServer: string = 'YYYY-MM-DD';
  displayedColumns: string[] = ['name', 'price', 'Created Date'];
  
  products: Product[] = []
  dataSource = new MatTableDataSource(this.products);
  generalSearch:string = "";

  //modal for add product
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '250px',
    });

    //when modal close and product is added, refresh the record
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllProducts();
      }
    });
  }

  getAllProducts(){
    //get all params
    let params = this.getQueryParams();
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
    if(params.startDate || params.endDate || params.generalSearch)
    {
      delete params.offset;
      delete params.limit;
      this.paginator.pageIndex = 0;
    }

    return params;
  }

  filter(){
    this.getAllProducts();
  }

  reset(){
    this.filterGroup.reset();
    this.startDate.select(null);
    this.endDate.select(null);
  }

  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllProducts();

    //for sorting
    this.sort.sortChange.subscribe((value)=>{
      this.getAllProducts();
    })

    //for pagination
    this.paginator.page.subscribe((value)=>{
      this.getAllProducts();
    })

    //whenever general search type
    this.filterGroup.controls.search.valueChanges
    .pipe(
        debounceTime(500),
        distinctUntilChanged()
    ).subscribe(()=>{
      this.getAllProducts();
    })
  }
}
