import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NamesService, ProducerStatus } from '../names.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  aircraftName:string[] = [];
  ProducerStatues:ProducerStatus[]  = []
  constructor( public service:NamesService,private _http:HttpClient, private route:Router) { 
    this.ProducerStatues = service.ProducerStatues;
    this.service.ShowDashboard = false;
  }

  ngOnInit(): void {
    this.service.OnHomePage = false;
    const url= "https://localhost:44328/api/decodedIcd";
    this._http.get<string[]>(url).subscribe(info => {
      for (let i=0; i<info.length;i++)
      {
        this.aircraftName[i] = info[i];
      }
    })
    console.log(this.aircraftName)
  }
  callpostRequest(name:string){
    var responseCode;
    let transmitionRate = this.service.getTrnasmitionRate(name);
    let communicationType = this.service.getCommunicationType(  name);
    if(transmitionRate > 0 && communicationType!=-1){
          this.service.addCommunicationDecoding(name);
          this._http.post<any>('https://localhost:44328/api/decodedIcd', { CommunicationType:name,DataDirection:communicationType,TransmissionRate:transmitionRate}).subscribe(response=>
          {
              responseCode = response.status;
          })
          Swal.fire({
            icon: 'success',
            title: 'Decoded Frame Producer Started!',
            timer: 5000,
            heightAuto: false,
          }).then(() => {
            this.service.editProducerSituation(name, "Producer Is Running!")
            this.refreshPage();
            Swal.close;
        });  
  }
  else{
    Swal.fire({
    icon: 'error',
      title: 'Missing Properties',
     text:'Fill Out Producer Properties!',
     timer: 5000,
     heightAuto: false,

     
  }).then(() =>{
    this.service.editProducerSituation(name, "Wating For Properties")
    Swal.close;
  })
  }
}
callPostCancelRequest(name:string){
  this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelRequest', [name]).subscribe(response=>{
    this.service.removeFromDecodingList(name) 
   Swal.fire({
      icon: 'success',
      title: "Decoded of: "+ name + " has been canceled",
     timer: 5000,
     heightAuto: false,

    }).then(() =>{
      this.service.editProducerSituation(name, "Producer Is On Pause")
      this.refreshPage();
    })
  },(error) => {
    Swal.fire({
      icon: 'error',
      title: "You Need To Activate Decoding Producer Before Cancelling It",
      heightAuto: false,
   }).then(()=>{
    this.refreshPage();
    Swal.close();
   })
})
}
refreshPage()
{
  this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  this.route.onSameUrlNavigation = 'reload';
  this.route.navigate(['/AnalyzedData']);
}
}
