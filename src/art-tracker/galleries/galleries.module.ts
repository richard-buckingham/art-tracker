import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { GalleriesComponent} from './containers/galleries/galleries.component';

// define routes
export const ROUTES: Routes = [
  { path: '', component: GalleriesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    GalleriesComponent
  ]
})
export class GalleriesModule {}