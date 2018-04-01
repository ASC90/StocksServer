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
      this.service.getDataByTicker('AAPL').subscribe(data => {
        console.log('data', data);
        this.tickerList.push('AAPL');
        this.list.push(data);
        console.log(this.list);
      });
    });
  }

}
