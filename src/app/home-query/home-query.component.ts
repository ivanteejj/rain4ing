import { Component, Input, OnInit } from '@angular/core';
import { HttpRetrieveService } from '../services/http-retrieve.service';
import { HttpManipulateService } from '../services/http-manipulate.service'
import { StationsService } from '../services/stations.service'
import { httpResponse } from '../shared/httpResponse';
import { item } from '../shared/item';
import { reading } from '../shared/reading';
import { Station } from '../shared/station';
import { ActivatedRoute } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-home-query',
  templateUrl: './home-query.component.html',
  styleUrls: ['./home-query.component.scss']
})
export class HomeQueryComponent implements OnInit {
  tempHttpRes : httpResponse;
  tempReading : reading;

  rainfallHttpRes : httpResponse;
  rainfallReading : reading;

  humidityHttpRes : httpResponse;
  humidityReading : reading;

  stations : Station[];
  selectedStation : Station;

  @Input()
  selectedStationID : string;

  constructor(
    private actRoute : ActivatedRoute,
    private stationService : StationsService,
    private httpMan : HttpManipulateService
    ) { }

  ngOnInit() {
    this.stations = this.stationService.getStations();
    this.selectedStation = this.stations.filter(data => data.id === this.selectedStationID)[0]

    this.actRoute.data.subscribe(
      data => {
        this.tempHttpRes = {
          'api_info' : data.tempHttpRes.api_info,
          'items' : data.tempHttpRes.items,
          'metadata' : data.tempHttpRes.metadata
        }

        this.rainfallHttpRes = {
          'api_info' : data.rainfallHttpRes.api_info,
          'items' : data.rainfallHttpRes.items,
          'metadata' : data.rainfallHttpRes.metadata
        }
        
        this.humidityHttpRes = {
          'api_info' : data.humidityHttpRes.api_info,
          'items' : data.humidityHttpRes.items,
          'metadata' : data.humidityHttpRes.metadata
        }
      }
    )

    this.tempReading = this.httpMan.getLatestReadingFromHttpRes(this.tempHttpRes, this.selectedStation);
    console.log(this.tempReading)

    this.rainfallReading = this.httpMan.getLatestReadingFromHttpRes(this.rainfallHttpRes, this.selectedStation);
    console.log(this.rainfallReading)

    this.humidityReading = this.httpMan.getLatestReadingFromHttpRes(this.humidityHttpRes, this.selectedStation);
    console.log(this.humidityReading)

  }

  
  ngOnChanges() {
    this.selectedStation = this.stations.filter(data => data.id === this.selectedStationID)[0]
    this.tempReading = this.httpMan.getLatestReadingFromHttpRes(this.tempHttpRes, this.selectedStation);
    this.rainfallReading = this.httpMan.getLatestReadingFromHttpRes(this.rainfallHttpRes, this.selectedStation);
    this.humidityReading = this.httpMan.getLatestReadingFromHttpRes(this.humidityHttpRes, this.selectedStation);

    console.log(this.selectedStationID);
  }
}