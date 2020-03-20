import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styles: []
})
export class AddProductComponent {
  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder,
    private apiService: ApiService) {
      this.isDataInserted = false;
    this.productForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('')
    })
  }

  productForm: FormGroup;
  isDataInserted:boolean = false;

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const product = this.productForm.value;
    if(this.productForm.valid)
    {
      this.apiService.create('product').post(product).subscribe((response) => {
        if(response.status === 'success'){
          this.dialogRef.close(true);
        }
      },
      (err)=>{
        console.log(err);
      })
    }
    else{
      this.productForm.markAsTouched();
    }
  }
}
