import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ArtworksService } from '../../../shared/services/artworks/artworks.service';
import { Artwork } from '../../../models/artwork.interface';

@Component({
  selector: 'artwork',
  styleUrls: ['artwork.component.scss'],
  template: `
    <div class="artwork">
      
      <div class="artwork__title">
        <h1>
          <img src="/img/food.svg" >
          <span *ngIf="artwork$ | async as artwork; else title;">
          {{ artwork.name ? 'Edit' : 'Create' }} artwork
          </span>
          <ng-template #title>
            Loading...
          </ng-template>
        </h1>
      </div>

      <div>
        <artwork-form
          (create)="addArtwork($event)">
        </artwork-form>
      </div>
    
    </div>
  `
})
export class ArtworkComponent implements OnInit, OnDestroy {

  artwork$: Observable<Artwork>;
  subscription: Subscription;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artworksService: ArtworksService
  ) {}

  async addArtwork(event: Artwork) {
   await this.artworksService.addArtwork(event);
   this.router.navigate(['artworks']);
  }

  ngOnInit() {
    this.subscription = this.artworksService.artwork$.subscribe();
    this.artwork$ = this.route.params
      .switchMap(param => {
        return this.artworksService.getArtwork(param.id)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}