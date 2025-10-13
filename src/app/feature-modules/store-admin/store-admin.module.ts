import { NgModule } from '@angular/core';

import { StoreAdminRoutingModule } from '@store/store-admin-routing.module';
import { StoreAdminComponent } from '@store/components/containers/store-admin.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { DashboardComponent } from '@store/components/views/dashboard/dashboard.component';
import { ProductsComponent } from '@store/components/views/products/index/products.component';
import { PromotionsComponent } from '@store/components/views/promotions/promotions.component';
import { FavoritesComponent } from '@store/components/views/favorites/favorites.component';
import { WalletComponent } from '@store/components/views/wallet/wallet.component';
import { MessagesComponent } from '@store/components/views/messages/messages.component';
import { HelpComponent } from '@store/components/views/help/help.component';
import { CreateProductComponent } from '@store/components/views/products/create/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './components/views/help/childrens/my-account/my-account.component';
import { RequestsComponent } from './components/views/help/childrens/requests/requests.component';
import { PaymentsComponent } from './components/views/help/childrens/payments/payments.component';
import { ShippingsComponent } from './components/views/help/childrens/shippings/shippings.component';
import { DevolutionComponent } from './components/views/help/childrens/devolution/devolution.component';
import { OthersComponent } from './components/views/help/childrens/others/others.component';
import { LooksComponent } from './components/views/looks/index/looks.component';
import { CreateLookComponent } from './components/views/looks/create/create-look.component';
import { EditLookComponent } from './components/views/looks/edit/edit-look.component';
import { WrapperComponent } from './components/views/looks/index/wrapper/wrapper.component';
import { QueryParamsPipe } from './pipes/query-params.pipe';
import { EditLookDraftComponent } from './components/views/looks/draft/edit/edit-look-draft.component';
import { SeeLookComponent } from './components/views/looks/see-look/see-look.component';
import { PublishLookDraftComponent } from './components/views/looks/draft/publish/publish-look-draft.component';
import { EditProductComponent } from './components/views/products/edit/edit-product.component';
import { ProfileComponent } from './components/views/profile/profile.component';
import { LogoutFacade } from '@auth/facades/logout.facade';
import { AuthApi } from '@auth/api/api.service';
import { loadDashboardProviders } from './components/views/dashboard/providers';

@NgModule({
  declarations: [
    StoreAdminComponent,
    DashboardComponent,
    ProductsComponent,
    CreateProductComponent,
    PromotionsComponent,
    FavoritesComponent,
    WalletComponent,
    MessagesComponent,
    HelpComponent,
    MyAccountComponent,
    RequestsComponent,
    PaymentsComponent,
    ShippingsComponent,
    DevolutionComponent,
    OthersComponent,
    LooksComponent,
    CreateLookComponent,
    EditLookComponent,
    WrapperComponent,
    QueryParamsPipe,
    EditLookDraftComponent,
    SeeLookComponent,
    PublishLookDraftComponent,
    EditProductComponent,
    ProfileComponent,
  ],
  providers: [
    AuthApi,
    LogoutFacade,
    loadDashboardProviders(),
  ],
  imports: [
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    StoreAdminRoutingModule
  ]
})
export class StoreAdminModule { }
