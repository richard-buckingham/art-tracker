import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
  
// shared modules
import { SharedModule } from './shared/shared.module';

// auth guard
import { AuthGuard } from '../auth/shared/guards/auth.guard';

// lazy loading modules via routes
export const ROUTES: Routes = [
  { path: 'artworks', canActivate: [AuthGuard], loadChildren: './artworks/artworks.module#ArtworksModule' },
  { path: 'galleries', canActivate: [AuthGuard], loadChildren: './galleries/galleries.module#GalleriesModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})
export class ArtTrackerModule {}