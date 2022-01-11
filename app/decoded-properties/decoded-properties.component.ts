import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NamesService } from '../names.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-decoded-properties',
  templateUrl: './decoded-properties.component.html',
  styleUrls: ['./decoded-properties.component.css']
})
export class DecodedPropertiesComponent implements AfterViewInit{
  transitionRate:number = 0;
  selectedOption:string = " ";
  aircraftName:string = " ";
  isLoading:boolean; 
  constructor(private router:Router,public service:NamesService) {
    this.isLoading = true;
  }
  ngAfterViewInit() {
    this.isLoading = false;
  }
  saveData(){
    if(this.selectedOption == " " || this.transitionRate <= 0){
      Swal.fire({
        icon: 'error',
        title: 'Invalid Producer Properties!',
        text: 'Unselected Communication Type Or Invalid Transmition Rate',
        timer: 5000,
        heightAuto: false,
      }).then(() => {
        Swal.close;

    });
    }
    else
    {
        let EnumNumberType:number = -1;
        if(this.selectedOption == "0"){
            EnumNumberType = 0;
            this.service.editProducerPropertiesAfterForm(this.aircraftName,this.transitionRate, "Uplink")
        }
        else{
            EnumNumberType = 1;
            this.service.editProducerPropertiesAfterForm(this.aircraftName,this.transitionRate, "Downlink")
        }
        this.service.editAircraftProperties(this.aircraftName,EnumNumberType,this.transitionRate);
        this.router.navigate(['/AnalyzedData'])
        Swal.fire({
          icon: 'success',
          title: "properties for " + this.aircraftName +" saved successfuly",
          timer: 5000,
          heightAuto: false,
        }).then(() => {
          Swal.close;
  
      });
    }
  }
  radioChangeHandler(event:any){
      this.selectedOption = event.target.value;
  }
  rateChange(event:any){
   this.transitionRate = event.traget.value
  }
  ngOnInit(): void {
    this.aircraftName = this.router.url.split('/')[3];
  }
  
}
