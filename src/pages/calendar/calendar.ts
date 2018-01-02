import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlanningServiceProvider } from '../../providers/planning-service/planning-service';
import { EventSource } from '../../domain/eventsource';
import { Event } from '../../domain/event';

import * as moment from 'moment';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  currentDate = moment();
  eventsources: EventSource[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public planningService: PlanningServiceProvider) {


    this.planningService.getPlanning(null).subscribe(res=>{
      this.eventsources = res;

      console.log(this.eventsources);
    })

  }

  findEventAt(eventsource:EventSource, startAt:Date){
    let event = new Event();
    event.title = "Yeah";
    return event;
  }

  getIntervals():Event[]{
    let result:Event[] =  [].concat.apply([],this.eventsources.map(eventsource=>{
      return eventsource.events;
    }));

    result = result
    .filter(event=>{
      return this.currentDate.isSame(event.start, 'day');
    })
    .sort((a:Event,b:Event)=>{
      return a.start.getTime() - b.start.getTime();
    });
    console.log("getIntervale");
    console.log(result);
    return result;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
