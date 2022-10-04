import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";
import { TabDetails } from './models/tabdetails.model';
import { TabDetailsService } from './services/tab-details.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  grid: ApexGrid
};

export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-approver',
  templateUrl: './approver.page.html',
  styleUrls: ['./approver.page.scss'],
})
export class ApproverPage implements OnInit {
  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild("piechart") piechart: ChartComponent;
  public chartOptions2: Partial<ChartOptions2>;
  tabDetails: TabDetails[];
  tabledetails;
  constructor(private tabDetailsService: TabDetailsService, private router: Router) {
    this.chartOptions = {
      series: [
        {
          name: "series1",
          data: [51, 36, 70, 51, 31, 50, 30]
        },
      ],
      chart: {
        height: 300,
        type: "area"
      },
      grid: {
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };

    this.chartOptions2 = {
      series: [44, 55, 41, 17, 15],
      chart: {
        width: 380,
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      legend: {
        show: false,
        position: 'bottom',
        floating: true, 
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
   }

  ngOnInit() {
    this.tabDetails = this.tabDetailsService.getInvoiceDetailsTabs();
  }
  public generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  OnTabChange(event: { tab: string }) {
  }
  onClick( tab: string ) {
    this.tabledetails = this.tabDetails;
    this.relocatetoTop(tab);
    if(tab.toLocaleLowerCase() === 'Open'.toLocaleLowerCase()) {
     
    }
  }
  onCardClick(card) {
    console.log(card);
    this.router.navigate(['/menu/tabs/approver/customer-card']);
  }

  relocatetoTop(value) {
    // const element = document.getElementById(value) as HTMLIonCardElement;
    // element.scrollIntoView({
    //   behavior: 'smooth',
    //   inline: 'center'
    // });
  }
}
