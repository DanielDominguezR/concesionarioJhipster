import { IGestorFichero } from 'app/shared/model/gestor-fichero.model';

export interface IFichero {
  id?: number;
  path?: string;
  nombre_fichero?: string;
  contentType?: string;
  ficheros?: IGestorFichero;
}

export class Fichero implements IFichero {
  constructor(
    public id?: number,
    public path?: string,
    public nombre_fichero?: string,
    public contentType?: string,
    public ficheros?: IGestorFichero
  ) {}
}
