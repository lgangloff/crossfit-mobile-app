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
        eventsource.events.forEach(event=>event.color = eventsource.color);
        return eventsource.events;
      }));
  
      this.allEventsOfTheDay = allEvents
      .filter(event=>{
        return this.currentDate.isSame(event.start, 'day');
      })
      .sort((a:Event,b:Event)=>{
        let res = a.start.getTime() - b.start.getTime();
        return res == 0 ? a.title.localeCompare(b.title) : res;
      });

      if (this.allEventsOfTheDay.length == 0){
        this.allEventsOfTheDay = [];
      }
      

      let that = this;
      this.allEventsOfTheDay.forEach(function(item, index) {
        if (index > 0) {
          let prev = that.allEventsOfTheDay[index-1];
          let cur = that.allEventsOfTheDay[index];

          //Le début est sur la période du précédent ?
          if (moment(cur.start).isSame(moment(prev.start)) || moment(cur.start).isBetween(moment(prev.start), moment(prev.end))){
            cur.position = (prev.position ? prev.position : 1 ) + 1;
          }
        }
      });

      this.start = moment.utc(this.allEventsOfTheDay[0].start);
      this.end = moment.utc(this.allEventsOfTheDay[this.allEventsOfTheDay.length-1].start);
    })

  }

  getIntervalsOfTheDay():moment.Moment[]{

    if (this.allEventsOfTheDay.length == 0){
      return [];
    }

    let currentMoment = moment.utc(this.start.clone());


    let result:moment.Moment[] = [];
    while(currentMoment.isSameOrBefore(this.end.clone())){
      result.push(currentMoment.clone());
      currentMoment.add(1, 'hour');
    }

    console.log("getIntervalsOfTheDay => " + result);

    return result;
  }

  eventStyle(event: Event){

    let eventTop = moment(event.start).diff(this.start, 'minute');
    let eventHeight = moment(event.end).diff(moment(event.start), 'minute');
    let width = 100 / event.position;
    let left = 100 / event.position;
    return {
      'top': `${eventTop}px`,
      'height': `${eventHeight}px`,
      'width' : `${width}%`,
      'left' : `${left}%`,
      'background-color' : `${event.color}`
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
