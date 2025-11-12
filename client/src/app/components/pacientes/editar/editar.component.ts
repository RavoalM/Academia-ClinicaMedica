import { filter, map, Observer, shareReplay, switchMap, take, tap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import {
    DetalhesPacienteModel, EditarPacienteModel, EditarPacienteResponseModel
} from '../paciente.models';
import { PacienteService } from '../paciente.services';

@Component({
  selector: 'app-editar-paciente',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './editar.component.html',
})
export class EditarPaciente {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly pacienteService = inject(PacienteService);
  // protected readonly notificacaoService = inject(NotificacaoService);

  protected pacienteForm: FormGroup = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
  });

  get titulo() {
    return this.pacienteForm.get('titulo');
  }

  protected readonly paciente$ = this.route.data.pipe(
    filter((data) => data['paciente']),
    map((data) => data['paciente'] as DetalhesPacienteModel),
    tap((paciente) => this.pacienteForm.patchValue(paciente)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public editar() {
    if (this.pacienteForm.invalid) return;

    const editarPacienteModel: EditarPacienteModel = this.pacienteForm.value;

    // const edicaoObserver: Observer<EditarPacienteResponseModel> = {
    //   next: () =>
    //     this.notificacaoService.sucesso(
    //       `O registro "${editarPacienteModel.titulo}" foi editado com sucesso!`,
    //     ),
    //   error: (err) => this.notificacaoService.erro(err.message),
    //   complete: () => this.router.navigate(['/pacientes']),
    // };

    this.paciente$
      .pipe(
        take(1),
        switchMap((paciente) => this.pacienteService.editar(paciente.id, editarPacienteModel)),
      )
      // .subscribe(edicaoObserver);
  }
}