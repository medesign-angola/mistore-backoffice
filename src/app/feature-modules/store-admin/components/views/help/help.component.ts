import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpTabsEnum } from '@store/components/views/help/help-tabs.enum';
import { HelpFacade } from './help.facade';
import { Faq } from './help.models';

@Component({
    selector: 'mi-help',
    templateUrl: './help.component.html',
    styleUrl: './help.component.css',
    standalone: false
})
export class HelpComponent implements OnInit {

  activeTab!: HelpTabsEnum;
  tabsEnum = HelpTabsEnum;

  myAccountContents: WritableSignal<Faq[]> = signal([]);
  requestsContents: WritableSignal<Faq[]> = signal([]);
  paymentsContents: WritableSignal<Faq[]> = signal([]);
  shippingContents: WritableSignal<Faq[]> = signal([]);
  devolutionContents: WritableSignal<Faq[]> = signal([]);
  othersContents: WritableSignal<Faq[]> = signal([]);

  facade = inject(HelpFacade);
  isLoading = signal(false);

  constructor(private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queryParam) => {
      const activeTabName: HelpTabsEnum = queryParam.get('tab') as HelpTabsEnum ?? HelpTabsEnum.MY_ACCOUNT;
      this.activeTab = activeTabName;

      this.getContent(this.activeTab);
    });
  }

  private getContent(tab: HelpTabsEnum): void {
    this.isLoading.set(true);
    this.facade.contentsByTab(tab).subscribe({
      next: contents => {
        switch(tab) {
          case this.tabsEnum.MY_ACCOUNT:
            this.myAccountContents.set(contents);
            break;
          case this.tabsEnum.REQUESTS:
            this.requestsContents.set(contents);
            break;
          case this.tabsEnum.PAYMENTS:
            this.paymentsContents.set(contents);
            break;
          case this.tabsEnum.SHIPPING:
            this.shippingContents.set(contents);
            break;
          case this.tabsEnum.DEVOLUTION:
            this.devolutionContents.set(contents);
            break;
          case this.tabsEnum.OTHERS:
            this.othersContents.set(contents);
            break;
        }
        this.isLoading.set(false);
      }
    });
  }

}
