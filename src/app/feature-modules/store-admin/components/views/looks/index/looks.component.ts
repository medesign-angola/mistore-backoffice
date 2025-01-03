import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unsubscriber } from '@shared/component-classes/subcriber/unsubscriber.class';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { LOOKS } from '@core/mocks/looks.mock';
import { LoaderService } from '@core/services/loader/loader.service';
import { LOOKS_LIMT } from '@shared/constants/data-limit.const';
import { LookFacade } from '@store/facades/look.facade';
import { ILook, ILookResponse } from '@store/models/looks.model';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mi-looks',
  templateUrl: './looks.component.html',
  styleUrl: './looks.component.css'
})
export class LooksComponent
extends Unsubscriber
implements OnInit {
  private lookFacade = inject(LookFacade);
  private activatedRoute = inject(ActivatedRoute);
  
  loaderService = inject(LoaderService);
  pageLoaderIdentifier = PageLoaderIdentifier;

  searchTerm = signal<string>('');

  looks: ILook[] = [];
  displayableLooks: ILook[] = [];
  currentPage: number = 1;
  totalItems: number = 0;
  
  pages: number[] = [];
  selectedItems: string[] = [];
  
  placeholderCount: number = 8;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(query => {
      this.currentPage = parseInt(query.get('page') ?? '1');

      this.loaderService.setLoadingStatus(PageLoaderIdentifier.LOOKS, true)
      this.lookFacade.looks(this.currentPage, LOOKS_LIMT).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (incoming: ILookResponse) => {
          this.looks = incoming.looks;
          if(this.looks.length > 0){
            this.totalItems = incoming.total;
            this.searchByTerm();
            this.loaderService.setLoadingStatus(PageLoaderIdentifier.LOOKS, false);
            this.calculatePages();
          } else {
            this.loaderService.loaderActionAfterTryFetching(PageLoaderIdentifier.LOOKS);
          }
        }
      })
    });
  }

  searchByTerm(): void{
    let filtered = this.looks.filter(item => item.name.toLocaleLowerCase().includes(this.searchTerm().toLocaleLowerCase()));
    this.displayableLooks = (this.searchTerm().length > 0) ? filtered : this.looks; 
  }

  calculatePages(){
    let pagesCount = 0;
    let remain = this.totalItems % LOOKS_LIMT;

    if(remain === 0){
        pagesCount = Math.floor(this.totalItems / LOOKS_LIMT);

    }else{
        pagesCount = Math.floor(this.totalItems / LOOKS_LIMT) + 1;
    }

    for (let index = 1; index <= pagesCount; index++) {
        let page = this.pages.find(item => item === index);
        if(!page){
            this.pages.push(index);
        }else{
            return;
        }
    }

  }

  generatePlaceholders(): number[]{
      return Array.from({ length: this.placeholderCount });
  }

}
