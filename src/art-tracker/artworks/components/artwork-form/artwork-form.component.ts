import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Artwork } from '../../../models/artwork.interface';

@Component({
  selector: 'artwork-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['artwork-form.component.scss'],
  template: `
    <div class="artwork-form">
      
      <form [formGroup]="form">

        <div class="artwork-form__name">
          <label>
            <h3>Name</h3>
            <input
              type="text"
              placeholder="please enter name..."
              formControlName="name" >
            <div class="error" *ngIf="nameRequired">
              Artwork name is required
            </div>
          </label>
        </div>

        <div class="artwork-form__submit">
          <div>

            <button
              type="button"
              class="button"
              (click)="createArtwork()">
              Create Artwork
            </button>

            <a
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>

          </div>
        </div>


      </form>
      <pre>{{ form.value | json }}</pre>
    </div>
  `
})
export class ArtworkFormComponent {
  
  @Output() create = new EventEmitter<Artwork>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) {}

  get nameRequired(): boolean {
    return (this.form.get('name').hasError('required') && this.form.get('name').touched);
  }

  createArtwork() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }




}