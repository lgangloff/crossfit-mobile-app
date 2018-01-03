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
  start:moment.Moment;
  end:moment.Moment;

  allEventsOfTheDay: Event[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public planningService: PlanningServiceProvider) {


    this.planningService.getPlanning(null).subscribe(res=>{

      let allEvents:Event[] =  [].concat.apply([], res.map(eventsource=>{
        eventsource.events.forEach((event)=>{event.color = eventsource.color;});
        return eventsource.events;
      }));
  
      this.allEventsOfTheDay = allEvents
      .filter(event=>{
        return this.currentDate.isSame(event.start, 'day');
      })
      .sort((a:Event,b:Event)=>{
        return a.start.getTime() - b.start.getTime();
      });

      
      if (this.allEventsOfTheDay.length == 0){
        this.allEventsOfTheDay = [];
      }
      
      this.start = moment(this.allEventsOfTheDay[0].start);
      this.end = moment(this.allEventsOfTheDay[this.allEventsOfTheDay.length-1].start);
    })

  }

  findEventAt(eventsource:EventSource, startAt:Date){
    let event = new Event();
    event.title = "Yeah";
    return event;
  }


  getIntervalsOfTheDay():moment.Moment[]{

    if (this.allEventsOfTheDay.length == 0){
      return [];
    }

    let currentMoment = moment(this.start.clone());


    let result:moment.Moment[] = [];
    while(currentMoment.isBefore(this.end.clone())){
      result.push(currentMoment.clone());
      currentMoment.add(1, 'hour');
    }
    return result;
  }

  eventStyle(event: Event){

    let eventTop = moment(event.start).diff(this.start, 'minute');
    let eventHeight = moment(event.end).diff(moment(event.start), 'minute');
    return {
      'top': `${eventTop}px`,
      'height': `${eventHeight}px`,
      'background-color' : `${event.color}`
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
