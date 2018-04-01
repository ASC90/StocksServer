import { Component, OnInit, Input } from '@angular/core';
import { MaterializeDirective } from "angular2-materialize";

@Component({
  selector: 'app-analysis-card',
  templateUrl: './analysis-card.component.html',
  styleUrls: ['./analysis-card.component.css']
})
export class AnalysisCardComponent implements OnInit {
  @Input() data: any;
  @Input() ticker: string;
  constructor() { }

  ngOnInit() {
    console.log('data son', this.data);
  }

}
