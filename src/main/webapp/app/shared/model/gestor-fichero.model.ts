export interface IGestorFichero {
  id?: number;
  folder?: string;
}

export class GestorFichero implements IGestorFichero {
  constructor(public id?: number, public folder?: string) {}
}
