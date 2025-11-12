import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
// import { AuthService } from '../auth/auth.service';
import {
    CadastrarPacienteModel, CadastrarPacienteResponseModel, DetalhesPacienteModel,
    EditarPacienteModel, EditarPacienteResponseModel, ListagemPacientesApiResponse,
    ListagemPacientesModel
} from './paciente.models';


@Injectable()
export class PacienteService {
  private readonly http = inject(HttpClient);
//   private readonly authService = inject(AuthService);

  private readonly apiUrl = environment.apiUrl + '/pacientes';

  public cadastrar(
    pacienteModel: CadastrarPacienteModel,
  ): Observable<CadastrarPacienteResponseModel> {
    return this.http.post<CadastrarPacienteResponseModel>(this.apiUrl, pacienteModel);
  }

  public editar(
    id: string,
    editarPacienteModel: EditarPacienteModel,
  ): Observable<EditarPacienteResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.put<EditarPacienteResponseModel>(urlCompleto, editarPacienteModel);
  }

  public excluir(id: string): Observable<null> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.delete<null>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<DetalhesPacienteModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<DetalhesPacienteModel>(urlCompleto);
  }

  public selecionarTodas(): Observable<ListagemPacientesModel[]> {
    return this.http
      .get<ListagemPacientesApiResponse>(this.apiUrl)
      .pipe(map((res) => res.registros));
  }
}