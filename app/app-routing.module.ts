import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateClientsComponent } from './activate-clients/activate-clients.component';
import { ActiveRequestComponent } from './active-request/active-request.component';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { ClientsDashboardComponent } from './clients-dashboard/clients-dashboard.component';
import { ConsumersTableComponent } from './consumers-table/consumers-table.component';
import { DecodedPropertiesComponent } from './decoded-properties/decoded-properties.component';
import { GraphsComponentComponent } from './graphs-component/graphs-component.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PandasGraphsComponent } from './pandas-graphs/pandas-graphs.component';

const routes: Routes = [
  {path:"ClientConsumersSelect", component:ActivateClientsComponent},
  {path:"DecodedFrameProducer", component:NavBarComponent, children:
    [
        {path:'form/:name', component:DecodedPropertiesComponent},
    ]},
    {path: "AnalyzedData", component:CardsComponent, children: 
    [
      {path:'form/:name', component:DecodedPropertiesComponent},
    ]},
    {path: "requests", component:ClientsDashboardComponent},
    {path: "grapgs", component:PandasGraphsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

