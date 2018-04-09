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
  // table
  rows = [];
  columns = { ticker: 'ticker', data: '% from max' };
  // charge
  isDataLoaded = false;
  percentDataLoaded = 0;
  // sort table
  sortMax = 0;
  sortTicker = 0;
  constructor(
    private service: StatisticsService
  ) { }

  ngOnInit() {
    this.service.getGoodTickersJSON().subscribe(res => {
      console.log('json', res);
      for (let index = 0; index < res.length; index++) {
        let ticker = res[index];
        this.service.getDataByTicker(ticker).subscribe(data => {
          this.rows.push({ ticker: ticker, data: this.historicMax(data) });
          this.list.push({ ticker: ticker, data: this.historicMax(data) });
          this.list.sort(function (a, b) { return a.data - b.data });
          this.percentDataLoaded = Math.round((index / (res.length - 1)) * 100);
          if (index == res.length - 1) {
            this.isDataLoaded = true;
          }
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
  sortByMax() {
    this.sortMax++;
    if (this.sortMax > 2) {
      this.sortMax = 0;
    }
    switch (this.sortMax) {
      case 0:

        break;
      case 1:
        this.rows.sort(function (a, b) { return a.data - b.data });
        break;
      case 2:
      this.rows.sort(function (a, b) { return b.data - a.data });
        break;
      default:

        break;
    }
    
  }
  sortByTicker() {
    this.sortTicker++;
    if (this.sortTicker > 2) {
      this.sortTicker = 0;
    }
    switch (this.sortTicker) {
      case 0:

        break;
      case 1:
        this.rows.sort(function (a, b) { return -1 });
        break;
      case 2:
      this.rows.sort(function (a, b) { return 1 });
        break;
      default:

        break;
    }
  }
}
