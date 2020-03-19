import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  exports: [
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class AppMaterialModuleModule { }
