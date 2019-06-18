import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy,
    ElementRef,
    Output,    
    EventEmitter
  } from '@angular/core';
import { formatLabel } from '../common/label.helper';
  
@Component({
  selector: 'g[ngx-charts-bar-label]',
  template: `  
    <svg:text   
      class="textDataLabel" 
      alignment-baseline="middle"     
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
      [attr.x]="x" 
      [attr.y]="y">
      {{formatedValue}}     
    </svg:text>          

  `,
  styleUrls: ['./bar-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

  export class BarLabelComponent implements OnChanges {
  
    @Input() value;
    @Input() valueFormatting: any;
    @Input() barX;
    @Input() barY; 
    @Input() barWidth;
    @Input() barHeight; 
    @Input() orientation;
    
    @Output() dimensionsChanged: EventEmitter<any> = new EventEmitter();    
     
    element: any;
    x: number;
    y: number;
    horizontalPadding: number = 2;
    verticalPadding: number = 5;
    formatedValue: string;
    transform: string;
    textAnchor: string;    
    
    constructor(element: ElementRef) {
      this.element = element.nativeElement;
    }
    
    ngOnChanges(changes: SimpleChanges): void {      
      this.update();
    }

    getSize(): any {
      const h = this.element.getBoundingClientRect().height;
      const w = this.element.getBoundingClientRect().width;
      return { height: h, width: w, negative: this.value < 0 };            
    }
    
    ngAfterViewInit() {                         
      this.dimensionsChanged.emit(this.getSize());        
    }
    
    update(): void {  
      if (this.valueFormatting) {
        this.formatedValue = this.valueFormatting(this.value);
      } else {
        this.formatedValue = formatLabel(this.value);  
      }
      
      if (this.orientation === 'horizontal') {
          this.x = 10;
          this.y = this.barY + this.barHeight / 2;

      } else {
        this.x = this.barX + (this.barWidth / 2) - 5;
        this.y = this.y - 10;
      }
      
    }  
  }
