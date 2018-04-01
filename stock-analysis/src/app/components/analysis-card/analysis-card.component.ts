import { Component, OnInit, Input } from '@angular/core';
import { MaterializeDirective } from "angular2-materialize";
import { StatisticsService } from '../../services/statistics.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analysis-card',
  templateUrl: './analysis-card.component.html',
  styleUrls: ['./analysis-card.component.css']
})
export class AnalysisCardComponent implements OnInit {
  data: any;
  ticker: string;

  tickerDetail = {};
  historicalMaxPercent = 0;
  //
  weekDiff = 0;
  monthDiff = 0;
  trimesterDiff = 0;
  halfYearDiff = 0;
  yearDiff = 0;
  // 
  _weekDiff = false;
  _monthDiff = false;
  _trimesterDiff = false;
  _halfYearDiff = false;
  _yearDiff = false;

  constructor(
    private service: StatisticsService,
    private route: ActivatedRoute
  ) { 
    this.ticker = this.route.snapshot.paramMap.get('ticker');
  }

  ngOnInit() {
    this.service.getDataByTicker(this.ticker).subscribe(res => {
      this.data = res;
      console.log('data son', this.data);
      this.data.dataset_data.data.reverse();
      let actualPrice = 0;
      let maximusPrice = 0;
      for (let i = 0; i < this.data.dataset_data.data.length; i++) {
        actualPrice = this.data.dataset_data.data[i][11];
        if (actualPrice > maximusPrice) {
          maximusPrice = actualPrice;
        }
      }
      console.log({ max: maximusPrice, actual: actualPrice });
      this.historicalMaxPercent = Math.abs(((actualPrice / maximusPrice) * 100) - 100);
      // Revaloricación
      const week = this.data.dataset_data.data[(this.data.dataset_data.data.length - 1) - 20][11];
      const month = this.data.dataset_data.data[(this.data.dataset_data.data.length - 1) - 20][11];
      const trimestre = this.data.dataset_data.data[(this.data.dataset_data.data.length - 1) - 60][11];
      const halfYear = this.data.dataset_data.data[(this.data.dataset_data.data.length - 1) - 120][11];
      const year = this.data.dataset_data.data[(this.data.dataset_data.data.length - 1) - 240][11];

      this.weekDiff = ((actualPrice - week) / week) * 100;
      this.weekDiff > 0 ? this._weekDiff = true : this._weekDiff = false;

      this.monthDiff = ((actualPrice - month) / month) * 100;
      this.monthDiff > 0 ? this._monthDiff = true : this._monthDiff = false;

      this.trimesterDiff = ((actualPrice - trimestre) / trimestre) * 100;
      this.trimesterDiff > 0 ? this._trimesterDiff = true : this._trimesterDiff = false;

      this.halfYearDiff = ((actualPrice - halfYear) / halfYear) * 100;
      this.halfYearDiff > 0 ? this._halfYearDiff = true : this._halfYearDiff = false;

      this.yearDiff = ((actualPrice - year) / year) * 100;
      this.yearDiff > 0 ? this._yearDiff = true : this._yearDiff = false;
    });

  }

}
