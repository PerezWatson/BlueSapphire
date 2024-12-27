import { Routes } from '@angular/router';
import { BookNowComponent } from './book-now/book-now.component';

export const routes: Routes = [
    {path:'', title:"welcome",component:BookNowComponent },
    {path:'booking',title:"welcome", component:BookNowComponent },
    {path:'**',title:"welcome", component:BookNowComponent },

];
