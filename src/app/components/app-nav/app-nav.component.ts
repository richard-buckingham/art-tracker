import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app-nav.component.scss'],
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="Artworks" routerLinkActive="active">Artworks</a>
        <a routerLink="Galleries" routerLinkActive="active">Galleries</a>
      </div>
    </div>
  `
})
export class AppNavComponent {
  constructor() {}
}