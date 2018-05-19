import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Artwork } from '../../../models/artwork.interface';
import { SelectData } from '../../../models/selectData.interface';
import { Location } from '../../../models/location.interface';

import { locations } from '../../../reference-data/locations';
import { artSeries } from '../../../reference-data/art-series';

@Component({
  selector: 'artwork-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['artwork-form.component.scss'],
  template: `
    <div class="artwork-form">

      <form [formGroup]="form">

      <! -- Series -->
      <div class="select">
        <label>
          <h3>Series</h3>
          <select class="form-control" 
                  formControlName="series" >
            <option *ngFor="let item of artSeries" 
              [value]="item.value"
              selected="item.default" >
              {{item.description}}
            </option>
          </select>
        </label>
        <div class="error" *ngIf="validateRequired('series')">
          required field
        </div>
      </div>

      <!-- Code -->  
        <div class="single-line-input">
          <label>
            <h3>Code</h3>
            <input type="text" formControlName="code">
          </label>
          <div class="error" *ngIf="validateRequired('code')">
            code is required
          </div>
        </div>
      
        <!-- Description -->  
        <div class="single-line-input">
          <label>
            <h3>Description</h3>
            <input type="text" formControlName="description">
          </label>
          <div class="error" *ngIf="validateRequired('description')">
            description is required
          </div>
        </div>

        <! -- Location -->
        <div class="select">
          <label>
            <h3>Location</h3>
            <select class="form-control" 
                    formControlName="location"
                    (change)="calculateWholesalePrice()">
              <option *ngFor="let location of locations" 
                [value]="location.code" >
                {{location.name}}
              </option>
            </select>
          </label>
          <div class="error" *ngIf="validateRequired('location')">
            location is required
          </div>
        </div>

        <!-- Dimensions -->
        <div class="single-line-input">
          <label>
            <h3>Dimensions</h3>
            <input type="text" formControlName="dimensions">
          </label>
          <div class="error" *ngIf="validateRequired('dimensions')">
            dimensions are required
          </div>
        </div>

        <!-- Retail Price -->
        <div class="single-line-input">
          <label>
            <h3>Retail Price</h3>
            <input type="number" 
                    class="price" 
                    formControlName="retailPrice"
                    (change)="calculateWholesalePrice()" 
                    (keyup)="calculateWholesalePrice()">

            <span *ngIf="form.get('wholesalePrice').value > 0">
              <h3 class="price">Wholesale</h3>
              <span>{{form.get('wholesalePrice').value | currency:'USD':true:'1.2-2' }}</span>
              <h3 class="price">Commission</h3>
              <span> {{form.get('commission').value | currency:'USD':true:'1.2-2' }} </span>
            </span>

          </label>
          <div class="error" *ngIf="validateRequired('retailPrice')">
            retail price is required
          </div>
    
        </div>

        <!-- Date Sold -->  
        <div class="single-line-input">
        <label>
          <h3>Date Sold</h3>
          <input type="date" 
          formControlName="dateSold"
          class="date">
        </label>
        <div class="error" *ngIf="1 === 2">
          please a valid date sold
        </div>
      </div>      

        <div class="artwork-form__submit">
          <div>

            <button type="button" class="button" 
                    *ngIf="!exists" (click)="createArtwork()"
                    [disabled]="!form.valid" >
              Create Artwork
            </button>

            <button type="button" class="button" *ngIf="exists" (click)="updateArtwork()">
            Save
          </button>

            <a class="button button--cancel" [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <div class="artwork-form__delete" *ngIf="exists">
            <div *ngIf="toggled">

              <p>Delete artwork?</p>

              <button 
                class="confirm" 
                type="button" 
                (click)="removeArtwork()">
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
              class="button button--delete" 
              type="button" 
              (click)="toggle()">
                Delete
            </button>
          </div>
        
        </div>

      </form>
     <pre>Artwork: {{ form.value | json }}</pre>
     <pre>Locations: {{ locations | json }}</pre>
     <pre>artSeries: {{ artSeries | json }}</pre>
    </div>
  `
})
export class ArtworkFormComponent implements OnChanges {

  toggled: boolean = false;
  exists: boolean = false;
  locations: Location[] = locations;
  location: Location;
  artSeries: SelectData[] = artSeries;

  @Input() artwork: Artwork;
  @Output() create = new EventEmitter<Artwork>();
  @Output() update = new EventEmitter<Artwork>();
  @Output() remove = new EventEmitter<Artwork>();

  form: FormGroup = this.fb.group({
    series: ['', Validators.required],    
    location: ['home', Validators.required],
    code: ['', Validators.required],
    description: ['', Validators.required],
    dimensions: ['', Validators.required],
    retailPrice: [, Validators.required],
    wholesalePrice: [, Validators.required],
    commission: [, Validators.required],
    dateSold: ['' ]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  createArtwork() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateArtwork() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeArtwork() {
    this.remove.emit(this.form.value);
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.exists = false;
    if (this.artwork && this.artwork.description) {
      this.exists = true;

      const value = this.artwork;
      this.form.patchValue(value);
    }
  }

  validateRequired(formControlName:string): boolean {
    return (this.form.get(formControlName).hasError('required') 
              && this.form.get(formControlName).touched);
  }

  calculateWholesalePrice(): void {
    const selectedLocationCode: string = this.form.get("location").value;
    if (selectedLocationCode) {
      
      const selectedLocation: Location = this.locations.find(location => location.code === selectedLocationCode);
      const retailPrice: number = this.form.get("retailPrice").value;
      const commission: number = retailPrice * (selectedLocation.commission / 100);
      const wholesalePrice: number = retailPrice - commission;

      this.form.controls['wholesalePrice'].setValue(wholesalePrice);
      this.form.controls['commission'].setValue(commission);
    }
  }

}