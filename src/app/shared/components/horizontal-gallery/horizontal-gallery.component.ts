import { Component, Input, signal } from '@angular/core';

@Component({
    selector: 'mi-horizontal-gallery',
    templateUrl: './horizontal-gallery.component.html',
    styleUrl: './horizontal-gallery.component.css',
    standalone: false
})
export class HorizontalGalleryComponent {
  @Input({ required: true }) images: string[] = [];
  activeImageIndex = signal(0);

  changeImage(index: number): void{
    this.activeImageIndex.set(index);
  }
}
