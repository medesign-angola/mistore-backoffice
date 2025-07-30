import { AfterViewInit, Directive, ElementRef, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[miTailwindClasses]',
  standalone: false
})
export class TailwindClassesDirective implements  AfterViewInit {
  tailwindClasses = input<string[]>(['text-center', 'w-10', 'h-10', 'text-base', 'bg-[#F8F8F8]', 'border', 'border-[#E9E9E9]', 'rounded-lg']);

  constructor(private element: ElementRef, private renderer2: Renderer2) { }
  
  ngAfterViewInit(): void {
    this.tailwindClasses().forEach((classItem: string) => {
      this.renderer2.addClass(this.element.nativeElement, classItem);
    });
  }

}
