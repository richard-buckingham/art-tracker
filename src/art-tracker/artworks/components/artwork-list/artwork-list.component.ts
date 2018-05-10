import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Artwork } from '../../../models/artwork.interface';


@Component({
  selector: 'artwork-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['artwork-list.component.scss'],
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(artwork)">

        <p class="list-item__name">{{artwork.name}}</p>
        <p class="list-item__ingredients">
        <span>
          artwork desc, location, price etc to go in here...
        </span>
      </p>

      </a>

      <div 
        class="list-item__delete"
        *ngIf="toggled">

        <p>Delete item?</p>

        <button 
          class="confirm"
          type="button"
          (click)="removeItem()">
          Yes
        </button>

        <button 
          class="cancel"
          type="button"
          (click)="toggle()">
          No
        </button>

      </div>

      <button 
        class="trash"
        type="button"
        (click)="toggle()">
        <img src="/img/remove.svg">
      </button>
    </div>
  `
})
export class ArtworkListComponent {
  
  toggled: boolean = false;
  
  @Input() artwork: Artwork;
  @Output() remove = new EventEmitter<Artwork>();
  
  constructor() {}

  getRoute(artwork: Artwork): string[] {
    console.log('route = ', [`../artworks`, artwork.$key]);
    return [`../artworks`, artwork.$key];
  }

  toggle(): void {
     this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.artwork);
  }

}