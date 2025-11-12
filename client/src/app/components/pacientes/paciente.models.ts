export interface ListagemPacientesApiResponse {
  registros: ListagemPacientesModel[];
}

export interface ListagemPacientesModel {
  id: string;
  titulo: string;
}

export interface CadastrarPacienteModel {
  titulo: string;
}

export interface CadastrarPacienteResponseModel {
  id: string;
}

export interface EditarPacienteModel {
  titulo: string;
}

export interface EditarPacienteResponseModel {
  titulo: string;
}

export interface DetalhesPacienteModel {
  id: string;
  titulo: string;
}