import { Component } from '@angular/core';
import { DashboardHeader } from '../../components/header-dashboard/header-dashboard';

@Component({
  imports: [DashboardHeader],
  selector: 'app-dashboard-admin',
  styleUrl: './dashboard-admin.css',
  templateUrl: './dashboard-admin.html',
})
export class DashboardAdmin {}
