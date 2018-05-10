//
// ALL THE DATA ACCESS GOES THROUGH THIS MODULE
//

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Third party modules
import { AngularFireDatabaseModule } from 'angularfire2/database';

// components


// services
import { ArtworksService } from './services/artworks/artworks.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  declarations: [],
  providers: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ArtworksService
      ]
    }
  }

}