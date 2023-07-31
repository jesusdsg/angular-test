import { Component, OnInit } from '@angular/core';
import { ReportModel, StateModel } from '@models/file/file.model';
import { FileService } from '@pages/services/file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public options: any = null;
  p: number = 1;
  states: StateModel[] = [];
  reports: ReportModel[] = [];

  constructor(public fileService: FileService) {
    this.fileService.currentStates.subscribe((res) => (this.states = res));
    this.options = {
      autoSize: true,
      title: {
        text: 'State of USA with covid Population',
        fontSize: 18,
        spacing: 25,
      },
      footnote: {
        text: 'Source: CSV File Statistics',
      },
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
      series: [
        {
          data: this.states,
          type: 'pie',
          calloutLabelKey: 'name',
          legendItemKey: 'percent',
          sectorLabelKey: 'population',
          angleKey: 'population',
          calloutLabel: {
            minAngle: 0,
          },
          calloutLine: {
            strokeWidth: 2,
          },
          fills: [
            '#49afda',
            '#57cc8b',
            '#bcdf72',
            '#fbeb37',
            '#f4b944',
            '#fb7451',
            '#72508c',
            '#b7b5ba',
          ],
          strokeWidth: 0,
          highlightStyle: {
            item: {
              fillOpacity: 0,
              stroke: '#535455',
              strokeWidth: 1,
            },
          },
        },
      ],
    };
  }

  getStatesPercent(): void {}

  ngOnInit(): void {}
}
