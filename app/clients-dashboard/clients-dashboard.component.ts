import { Component, OnInit } from '@angular/core';
import { NamesService } from '../names.service';

@Component({
  selector: 'app-clients-dashboard',
  templateUrl: './clients-dashboard.component.html',
  styleUrls: ['./clients-dashboard.component.css']
})
export class ClientsDashboardComponent implements OnInit {
  
  constructor(public service:NamesService) { 
    this.service.OnHomePage = false;
    this.service.ShowDashboard = true;

  }

  ngOnInit(): void {
  }

}
