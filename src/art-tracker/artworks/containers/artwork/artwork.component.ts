import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
          <span>Create Artwork</span>
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
export class ArtworkComponent {

  constructor(
    private router: Router,
    private artworksService: ArtworksService
  ) {}

  async addArtwork(event: Artwork) {
   await this.artworksService.addArtwork(event);
   this.router.navigate(['artworks']);
  }
}