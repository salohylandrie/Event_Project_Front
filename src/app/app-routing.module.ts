import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { routes } from './app.routes'; // Importez les routes depuis app.routes.ts

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterLink],
  exports: [RouterModule]
})
export class AppRoutingModule {}
