import { Component } from '@angular/core';
import { DashboardHeader } from '../../components/header-dashboard/header-dashboard';   // ← nueva línea

@Component({
  selector: 'app-dashboard-user',
  imports: [DashboardHeader],   // ← antes decía imports: []
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css'
})
export class DashboardUser {

}
