import { Component } from '@angular/core';

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
  constructor() {}

  addArtwork(event: Artwork) {
    console.log('adding an artwork: ', event);
  }
}