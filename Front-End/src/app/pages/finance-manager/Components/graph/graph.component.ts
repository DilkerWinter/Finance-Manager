import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { FinanceServiceService } from '../../../../services/financeService.service';
import { AuthService } from '../../../../services/authService.service';

Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements AfterViewInit, OnInit {
  @ViewChild('myChart') myChart!: ElementRef;
  chart: Chart | undefined;
  userID: string | null = this.authService.getCurrentUserID();
  financeData: any;
  totalMonthValues: number[] = new Array(12).fill(0);

  constructor(private financeService: FinanceServiceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchFinanceData();
  }

  fetchFinanceData(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    let monthsToFetch = 12;

    for (let i = 0; i < monthsToFetch; i++) {
      const date = new Date(currentYear, currentMonth - i - 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const currentIndex = monthsToFetch - i - 1;

      this.financeService.getFinanceByUserIdAndMonthAndYear(this.userID, month, year).subscribe(
        (data) => {
          this.financeData = data;
          console.log(`Dados para ${year}-${month}`);
          this.calculateTotalValue(currentIndex);
          console.log(`Valores totais atualizados:`, this.totalMonthValues);

          // Re-render the chart after data is updated
          if (i === monthsToFetch - 1) {
            this.renderChart();
          }
        },
        (error) => {
          console.error(`Erro ao buscar dados para ${year}-${month}:`, error);
        }
      );
    }
  }

  calculateTotalValue(index: number): void {
    this.totalMonthValues[index] = 0;
    if (Array.isArray(this.financeData)) {
      for (const finance of this.financeData) {
        this.totalMonthValues[index] += finance.value;
      }
    }
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
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

    const weight = this.totalMonthValues;

    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = (currentMonth - i + 12) % 12;
      months.unshift(new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(currentDate.getFullYear(), month)));
    }

    const ctx = this.myChart.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const gradient = ctx.createLinearGradient(0, 25, 0, 300);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(1, colors.purple.zero);

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: months,
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

    this.chart = new Chart(ctx, config);
  }

  reloadGraph(): void {
    this.fetchFinanceData();
  }
}
