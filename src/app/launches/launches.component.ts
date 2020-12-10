import { Component, OnInit, ViewChild } from '@angular/core';
import { LaunchesService, Launch, LaunchResponse, LaunchQuery } from './launches.service';
import { LaunchData } from './launches.data';
import { ClrDatagrid } from '@clr/angular';
import { ClrDatagridStateInterface } from '@clr/angular';



@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styles: [`
::ng-deep clr-dg-row .btn {
  margin: 0;
}
  `]
})
export class LaunchesComponent implements OnInit {

  selected: Launch[] = [];
  response: LaunchResponse;
  loading = true;
  launching = false;
  name = '';
  launched = [];
  @ViewChild('datagridRef') datagrid: ClrDatagrid;

  constructor(private service: LaunchesService) { }

  ngOnInit(): void {
    /* this.response = LaunchData; // Client side */
    console.log(this.datagrid);
  }

  getLaunches(state: ClrDatagridStateInterface) {
    // tslint:disable-next-line: deprecation
    console.log(event);
    const options: LaunchQuery = {};
    if (state.page && state.page.from) {
      options.offset = state.page.from;
    }
    this.loading = true;
    this.service.query(options).subscribe(response => {
      this.response = response;
      this.loading = false;
    });
  }

  canLaunch(launch: Launch) {
    const date = new Date(launch.windowstart);
    return ((date.getTime() - Date.now()) < (1000 * 60 * 60 * 24 * 14)) && this.launched.indexOf(launch.id) < 0;
  }

  onLaunch(item: Launch) {
    if (item.rocket && item.rocket.name) {
      this.name = item.rocket.name;
    } else if (item.lsp && item.lsp.name) {
      this.name = item.lsp.name;
    } else {
      this.name = 'Rocket';
    }
    this.launching = true;
    this.launched.push(item.id);
    setTimeout(() => {
      this.launching = false;
    }, 6000);
  }

  onEdit() {

  }

  onAbort() {

  }
}

