import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StatisticsService } from './services/statistics.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BaseStadisticsComponent } from './components/base-stadistics/base-stadistics.component';
import { AnalysisCardComponent } from './components/analysis-card/analysis-card.component';


const appRoutes: Routes = [
  { path: 'statistics', component:  BaseStadisticsComponent},
  {
    path: '',
    redirectTo: '/statistics',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BaseStadisticsComponent,
    AnalysisCardComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ StatisticsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
