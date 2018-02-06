import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatIconModule  } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule,
    MatIconModule, MatListModule ],
  exports: [MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule,
    MatIconModule, MatListModule ],
})
export class MaterialModule { }