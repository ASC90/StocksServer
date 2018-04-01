import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class StatisticsService {

  constructor(
    private http: HttpClient
  ) { }

  getGoodTickersJSON(): Observable<any> {
    return this.http.get('assets/JSON_files/goodTickers.json');
  }
  getDataByTicker(ticker: string): Observable<any> {
    return this.http.get('assets/JSON_files/' + ticker + '.json');
  }
}
