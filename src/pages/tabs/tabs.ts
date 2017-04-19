import { Component } from '@angular/core';

import { Perfil } from '../perfil/perfil';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab3Root = Perfil;

  constructor() {

  }
}
