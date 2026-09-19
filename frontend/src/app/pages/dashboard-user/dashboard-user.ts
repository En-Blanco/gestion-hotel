import { Component } from '@angular/core';
import { DashboardHeader } from '../../components/header-dashboard/header-dashboard';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-dashboard-user',
  imports: [DashboardHeader, Footer],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css'
})
export class DashboardUser {

}
