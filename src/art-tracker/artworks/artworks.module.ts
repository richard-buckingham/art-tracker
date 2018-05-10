import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// SHARED MODULES
import { SharedModule } from '../shared/shared.module';

// containers
import { ArtworksComponent} from './containers/artworks/artworks.component';
import { ArtworkComponent} from './containers/artwork/artwork.component';

// components
import { ArtworkFormComponent} from './components/artwork-form/artwork-form.component';
import { ArtworkListComponent} from './components/artwork-list/artwork-list.component';


// define routes
export const ROUTES: Routes = [
  { path: '', component: ArtworksComponent },
  { path: 'new', component: ArtworkComponent },
  { path: ':id', component: ArtworkComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule // .forRoot() has already been called in ArtTrackerModule, which is the parent module.
  ],
  declarations: [
    ArtworksComponent,
    ArtworkComponent,
    ArtworkFormComponent,
    ArtworkListComponent
  ]
})
export class ArtworksModule {}