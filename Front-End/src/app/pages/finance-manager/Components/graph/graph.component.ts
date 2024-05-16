import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { FinanceServiceService } from '../../../../services/financeService.service';
import { AuthService } from '../../../../services/authService.service';
import { last } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements AfterViewInit, OnInit {


  @ViewChild('myChart') myChart!: ElementRef;

  constructor(private financeService: FinanceServiceService, private authService: AuthService){ }

  userID: string | null = this.authService.getCurrentUserID();



  
  ngOnInit(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; 
  
    const pastYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const pastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  
    for (let year = currentYear; year >= pastYear; year--) {
      const endMonth = (year === currentYear) ? currentMonth : 12;
      const startMonth = (year === pastYear) ? pastMonth : 1;
  
      for (let month = endMonth; month >= startMonth; month--) {
        this.financeService.getFinanceByUserIdAndMonthAndYear(this.userID, month, year).subscribe(
          (data) => {
            console.log(data)
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  }





  ngAfterViewInit() {

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();


    const colors = {
      purple: {
        default: "rgba(149, 76, 233, 1)",
        half: "rgba(149, 76, 233, 0.5)",
        quarter: "rgba(149, 76, 233, 0.25)",
        zero: "rgba(149, 76, 233, 0)"
      },
      indigo: {
        default: "rgba(80, 102, 120, 1)",
        quarter: "rgba(80, 102, 120, 0.25)"
      }
    };

    const weight = [300, 500, 400, 300, 350, 300, 450, 300, 380, 400, 300, 350];

    const labels = [];
    for (let i = 0; i < 12; i++) {
      const month = (currentMonth - i + 12) % 12; 
      labels.unshift(new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(currentDate.getFullYear(), month)));
    }

    const ctx = this.myChart.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    const gradient = ctx.createLinearGradient(0, 25, 0, 300);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.34, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);
    

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          fill: true,
          backgroundColor: gradient,
          pointBackgroundColor: colors.purple.default,
          borderColor: colors.purple.default,
          data: weight,
          borderWidth: 4,
          borderRadius: 10,
          pointRadius: 5,
          cubicInterpolationMode: 'monotone'
        }]
      },
      options: {

        animation: {
          duration: 0
        },
        layout: {
          padding: 10
        },
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              padding: 10,
              autoSkip: false,
              maxRotation: 15,
              minRotation: 15
            }
          },
          y: {

            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Per Month',
              padding: 10
            },
            grid: {
              display: true,
              color: colors.indigo.quarter
            },
            ticks: {
              padding: 10
            }
          }
        }
      }
    };

    new Chart(ctx, config);
  }
}