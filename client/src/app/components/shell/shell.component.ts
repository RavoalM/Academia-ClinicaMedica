import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    AsyncPipe,
    RouterLink,
  ],
})
export class ShellComponent {
  private breakpointObserver = inject(BreakpointObserver);

  // 1. ACESSO AO MAT-SIDENAV USANDO #drawer
  @ViewChild('drawer') public drawer!: MatSidenav;

  /** Detecta se está em modo mobile */
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  /** Estado do menu lateral retrátil */
  public isCollapsed = false;

  /** Itens da navbar */
  public itensNavbar = [
    { titulo: 'Atividades', icone: 'assignment', link: '/atividades' },
    { titulo: 'Médicos', icone: 'medical_services', link: '/medicos' },
    { titulo: 'Pacientes', icone: 'personal_injury', link: '/pacientes' },
  ];

  /** Evento de logout */
  @Output() logoutRequisitado = new EventEmitter<void>();
  
  // 2. FUNÇÃO toggleSidenav() QUE ESTAVA FALTANDO
  public toggleSidenav(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}