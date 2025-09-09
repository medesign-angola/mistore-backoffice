import { AfterViewInit, Directive, ElementRef, input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[miStepper]',
    standalone: false
})
export class StepperDirective implements AfterViewInit, OnChanges{
  activeStep = input.required<number>();

  constructor(private element: ElementRef<HTMLElement>, private renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    // console.log(this.element.nativeElement.children)
    // this.gotoStep(this.activeStep())
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.gotoStep(this.activeStep());
  }

  gotoStep(step: number): void{
    const stepContainerCatcher = this.element.nativeElement.children[0] as HTMLElement;
    const target = (stepContainerCatcher.children[step - 1] as HTMLElement).offsetLeft;
    this.element.nativeElement.scrollTo(target, 0);
  }

}