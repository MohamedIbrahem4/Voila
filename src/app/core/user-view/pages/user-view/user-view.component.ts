import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../../../../shared/pages/nav-bar/nav-bar.component";
import { FooterComponent } from "../../../../shared/pages/footer/footer.component";
import { SliderComponent } from "../../../../shared/pages/slider/slider.component";
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-view',
  imports: [
    RouterOutlet,
    NavBarComponent,
    FooterComponent,
    Toast
],
providers: [ MessageService],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent {

}
