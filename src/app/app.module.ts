import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from '@templates/auth/auth.component';
import { StoreAdminComponent } from '@templates/store-admin/store-admin.component';
import { MistoreAdminComponent } from '@templates/mistore-admin/mistore-admin.component';
import { CoreModule } from '@core/core.module';
import { provideNgxMask } from 'ngx-mask';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    StoreAdminComponent,
    MistoreAdminComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
