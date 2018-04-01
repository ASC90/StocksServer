import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-base-stadistics',
  templateUrl: './base-stadistics.component.html',
  styleUrls: ['./base-stadistics.component.css']
})
export class BaseStadisticsComponent implements OnInit {
  list = [];
  tickerList = [];
  constructor(
    private service: StatisticsService
  ) { }

  ngOnInit() {
    this.service.getGoodTickersJSON().subscribe(res => {
      console.log('json', res);
      for (let index = 0; index < res.length; index++) {
        let ticker = res[index];
        this.service.getDataByTicker(ticker).subscribe(data => {
          this.list.push({ ticker: ticker, data: this.historicMax(data) });
          this.list.sort(function (a, b) { return a.data - b.data });
        });
      } 
    });
  }
  historicMax(data) {
    data.dataset_data.data.reverse();
    let actualPrice = 0;
    let maximusPrice = 0;
    for (let i = 0; i < data.dataset_data.data.length; i++) {
      actualPrice = data.dataset_data.data[i][11];
      if (actualPrice > maximusPrice) {
        maximusPrice = actualPrice;
      }
    }
    return Math.abs(((actualPrice / maximusPrice) * 100) - 100);
  }

}
