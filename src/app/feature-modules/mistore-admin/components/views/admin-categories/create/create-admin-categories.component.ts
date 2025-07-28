import { Component } from '@angular/core';

@Component({
    selector: 'mi-create-admin-categories',
    templateUrl: './create-admin-categories.component.html',
    styleUrl: './create-admin-categories.component.css',
    standalone: false
})
export class CreateAdminCategoriesComponent {

  categories: CategoriesForm[] = [
    {
      name: ''
    }
  ];

  addCategoryOnForm(): void{
    this.categories = [...this.categories, { name: '' }];
  }

  removeCategoryFrom($index: number): void{
    if(this.categories.length < 2) return;
    this.categories.splice($index,  1);
  }

}

interface CategoriesForm{
  name: string,
}