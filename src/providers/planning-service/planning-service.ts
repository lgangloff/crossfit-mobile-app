import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventSource } from '../../domain/eventsource';
import { Event } from '../../domain/event';

import { ENV } from '@environment';
/*
  Generated class for the PlanningServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlanningServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PlanningServiceProvider Provider');
  }

  public getPlanning(start:Date){

    let startAt:Date = start ? start : new Date();

    return this.http.get<EventSource[]>(ENV.API_ENDPOINT + "protected/planning",{
      params: {
        view: 'day',
        start: startAt.getFullYear() + "-" + (startAt.getUTCMonth()+1) + "-" + startAt.getDate()
      }
    }).map(eventsources=>{
      eventsources.forEach(eventsource=>{
        eventsource.events.forEach((event:any)=>{
          event.start = this.toUTCDate(new Date(event.start));
          event.end = this.toUTCDate(new Date(event.end));
        })
      })
      return eventsources;
    });
  }


	toUTCDate(d){
		return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 
				d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
	}
}
