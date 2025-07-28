import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpTabsEnum } from '@store/enums/help-tabs.enum';

@Component({
    selector: 'mi-help',
    templateUrl: './help.component.html',
    styleUrl: './help.component.css',
    standalone: false
})
export class HelpComponent implements OnInit {

  activeTab!: HelpTabsEnum;
  tabsEnum = HelpTabsEnum;

  constructor(private activatedRoute: ActivatedRoute){ }

 ngOnInit(): void {
   this.activatedRoute.queryParamMap.subscribe((queryParam) => {
    const activeTabName: HelpTabsEnum = queryParam.get('tab') as HelpTabsEnum ?? HelpTabsEnum.MY_ACCOUNT;
    this.activeTab = activeTabName;
   });
 }

}
