import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MongoClient, NamesService, SplunkClient, UdpClient } from '../names.service';
import { deccodedProperties } from '../user.modeul';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-activate-clients',
  templateUrl: './activate-clients.component.html',
  styleUrls: ['./activate-clients.component.css']
})
export class ActivateClientsComponent implements OnInit {
  ShowForm:boolean = false;

  UdpClien:UdpClient; //udp client
  TcpClien:UdpClient; //tcp client
  MongoclientProps:MongoClient; //mongodb client
  HttpClientProps:UdpClient; //http client
  WebSocketClient:UdpClient; //webSocket client
  SplunkClient:SplunkClient;

  requestsList:deccodedProperties[] = [];
   showMongo:boolean = false;
  showUdp:boolean = false;
  showHttp:boolean = false;
  ShowTcp = false;
  ShowWebSocket = false;
  ShowSplunk = false;

  constructor(private _http:HttpClient, public service:NamesService, private router:Router) { 
    service.OnHomePage = false;
    this.UdpClien = new UdpClient(-1, "", []);
    this.TcpClien = new UdpClient(-1, "", []);
    this.MongoclientProps = new MongoClient(-1, "", [], "", "");
    this.HttpClientProps = new UdpClient(-1, "", []);
    this.WebSocketClient = new UdpClient(-1, "", []);
    this.SplunkClient = new SplunkClient(-1,"",[],"");

  }

  ngOnInit(): void {
    
  }
  ShowFormProperties()
  {
    this.ShowForm = true;
  }

  TcpPortNumberChange(event:any){
    this.TcpClien.port = event.traget.value
   }
   UdpPortNumberChange(event:any)
   {
    this.UdpClien.port = event.traget.value;
   }
   HttpPortNumberChange(event:any)
   {
    this.HttpClientProps.port = event.traget.value;
   }
   WebSocketPortNumberChange(event:any)
   {
    this.WebSocketClient.port = event.traget.value;
   }
   MongdbPortNumberChange(event:any){
    this.MongoclientProps.port = event.traget.value
   }
   SplunkPortNumberChange(event:any){
    this.SplunkClient.port = event.traget.value
   }
   

   TcpIPAdressChange(event:any){
    this.TcpClien.Ip = event.traget.value;
   }
   UdpIPAdressChange(event:any){
      this.UdpClien.Ip = event.target.value;
    }
    HttpIPAdressChange(event:any){
      this.HttpClientProps.Ip = event.target.value;
    }
    WebSocketIPAdressChange(event:any){
      this.WebSocketClient.Ip = event.target.value;
    }
   MongoIPAdressChange(event:any){
      this.MongoclientProps.Ip = event.target.value;
    }
    SplunkIPAdressChange(event:any){
      this.SplunkClient.Ip = event.target.value;
    }
    

   DataBaseNameChange(event:any){
     this.MongoclientProps.DataBaseName = event.traget.value;
   }
   CollectionNameChange(event:any){
     this.MongoclientProps.CollectionName = event.traget.value;
   }
   TokenNameChange(event:any){
     this.SplunkClient.token = event.target.value;
   }

   startMongoClient(){
     if(this.MongoclientProps.Ip != ""  && this.MongoclientProps.port != -1 && this.MongoclientProps.CommunicationType.length > 0 && this.MongoclientProps.CollectionName != "" && this.MongoclientProps.DataBaseName != "") 
     {
      this._http.post<any>('https://localhost:44328/api/decodedIcd/MongoClientRequest', {Port: this.MongoclientProps.port,
      Ip: this.MongoclientProps.Ip,
      DataBaseName: this.MongoclientProps.DataBaseName,
      CollectionName:this.MongoclientProps.CollectionName,
      ConsumerTopic: this.MongoclientProps.CommunicationType}).subscribe(response=>
      {
        this.MongoclientProps.CreationDate = this.GetCurrentHour();
        this.service.AddMongoClient(this.MongoclientProps);
        this.MongoclientProps.CommunicationTypeAfterConvert = this.convertFromEnum(this.MongoclientProps.CommunicationType);
        this.MongoclientProps = new MongoClient(-1, "", [], "", "");
        this.ShowForm = false;
        this.showMongo = false;
        Swal.fire({
          icon: 'success',
          title: 'MongoDB client has started!',
          timer: 5000,
          heightAuto: false,
        }).then(() => {
          Swal.close;
      });
      }, (error) => {   
        Swal.fire({
          icon: 'error',
          title: 'Error while Creating MongoDB Client!',
          text: 'Invalid MongoDB Properties',
          timer: 5000,
          heightAuto: false,
        }).then(() => {
          Swal.close;
          
      });
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Cannot Create MongoDB Client!',
        text: 'Fill Out Missing Properties',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close();
      });
    }
   }


   startUdpClient(){
    if(this.UdpClien.Ip != ""  && this.UdpClien.port != -1 && this.UdpClien.CommunicationType.length  > 0 ) 
    {
     this._http.post<any>('https://localhost:44328/api/decodedIcd/UdpClientRequest', {Port: this.UdpClien.port,
     Ip: this.UdpClien.Ip,
     ConsumerTopic: this.UdpClien.CommunicationType}).subscribe(response=>
     {
      this.UdpClien.CreationDate = this.GetCurrentHour();
       this.service.AddUdpClient(this.UdpClien);
       this.MongoclientProps.CommunicationTypeAfterConvert = this.convertFromEnum(this.MongoclientProps.CommunicationType);
       this.UdpClien.CommunicationTypeAfterConvert = this.convertFromEnum(this.UdpClien.CommunicationType);
       this.UdpClien = new UdpClient(-1, "", []);
       Swal.fire({
        icon: 'success',
        title: 'Udp Client Has Started!',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });
      this.ShowForm = false;
      this.showUdp = false;
     },
     (error) => {     
      Swal.fire({
        icon: 'error',
        title: 'Cannot Create Udp Client',
        text: 'Invalid Udp Properties',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });                   //Error callback
    })
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Cannot Create Udp Client',
      text: 'Fill Out Missing Properties',
      timer: 5000,
      heightAuto: false,

    }).then(() => {
      Swal.close;
  });                
    }
  }


  startTcpClient(){
    if(this.TcpClien.Ip != ""  && this.TcpClien.port != -1 && this.TcpClien.CommunicationType.length  > 0 ) 
    {
     this._http.post<any>('https://localhost:44328/api/decodedIcd/TcpClientRequest', {Port: this.TcpClien.port,
     Ip: this.TcpClien.Ip,
     ConsumerTopic: this.TcpClien.CommunicationType}).subscribe(response=>
     {
      this.TcpClien.CreationDate = this.GetCurrentHour();
       this.service.AddTcpClient(this.TcpClien);
       this.TcpClien.CommunicationTypeAfterConvert = this.convertFromEnum(this.TcpClien.CommunicationType);
       this.TcpClien = new UdpClient(-1, "", []);
       Swal.fire({
        icon: 'success',
        title: 'Tcp Client Has Started!',
        text: 'Invalid Udp Properties',
        timer: 5000,
        heightAuto: false,

      }).then(()=> {
        Swal.close;
    });                
      this.ShowForm = false;
      this.ShowTcp = false;
     },
     (error) => {    
      Swal.fire({
        icon: 'error',
        title: 'Cannot Create Tcp Client',
        text: 'Invalid Tcp Properties',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });                
    })
   }
   else{
     Swal.fire({
      icon: 'error',
      title: 'Cannot Create Tcp Client',
      text: 'Fill Out Missing Properties',
      timer: 5000,
      heightAuto: false,

    }).then(() => {
      Swal.close;
  });                
    }
  }

  startHttpClient()
  {
    if(this.HttpClientProps.Ip != ""  && this.HttpClientProps.port != -1 && this.HttpClientProps.CommunicationType.length  > 0 ) 
    {
     this._http.post<any>('https://localhost:44328/api/decodedIcd/HttpProtocolClientRequest', {Port: this.HttpClientProps.port,
     Ip: this.HttpClientProps.Ip,
     ConsumerTopic: this.HttpClientProps.CommunicationType}).subscribe(response=>
     {
      this.HttpClientProps.CreationDate = this.GetCurrentHour();
       this.service.AddHttpClient(this.HttpClientProps);
       this.HttpClientProps.CommunicationTypeAfterConvert = this.convertFromEnum(this.HttpClientProps.CommunicationType);
       Swal.fire({
        icon: 'success',
        title: 'Http Client Has Started',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });               
    this.ShowForm = false;
      this.showHttp = false;
      this.HttpClientProps = new UdpClient(-1, "", []);
    },
     (error) => {  
       Swal.fire({
        icon: 'error',
        title: 'Cannot Create Http Client',
        text: 'Invalid Client Properties',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });         
    })
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Cannot Create Http Client',
      text: 'Fill Out Missing Properties',
      timer: 5000,
      heightAuto: false,

    }).then(() => {
      Swal.close;
  });         
    }
  }
  startWebSocketClient()
  {
    if(this.WebSocketClient.Ip != ""  && this.WebSocketClient.port != -1 && this.WebSocketClient.CommunicationType.length  > 0 ) 
    {
     this._http.post<any>('https://localhost:44328/api/decodedIcd/WebSocketClientRequest', {Port: this.WebSocketClient.port,
     Ip: this.WebSocketClient.Ip,
     ConsumerTopic: this.WebSocketClient.CommunicationType}).subscribe(response=>
     {
      this.WebSocketClient.CreationDate = this.GetCurrentHour();
       this.service.AddWebSocketClient(this.WebSocketClient);
       this.WebSocketClient.CommunicationTypeAfterConvert = this.convertFromEnum(this.WebSocketClient.CommunicationType);
       Swal.fire({
        icon: 'success',
        title: 'Web Socket client has started',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });         
      this.ShowForm = false;
      this.ShowWebSocket = false;
      this.WebSocketClient = new UdpClient(-1, "", []);
    },
     (error) => {                       
       this.ShowWebSocket = false;       //Error callback
      Swal.fire({
        icon: 'error',
        title: 'Cannot Create Web Socket Client',
        text: 'Invalid Client Properties',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        this.ShowWebSocket = true;
        Swal.close;
    });         
    })
   }
   else{
     this.ShowWebSocket = false;
    Swal.fire({
      icon: 'error',
      title: 'Cannot Create Web Socket Client',
      text: 'Fill Out Missing Properties',
      timer: 5000,
      heightAuto: false,

    }).then(() => {
      this.ShowWebSocket = true;
      Swal.close;
  });         
    }
  }
  startSplunkClient()
  {
    if(this.SplunkClient.Ip != ""  && this.SplunkClient.port != -1 && this.SplunkClient.CommunicationType.length  > 0 && this.SplunkClient.token!="") 
    {
     this._http.post<any>('https://localhost:44328/api/decodedIcd/SplunkClientRequest', {Port: this.SplunkClient.port,
     Ip: this.SplunkClient.Ip,
     ConsumerTopic: this.SplunkClient.CommunicationType, HttpEventCollectorToken: this.SplunkClient.token}).subscribe(response=>
     {
      this.SplunkClient.CreationDate = this.GetCurrentHour();
       this.service.AddSplunkClient(this.SplunkClient);
       this.SplunkClient.CommunicationTypeAfterConvert = this.convertFromEnum(this.SplunkClient.CommunicationType);
       Swal.fire({
        icon: 'success',
        title: 'Splunk Client Has Started!',
        timer: 5000,
        heightAuto: false,
      }).then(() => {
        Swal.close;
    });               
    this.ShowForm = false;
      this.ShowSplunk = false;
      this.SplunkClient = new SplunkClient(-1, "", [], "");
    },
     (error) => {   
       this.ShowSplunk = false;    
       //Error callback
      Swal.fire({
        icon: 'error',
        title: 'Cannot Create Splunk Client',
        text: 'Invalid Client Poperties',
        timer: 5000,
        heightAuto: false,
      }).then(() => {
        this.ShowSplunk = true;
        Swal.close;
    });         
    })
   }
   else{
     this.ShowSplunk = false;
    Swal.fire({
      icon: 'error',
      title: 'Cannot Create Splunk Client',
      text: 'Fill Out Missing Properties',
      timer: 5000,
      heightAuto: false,

    }).then(() => {
      this.ShowSplunk = true;
      Swal.close;
  });         
    }
  }



   TcpCommunicationTypeCheckBox(event:any) {
    if ( event.target.checked ) {
      this.TcpClien.CommunicationType.push(+event.target.value);
   }
   else
   {
    let ItemIndex = this.TcpClien.CommunicationType.findIndex((item => item == +event.target.value));
    this.TcpClien.CommunicationType.splice(ItemIndex, 1);
   }
}
UdpCommunicationTypeCheckBox(event:any) {
    if ( event.target.checked ) {
      this.UdpClien.CommunicationType.push(+event.target.value);
    }
    else
    {
      let ItemIndex = this.UdpClien.CommunicationType.findIndex((item => item == +event.target.value));
      this.UdpClien.CommunicationType.splice(ItemIndex, 1);
    }
}
HttpCommunicationTypeCheckBox(event:any) {
  if ( event.target.checked ) {
    this.HttpClientProps.CommunicationType.push(+event.target.value);
  }
  else
  {
    let ItemIndex = this.HttpClientProps.CommunicationType.findIndex((item => item == +event.target.value));
    this.HttpClientProps.CommunicationType.splice(ItemIndex, 1);
  }
}
WebSocketCommunicationTypeCheckBox(event:any) {
  if ( event.target.checked ) {
    this.WebSocketClient.CommunicationType.push(+event.target.value);
  }
  else
  {
    let ItemIndex = this.WebSocketClient.CommunicationType.findIndex((item => item == +event.target.value));
    this.WebSocketClient.CommunicationType.splice(ItemIndex, 1);  
  }
}
MongoCommunicationTypeCheckBox(event:any) {
  if ( event.target.checked ) {
    this.MongoclientProps.CommunicationType.push(+event.target.value);
  }
  else
  {
    let ItemIndex = this.MongoclientProps.CommunicationType.findIndex((item => item == +event.target.value));
    this.MongoclientProps.CommunicationType.splice(ItemIndex, 1);
  }
}
SplunkCommunicationTypeCheckBox(event:any) {
  if ( event.target.checked ) {
    console.log(+event.target.value)
    this.SplunkClient.CommunicationType.push(+event.target.value);
    console.log(this.SplunkClient.CommunicationType)
  }
  else
  {
      let ItemIndex = this.SplunkClient.CommunicationType.findIndex((item => item == +event.target.value));
      this.SplunkClient.CommunicationType.splice(ItemIndex, 1);
      console.log(this.SplunkClient.CommunicationType)
    }
}
clientPropertiesBtnClick(){
  this.service.showcards = false;
}


convertFromEnum(EnumString:number[]):string[]
{
  var communicationTypesAfterConvert:string[] = [];
  var communicationTypes:string[] = ["FlightBoxUp", "FlightBoxDown", "FiberBoxUp", "FiberBoxDown", "LandingBox" ];
  EnumString.forEach(element  => { 
    communicationTypesAfterConvert.push(communicationTypes[+element]);
  });
  return communicationTypesAfterConvert;
}

showTcpForm()
{
  this.ShowTcp = true;
  this.ShowForm = true;
}
ShowUdpForm(){
  this.showUdp = true;
  this.ShowForm = true;
}
ShowHttpForm(){
  this.showHttp = true;
  this.ShowForm = true;
}
ShowWebSocketForm()
{
  this.ShowWebSocket = true;
  this.ShowForm = true;
}
ShowMongoForm()
{
  this.showMongo = true;
  this.ShowForm = true;
}
ShowSplunkForm(){
  this.ShowSplunk = true;
  this.ShowForm = true;
}
HandleAlertMongo()
{
  this.showMongo = true;
  Swal.close;
}
closeForm(){
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['/ClientConsumersSelect']);

}
GetCurrentHour(){
    var today = new Date();
    var minutes:Number = today.getMinutes();
    var seconds:Number = today.getSeconds();
    var minutesAddition = "";
    var secondsAddition = "";
    if(minutes < 10){
        minutesAddition = "0";
    }
    if(seconds < 10){
       secondsAddition = "0";
    }
    return today.getHours() + ":" + minutesAddition + minutes + ":"+ secondsAddition + seconds;
}
}
