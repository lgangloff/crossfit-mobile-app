import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CalendarPage } from '../calendar/calendar';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CalendarPage;
  tab3Root = AccountPage;

  constructor() {

  }
}
