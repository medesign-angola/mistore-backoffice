import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unsubscriber } from '@shared/component-classes/subcriber/unsubscriber.class';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { LOOKS } from '@store/mocks/looks.mock';
import { LoaderService } from '@core/services/loader/loader.service';
import { LOOKS_LIMT } from '@shared/constants/data-limit.const';
import { LookFacade } from '@store/facades/looks/look.facade';
import { ILook, ILookResponse } from '@store/models/looks.model';
import { catchError, forkJoin, Observable, takeUntil, tap, throwError } from 'rxjs';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';
import { LookStatus } from '@store/enums/look-status.enum';

@Component({
    selector: 'mi-looks',
    templateUrl: './looks.component.html',
    styleUrl: './looks.component.css',
    standalone: false
})
export class LooksComponent
extends Unsubscriber
implements OnInit {
  private lookFacade = inject(LookFacade);
  private activatedRoute = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  
  loaderService = inject(LoaderService);
  pageLoaderIdentifier = PageLoaderIdentifier;

  changeDetectorRef = inject(ChangeDetectorRef);

  searchTerm = signal<string>('');

  selectedLooks: ILook[] = [];
  unselectAllSelectedLooks: boolean = false;

  allLooks: ILook[] = [];
  displayableAllLooks: ILook[] = [];

  draftLooks: ILook[] = [];

  currentPageDraftLooks: number = 1;
  currentPageAllLooks: number = 1;
  currentPagePublishedLooks: number = 1;
  currentPageDeletedLooks: number = 1;

  totalItemsDraftLooks: number = 0;
  totalItemsAllLooks: number = 0;
  totalItemsPublishedLooks: number = 0;
  totalItemsDeletedLooks: number = 0;
  
  draftLooksPages: number[] = [];
  allLooksPages: number[] = [];
  publishedLooksPages: number[] = [];
  deletedLooksPages: number[] = [];

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(query => {
      this.currentPageDraftLooks = parseInt(query.get('draft_page') ?? '1');
      this.currentPageAllLooks = parseInt(query.get('all_looks_page') ?? '1');
      this.currentPagePublishedLooks = parseInt(query.get('published_looks_page') ?? '1');
      this.currentPageDeletedLooks = parseInt(query.get('deleted_looks_page') ?? '1');

      this.getDraftLooks();
      this.getAllLooks();
    });
  }

  private getDraftLooks(): void{
    this.loaderService.setLoadingStatus(PageLoaderIdentifier.LOOKS_ON_DRAFT, true)
    this.lookFacade.looksOnDraft(this.currentPageDraftLooks, 4).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (incoming: ILookResponse) => {
        this.draftLooks = incoming.looks;
        if(this.draftLooks.length > 0){
          this.totalItemsDraftLooks = incoming.total;
          this.loaderService.setLoadingStatus(PageLoaderIdentifier.LOOKS_ON_DRAFT, false);
          this.calculatePagesForDraftLooks();
        } else {
          this.loaderService.loaderActionAfterTryFetching(PageLoaderIdentifier.LOOKS_ON_DRAFT);
        }
      }
    })
  }

  private getAllLooks(): void{
    this.loaderService.setLoadingStatus(PageLoaderIdentifier.LOOKS, true)
    this.lookFacade.looks(this.currentPageAllLooks, LOOKS_LIMT).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (incoming: ILookResponse) => {
        this.allLooks = incoming.looks;
        if(this.allLooks.length > 0){
          this.totalItemsAllLooks = incoming.total;
          this.searchByTerm();
          this.loaderService.setLoadingStatus(PageLoaderIdentifier.LOOKS, false);
          this.calculatePagesForAllLooks();
        } else {
          this.loaderService.loaderActionAfterTryFetching(PageLoaderIdentifier.LOOKS);
        }
      }
    })
  }

  unselectLooks(): void{
    this.unselectAllSelectedLooks = true;
    this.changeDetectorRef.detectChanges();
  }

  parentSelectionHandler(event: { action: 'select' | 'remove', look: ILook }): void{
    this.unselectAllSelectedLooks = false;

    if(event.action === 'select'){
      this.selectedLooks = [ ...this.selectedLooks, event.look ];
    } else {
      const index = this.selectedLooks.findIndex(selectedLook => selectedLook.id === event.look.id );
      if(index !== -1){
        this.selectedLooks.splice(index, 1);
      }
    }
  }

  searchByTerm(): void{
    let filtered = this.allLooks.filter(item => item.name.toLocaleLowerCase().includes(this.searchTerm().toLocaleLowerCase()));
    this.displayableAllLooks = (this.searchTerm().length > 0) ? filtered : this.allLooks; 
  }
  
  private calculatePagesForAllLooks(){
    let pagesCount = 0;
    let remain = this.totalItemsAllLooks % LOOKS_LIMT;

    if(remain === 0){
        pagesCount = Math.floor(this.totalItemsAllLooks / LOOKS_LIMT);

    }else{
        pagesCount = Math.floor(this.totalItemsAllLooks / LOOKS_LIMT) + 1;
    }

    for (let index = 1; index <= pagesCount; index++) {
        let page = this.allLooksPages.find(item => item === index);
        if(!page){
            this.allLooksPages.push(index);
        }else{
            return;
        }
    }

  }
  
  private calculatePagesForDraftLooks(){
    let pagesCount = 0;
    let remain = this.totalItemsDraftLooks % LOOKS_LIMT;

    if(remain === 0){
        pagesCount = Math.floor(this.totalItemsDraftLooks / LOOKS_LIMT);

    }else{
        pagesCount = Math.floor(this.totalItemsDraftLooks / LOOKS_LIMT) + 1;
    }

    for (let index = 1; index <= pagesCount; index++) {
        let page = this.draftLooksPages.find(item => item === index);
        if(!page){
            this.draftLooksPages.push(index);
        }else{
            return;
        }
    }

  }

  emptyDraftList(): void{
    this.lookFacade.emptyDraftList();
    this.alertService.add("Todos os looks em draft foram eliminados com êxito.", LogStatus.SUCCESS);
    this.getDraftLooks();
  }

  deleteLooks(): void{

    if(this.selectedLooks.length === 0) return;

    const deleteRequests = this.selectedLooks.map((look, index) => {
      const deletionAction = (look.status === LookStatus.DRAFT)
                            ? this.lookFacade.removeFromDraft(look.id)
                            : this.lookFacade.deleteLook( this.generateLookJson(look) );

      return deletionAction.pipe(
        tap(() => {
          this.alertService.add(`Look: ${ look.name } foi eliminado com êxito.`, LogStatus.SUCCESS);
          this.selectedLooks[index].status = LookStatus.DELETED;
          this.selectedLooks.splice(index, 1);
          this.unselectLooks();
        }),
        catchError(error => {
          this.alertService.add(`Erro ao eliminar o look: ${look.name}`, LogStatus.ERROR);
          return throwError(() => error);
        })
      );
    });

    forkJoin(deleteRequests).subscribe({
      next: response => {
        this.selectedLooks = [...this.selectedLooks];
      },
      error: error => {
        console.error("Erro ao eliminar look:", error);
      }
    })

  }

  private generateLookJson(look: ILook): any {
      return {
          userid: "1c13d9e3-41a3-47c5-83ae-8785441c878b", // Pode ser dinâmico se necessário
          id: look.id,
          filenameimagePath: look.filenames?.[0] || undefined,
          filenamefeature_image_1: look.filenames?.[1] || undefined,
          filenamefeature_image_2: look.filenames?.[2] || undefined,
          filenamefeature_image_3: look.filenames?.[3] || undefined,
      };
  }

}
