import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { ArtworksComponent} from './containers/artworks/artworks.component';

// define routes
export const ROUTES: Routes = [
  { path: '', component: ArtworksComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ArtworksComponent
  ]
})
export class ArtworksModule {}