import { Component, Input, OnChanges, OnInit, SimpleChanges, inject, input } from '@angular/core';
import { ShopMetaInterface } from '@core/base-models/base/user.model';
import { User } from '@core/base-models/user/User';
import { AuthenticationService } from '@core/services/auth/authentication.service';
import { UUIDGenerator } from '@core/services/uuid-generator.service';

@Component({
    selector: 'mi-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false
})
export class HeaderComponent implements OnInit, OnChanges {

  authenticated = inject(AuthenticationService);
  appearGreetings = input<boolean>(true);
  user!: Pick<User, 'id' | 'Name' | 'Email' >;
  storeProfile!: Pick<ShopMetaInterface, 'Profile' | 'Cover' >

  ngOnInit(): void {
    this.storeProfile = {
      Profile: this.authenticated.getUserShopProfile(),
      Cover: this.authenticated.getUserShopCover()
    };

    this.user = {
      id: this.authenticated.getUserId(),
      Name: this.authenticated.getUserName(),
      Email: this.authenticated.getUserEmail(),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
