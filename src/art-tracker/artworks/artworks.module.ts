import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { ArtworksComponent} from './containers/artworks/artworks.component';

// SHARED MODULES
import { SharedModule } from '../shared/shared.module';

// define routes
export const ROUTES: Routes = [
  { path: '', component: ArtworksComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule // .forRoot() has already been called in ArtTrackerModule, which is the parent module.
  ],
  declarations: [
    ArtworksComponent
  ]
})
export class ArtworksModule {}