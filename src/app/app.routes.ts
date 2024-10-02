import { Routes } from '@angular/router';
import {TasksComponent} from "./components/tasks/tasks.component";

import {AboutComponent} from "./components/about/about.component";
import {FooterComponent} from "./components/footer/footer.component";

export const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'about', component: AboutComponent },
  { path: 'footer', component: FooterComponent },
];
