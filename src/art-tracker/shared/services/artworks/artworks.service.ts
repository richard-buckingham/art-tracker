import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Store } from 'store';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Artwork } from '../../../models/artwork.interface';

@Injectable()
export class ArtworksService {

  // setup an observable stream for artworks'
  // NOTE that this.db.list(`artworks/${this.uid}` is an observable
  artwork$: Observable<Artwork[]> = this.db.list(`artworks/${this.uid}`)
    .do((next: Artwork) => {
      console.log('adding an artwork to the store', next);
      return this.store.set('artworks', next);
    });

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) { }

  get uid(): string {
    return this.authService.currentUser.uid;
  }

  addArtwork(artwork: Artwork) {
    return this.db.list(`artworks/${this.uid}`).push(artwork);
  }

  removeArtwork(key: string) {
    return this.db.list(`artworks/${this.uid}`).remove(key);
  }

  // find the artwork in the store
  getArtwork(key: string) {
    if (!key) {
      return Observable.of({});
      
    }
    return this.store.select<Artwork[]>('artworks')
      .filter(Boolean)
      .map(artworks => artworks.find((artwork: Artwork) => artwork.$key === key));
  }


  // getArtwork(key: string) {
  //   console.log('in getArtwork');
  //   if (!key) {
  //     return Observable.of({});
  //   }
  //   return this.store.select<Artwork[]>('artworks')
  //     .filter(Boolean)
  //     .map((artworks: Artwork[]) => {
  //       console.log('edit an artwork. The artworks array = ', artworks);
  //       return artworks.find((artwork: Artwork) => artwork.$key === key)
  //     });
  // }
}