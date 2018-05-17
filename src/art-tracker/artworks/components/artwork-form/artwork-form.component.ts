import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Artwork } from '../../../models/artwork.interface';
import { SelectData } from '../../../models/selectData.interface';

import { locations } from '../../../reference-data/constants';
import { artSeries } from '../../../reference-data/art-series';

@Component({
  selector: 'artwork-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['artwork-form.component.scss'],
  template: `
      <div class="artwork-form">

      <form [formGroup]="form">

      <! -- Series -->
      <div class="artwork-form select">
        <label>
          <h3>Series</h3>
          <select class="form-control" formControlName="series">
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
        <div class="artwork-form single-line-input">
          <label>
            <h3>Code</h3>
            <input type="text" placeholder="e.g. RN18-112" formControlName="code">
          </label>
          <div class="error" *ngIf="validateRequired('code')">
            code is required
          </div>
        </div>
      
        <!-- Description -->  
        <div class="artwork-form single-line-input">
          <label>
            <h3>Description</h3>
            <input type="text" placeholder="please enter description..." formControlName="description">
          </label>
          <div class="error" *ngIf="validateRequired('description')">
            description is required
          </div>
        </div>

        <! -- Location -->
        <div class="artwork-form select">
          <label>
            <h3>Location</h3>
            <select class="form-control" formControlName="location">
              <option *ngFor="let location of locations" 
                [value]="location.value"
                selected="location.default" >
                {{location.description}}
              </option>
            </select>
          </label>
          <div class="error" *ngIf="validateRequired('location')">
            location is required
          </div>
        </div>

        <!-- Description -->

        <!-- Dimensions -->        
        <!-- Wholesale Price -->        
        <!-- Retail Price -->        
        <!-- Date Sold -->        
        <!--  -->        
        <!--  -->        
        <!--  -->        
         

        <div class="artwork-form__submit">
          <div>

            <button type="button" class="button" 
                    *ngIf="!exists" (click)="createArtwork()"
                    [disabled]="!form.valid">
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
      <pre>{{ form.value | json }}</pre>
/*       <pre>{{ locations | json }}</pre>
      <pre>{{ artSeries | json }}</pre> */
    </div>
  `
})
export class ArtworkFormComponent implements OnChanges {

  toggled: boolean = false;
  exists: boolean = false;
  locations: SelectData[] = locations;
  artSeries: SelectData[] = artSeries;

  @Input() artwork: Artwork;
  @Output() create = new EventEmitter<Artwork>();
  @Output() update = new EventEmitter<Artwork>();
  @Output() remove = new EventEmitter<Artwork>();

  form: FormGroup = this.fb.group({
    series: ['series1', Validators.required],    
    location: ['home', Validators.required],
    code: ['', Validators.required],
    description: ['', Validators.required]
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
    return (this.form.get(formControlName).hasError('required') && this.form.get(formControlName).touched);
  }

}