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
    <div>
      {{ artworks$ | async | json }}
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

  ngOnInit() {
    this.artworksSubscription = this.artworksService.artwork$.subscribe();
    this.artworks$ = this.store.select<Artwork[]>('artworks');
  }

  ngOnDestroy() {
    this.artworksSubscription.unsubscribe();
  }
}