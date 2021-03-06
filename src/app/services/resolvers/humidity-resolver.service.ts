import { Injectable } from '@angular/core';
import { HttpRetrieveService } from '../http-retrieve.service';
import { Resolve } from '@angular/router';
import { httpResponse } from '../../shared/httpResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HumidityResolverService implements Resolve<httpResponse>{

  constructor(private service : HttpRetrieveService) { }

  resolve() : Observable<any> | Promise<any> | any {
    var output = this.service.getHttpResponse("relative-humidity", "2020-01-30");
    console.log("Humidity Resolver: ");
    console.log(output.toPromise());
    return output;
  }
}
