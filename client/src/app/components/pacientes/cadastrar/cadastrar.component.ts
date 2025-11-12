import { Observer } from 'rxjs';

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { PacienteService } from '../paciente.services';
import { CadastrarPacienteModel } from '../paciente.models';

// import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
// import { CadastrarCategoriaModel, CadastrarCategoriaResponseModel } from '../categoria.models';
// import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-cadastrar-paciente',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastrar.component.html',
})
export class CadastrarPaciente {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly pacienteService = inject(PacienteService);
  // protected readonly notificacaoService = inject(NotificacaoService);

  protected pacienteForm: FormGroup = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
  });

  get titulo() {
    return this.pacienteForm.get('titulo');
  }

  public cadastrar() {
    if (this.pacienteForm.invalid) return;

    const pacienteModel: CadastrarPacienteModel = this.pacienteForm.value;

    // const cadastroObserver: Observer<CadastrarPacienteResponseModel> = {
    //   next: () =>
    //     this.notificacaoService.sucesso(
    //       `O registro "${pacienteModel.titulo}" foi cadastrado com sucesso!`,
    //     ),
    //   error: (err) => this.notificacaoService.erro(err.message),
    //   complete: () => this.router.navigate(['/categorias']),
    // };

    this.pacienteService.cadastrar(pacienteModel)
    // .subscribe(cadastroObserver);
  }
}