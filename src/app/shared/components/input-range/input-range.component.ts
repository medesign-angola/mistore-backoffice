import { AfterViewInit, Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'mi-input-range',
    template: `
    <div class="slider-container" #container (click)="onSliderClick($event)">
      <div
        class="slider-thumb"
        #thumb
        (mousedown)="onMouseDown($event)"
        (keydown)="onKeyDown($event)"
        [style.left.%]="value"
      ></div>
    </div>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputRangeComponent),
            multi: true
        }
    ],
    styles: `
    .slider-container {
      width: 100%;
      height: 6px;
      background-color: #F4F4F4;
      position: relative;
      border-radius: 0px;
    }

    .slider-thumb {
      width: 20px;
      height: 20px;
      background-color: black;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  `,
    standalone: false
})
export class InputRangeComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;

  value = 0; // 0 a 100
  isDragging = false;

  private onChange = (val: number) => {};
  private onTouched = () => {};

  ngAfterViewInit(): void {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  writeValue(value: number): void {
    this.value = value ?? 0;
  }

  private setValue(val: number) {
    const newVal = Math.max(0, Math.min(100, Math.round(val)));
    this.value = newVal;
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Adicione lógica se quiser suporte a desabilitado
  }

  onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    this.isDragging = true;
    this.onTouched();
  };

  onMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;

    const container = this.containerRef.nativeElement;
    const rect = container.getBoundingClientRect();
    let x = event.clientX - rect.left;

    x = Math.max(0, Math.min(x, container.offsetWidth));
    const percent = Math.round((x / container.offsetWidth) * 100);
    this.value = percent;
    this.onChange(this.value);
  };

  onMouseUp = () => {
    this.isDragging = false;
  };

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      this.setValue(this.value + 1);
      event.preventDefault();
    }
  
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      this.setValue(this.value - 1);
      event.preventDefault();
    }
  }

  onSliderClick(event: MouseEvent) {
    const container = this.containerRef.nativeElement;
    const rect = container.getBoundingClientRect();
    let x = event.clientX - rect.left;

    x = Math.max(0, Math.min(x, container.offsetWidth));
    const percent = Math.round((x / container.offsetWidth) * 100);
    this.value = percent;
    this.onChange(this.value);
    this.onTouched();
  }
}
