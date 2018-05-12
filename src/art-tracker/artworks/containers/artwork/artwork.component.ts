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

      <div *ngIf="artwork$ | async as artwork; else loading;">
        <artwork-form
          [artwork]="artwork"
          (create)="addArtwork($event)"
          (update)="updateArtwork($event)"
          (remove)="removeArtwork($event)">
        </artwork-form>
        <ng-template #loading>
            <div class="message">
              <img src="/img/loading.svg" >
              Fetching artwork...
            </div>
        </ng-template>
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

  async updateArtwork(event: Artwork) {
    const key: string = this.route.snapshot.params.id;
    await this.artworksService.updateArtwork(key, event);
    this.router.navigate(['artworks']);
  }

  async removeArtwork(event: Artwork) {
    const key: string = this.route.snapshot.params.id;
    await this.artworksService.removeArtwork(key);
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