import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HorizontalBarChart } from '@shared/interfaces/hz-bar-chart.interface';

@Component({
    selector: 'hz-bar',
    templateUrl: './hz-bar.component.html',
    styleUrl: './hz-bar.component.css',
    standalone: false
})
export class HzBarComponent implements OnInit, OnChanges {
  @Input() chartData!: HorizontalBarChart;

  chartHeight = 256; // Altura do gráfico em pixels
  maxValue: number = 0;
  minValue: number = 0;
  scaleY: number = 0;
  yAxisIntervals: string[] = [];

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.calculateMinMaxValues();
    this.calculateScaleY();
    this.calculateYAxisIntervals();
  }
  
  calculateMinMaxValues(): void {
    const allData = this.chartData.series.reduce((acc: string | any[], series: { data: any; }) => acc.concat(series.data), []);
    this.maxValue = Math.max(...allData);
    this.minValue = Math.min(...allData);
  }

  calculateScaleY(): void {
    const valueRange = this.maxValue - this.minValue;
    this.scaleY = valueRange > 0 ? this.chartHeight / valueRange : 1;
  }

  calculateYAxisIntervals(): void {
    const intervalMagnitude = Math.pow(10, Math.floor(Math.log10(this.maxValue))); // Determina a magnitude do intervalo
    const maxIntervalCount = 5; // Número de intervalos desejado
    const intervalStep = Math.ceil(this.maxValue / maxIntervalCount); // Calcula o intervalo entre os intervalos
    this.yAxisIntervals = Array.from({ length: maxIntervalCount + 1 }, (_, index) => this.formatValue(index * intervalStep)).reverse(); // Inverte a ordem dos intervalos
  }

  calculateBarHeight(value: number): number {
    return value * this.scaleY;
  }

  formatValue(value: number): string {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(0) + 'B';
    
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(0) + 'M';
    
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'K';
    
    } else {
      return value.toFixed(0);
    
    }
  }

  getPercentage(value: number): number{
    return (value * 100) / this.maxValue;
  }

}
