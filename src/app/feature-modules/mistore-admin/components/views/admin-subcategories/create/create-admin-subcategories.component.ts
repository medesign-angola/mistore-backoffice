import { Component } from '@angular/core';
import { IProductCategory } from '@core/base-models/base/product-category.model';

@Component({
    selector: 'mi-create-admin-subcategories',
    templateUrl: './create-admin-subcategories.component.html',
    styleUrl: './create-admin-subcategories.component.css',
    standalone: false
})
export class CreateAdminSubcategoriesComponent {
  subcategories: SubcategoriesForm[] = [
    {
      name: '',
      parent: { id: '', name: '' }
    }
  ];
  categories: IProductCategory[] = [
    {
      id: '2345-dgg',
      name: 'Roupa'
    },
    {
      id: 'sdomfd2345',
      name: 'Calçado'
    }
  ];

  selectedCategoryEventHandler($event: any[], $index: number){
    this.subcategories[$index].parent = $event[0]
  }

  addSubcategoryOnForm(): void{
    this.subcategories = [...this.subcategories, { name: '', parent: { id: '', name: '' } }];
  }

  removesubcategoryFrom($index: number): void{
    if(this.subcategories.length < 2) return;
    this.subcategories.splice($index,  1);
  }

}

interface SubcategoriesForm{
  name: string,
  parent: IProductCategory
}