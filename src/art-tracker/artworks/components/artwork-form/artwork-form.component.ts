import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Artwork } from '../../../models/artwork.interface';

@Component({
  selector: 'artwork-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['artwork-form.component.scss'],
  template: `
      <div class="artwork-form">

      <form [formGroup]="form">

        <!-- Code -->  
        <div class="artwork-form__code">
          <label>
            <h3>Code</h3>
            <input type="text" placeholder="e.g. RN18-112" formControlName="code">
          </label>
          <div class="error" *ngIf="codeRequired">
            Artwork code is required
          </div>
        </div>
      
        <!-- Name -->  
        <div class="artwork-form__name">
          <label>
            <h3>Name</h3>
            <input type="text" placeholder="please enter name..." formControlName="name">
          </label>
          <div class="error" *ngIf="nameRequired">
            Artwork name is required
          </div>
        </div>

        <div class="artwork-form__submit">
          <div>

            <button type="button" class="button" *ngIf="!exists" (click)="createArtwork()">
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
    </div>
  `
})
export class ArtworkFormComponent implements OnChanges {

  toggled: boolean = false;
  exists: boolean = false;

  @Input() artwork: Artwork;
  @Output() create = new EventEmitter<Artwork>();
  @Output() update = new EventEmitter<Artwork>();
  @Output() remove = new EventEmitter<Artwork>();

  form: FormGroup = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required]
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
    if (this.artwork && this.artwork.name) {
      this.exists = true;

      const value = this.artwork;
      this.form.patchValue(value);

    }
  }

  get codeRequired(): boolean {
    return (this.form.get('code').hasError('required') && this.form.get('code').touched);
  }
  
  get nameRequired(): boolean {
    return (this.form.get('name').hasError('required') && this.form.get('name').touched);
  }


}