import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';

import { CadastrarPaciente } from './cadastrar/cadastrar.component';
import { ListagemPacientesModel } from './paciente.models';
import { PacienteService } from './paciente.services';
import { ListarPacientes } from './listar/listar.component';
import { EditarPaciente } from './editar/editar.component';
import { ExcluirPaciente } from './excluir/excluir.component';

const listagemPacientesResolver: ResolveFn<ListagemPacientesModel[]> = () => {
  const pacienteService = inject(PacienteService);

  return pacienteService.selecionarTodas();
};

const detalhesPacienteResolver = (route: ActivatedRouteSnapshot) => {
  const pacienteService = inject(PacienteService);

  if (!route.paramMap.has('id')) throw new Error('O parâmetro id não foi fornecido.');

  const pacienteId = route.paramMap.get('id')!;

  return pacienteService.selecionarPorId(pacienteId);
};

export const pacienteRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListarPacientes,
        resolve: { pacientes: listagemPacientesResolver },
      },
      { path: 'cadastrar', component: CadastrarPaciente },
      {
        path: 'editar/:id',
        component: EditarPaciente,
        resolve: { paciente: detalhesPacienteResolver },
      },
      {
        path: 'excluir/:id',
        component: ExcluirPaciente,
        resolve: { paciente: detalhesPacienteResolver },
      },
    ],
    providers: [PacienteService]
  },
];