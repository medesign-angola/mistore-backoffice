import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { LoaderService } from '@core/services/loader/loader.service';
import { LookProductRelationService } from '@shared/services/look-product.service';
import { IProduct } from '@store/models/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LookFacade } from '@store/facades/looks/look.facade';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';

@Component({
    selector: 'mi-create-look',
    templateUrl: './create-look.component.html',
    styleUrl: './create-look.component.css',
    standalone: false
})
export class CreateLookComponent implements OnInit {

  public loaderService = inject(LoaderService);
  public pageLoaderIdentifier = PageLoaderIdentifier;
  public selectedProducts$: Signal<IProduct[]> = computed(() => this.lookProductRelationshipService.selectedProductsToAttachOnNewLook$());

  private lookFacade = inject(LookFacade);
  private lookProductRelationshipService = inject(LookProductRelationService);

  private alertService = inject(AlertService);

  selectedLookImages: any[] = [];

  createLookFormGroup!: FormGroup;

  isCreating = signal(false);

  ngOnInit(): void {
    this.createLookFormGroup = new FormGroup({
      'title': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'description': new FormControl('', [ Validators.required, Validators.maxLength(30) ])
    })
  }

  submit(): void{
    if(this.createLookFormGroup.invalid) return;
    if(!(this.selectedProducts$().length > 0)){
      this.alertService.add("Seleccione os produtos para criar o look", LogStatus.ERROR)
      return;
    };
    if(!(this.selectedLookImages.length > 0)){
      this.alertService.add("Seleccione os produtos para criar o look", LogStatus.ERROR)
      return;
    }

    const look = {
      shop_id: '1c13d9e3-41a3-47c5-83ae-8785441c878b',
      title: this.createLookFormGroup.get('title')?.value,
      description: this.createLookFormGroup.get('description')?.value,
      main_image: (this.selectedLookImages[0]) ? (this.selectedLookImages[0].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      feature_image_1: (this.selectedLookImages[1]) ? (this.selectedLookImages[1].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      feature_image_2: (this.selectedLookImages[2]) ? (this.selectedLookImages[2].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      feature_image_3: (this.selectedLookImages[3]) ? (this.selectedLookImages[3].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : null,
      product_id: this.selectedProducts$().map(product => product.id)
    }

    this.isCreating.set(true);
    this.lookFacade.publish(JSON.stringify(look)).subscribe({
      next: (response) => {
        console.log(response)
        this.alertService.add("Look adicionado com êxito", LogStatus.SUCCESS);
        this.isCreating.set(false);
      },
      error: (error) => {
        this.alertService.add(error, LogStatus.ERROR);
        this.isCreating.set(false);
        console.error(error);
      }
    });

  }

}
