import { Component } from '@angular/core'

@Component({
    selector: 'mi-create-brand',
    templateUrl: './create-brand.component.html',
    styleUrl: './create-brand.component.css',
    standalone: false
})
export class CreateBrandComponent {
  logo: any;
  logoPreviewUrl: any;

  coverImage: any;
  coverImagePreviewUrl: any;
  
}
