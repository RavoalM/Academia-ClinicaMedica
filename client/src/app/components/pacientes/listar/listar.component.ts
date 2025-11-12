import { filter, map } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ListagemPacientesModel } from '../paciente.models';
import { PacienteService } from '../paciente.services';

@Component({
  selector: 'app-listar-pacientes',
  imports: [MatButtonModule, MatIconModule, MatCardModule, RouterLink, AsyncPipe],
  templateUrl: './listar.component.html',
})
export class ListarPacientes {
  protected readonly route = inject(ActivatedRoute);
  protected readonly pacienteService = inject(PacienteService);

  protected readonly pacientes$ = this.route.data.pipe(
    filter((data) => data['pacientes']),
    map((data) => data['pacientes'] as ListagemPacientesModel[]),
  );
}