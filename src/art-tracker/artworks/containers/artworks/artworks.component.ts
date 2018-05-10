import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable} from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';

import { ArtworksService } from '../../../shared/services/artworks/artworks.service';
import { Artwork } from '../../../models/artwork.interface';

import { Store } from 'store';


@Component({
  selector: 'artworks',
  styleUrls: ['artworks.component.scss'],
  template: `
    <div class="artworks">

      <!-- Title -->
      <div class="artworks__title">

        <h1>Artworks</h1>

        <a
          class="btn__add"
          [routerLink]="['../artworks/new']" >
          <img src="/img/add-white.svg">   
          New Artwork      
        </a>
           
      </div>

      <!-- List the artworks -->
      <div *ngIf="artworks$ | async as artworks; else loading;">
        <div class="message" *ngIf="!artworks.length" >
        <img src="/img/face.svg">   
          No artworks, add a new artwork to start...
        </div>

        <!-- Artworks will be rendered below this line -->
        <artwork-list
          *ngFor="let artwork of artworks"
          [artwork]="artwork"
          (remove)="remove($event)" >
        </artwork-list>

      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg">
          Fetching artworks...
        </div>
      </ng-template>

    </div>
  `
})
export class ArtworksComponent implements OnInit, OnDestroy{
  
  artworks$: Observable<Artwork[]>;
  artworksSubscription: Subscription;
  
  constructor(
    private artworksService: ArtworksService,
    private store: Store) {
  }

  remove(event: Artwork) {
    console.log('removing the following artwork', event);
    this.artworksService.removeArtwork(event.$key);
  }

  ngOnInit() {
    this.artworksSubscription = this.artworksService.artwork$.subscribe();
    this.artworks$ = this.store.select<Artwork[]>('artworks');
  }

  ngOnDestroy() {
    this.artworksSubscription.unsubscribe();
  }
}