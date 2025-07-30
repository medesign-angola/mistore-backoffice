import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from './components/ui/icon/icon.component';
import { ReplaceByPipe } from './pipes/number/replace-by.pipe';
import { SvgComponent } from './components/ui/svg/svg.component';
import { DataFormatPipe } from './pipes/number/data-format.pipe';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { WidgetComponent } from './components/widget/widget.component';
import { SelectComponent } from './components/select/select.component';
import { HeaderComponent } from './components/header/header.component';
import { HzBarComponent } from './components/charts/hz-bar/hz-bar.component';
import { VtBarComponent } from './components/charts/vt-bar/vt-bar.component';
import { AdsComponent } from './components/ads/ads.component';
import { TableComponent } from './components/table/table.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { DropzoneComponent } from './components/dropzone/dropzone.component';
import { ModalComponent } from './components/modal/modal.component';
import { AlertComponent } from './components/alert/alert.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LookComponent } from './components/cards/look/look.component';
import { HorizontalGalleryComponent } from './components/horizontal-gallery/horizontal-gallery.component';
import { InputRangeComponent } from './components/input-range/input-range.component';
import { ProductsTableComponent } from './components/products/products-table/products-table.component';
import { OtpInputComponent } from './components/otp-input/otp-input.component';
import { TailwindClassesDirective } from './components/otp-input/tailwind-classes.directive';

@NgModule({
  declarations: [
    SidebarMenuComponent,
    HeaderComponent,
    HzBarComponent,
    VtBarComponent,
    AdsComponent,
    TableComponent,
    WidgetComponent,
    SelectComponent,
    IconComponent,
    ReplaceByPipe,
    SvgComponent,
    DataFormatPipe,
    DragAndDropDirective,
    FooterComponent,
    DropzoneComponent,
    ModalComponent,
    AlertComponent,
    SpinnerComponent,
    LookComponent,
    HorizontalGalleryComponent,
    InputRangeComponent,
    ProductsTableComponent,
    OtpInputComponent,
    TailwindClassesDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SidebarMenuComponent,
    HeaderComponent,
    FooterComponent,
    HzBarComponent,
    VtBarComponent,
    AdsComponent,
    TableComponent,
    WidgetComponent,
    SelectComponent,
    RouterModule,
    IconComponent,
    SvgComponent,
    ReplaceByPipe,
    DataFormatPipe,
    DropzoneComponent,
    ModalComponent,
    AlertComponent,
    SpinnerComponent,
    InputRangeComponent,
    LookComponent,
    HorizontalGalleryComponent,
    OtpInputComponent
  ],
})
export class SharedModule { }
