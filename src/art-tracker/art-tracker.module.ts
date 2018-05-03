import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
  
// lazy loading modules via routes
export const ROUTES: Routes = [
  { path: 'artworks', loadChildren: './artworks/artworks.module#ArtworksModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class ArtTrackerModule {}