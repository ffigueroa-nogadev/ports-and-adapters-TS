export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // Sirve para capturar la línea correcta donde sucede el error y así depurar más fácil;
  }
}

// Mi listita de errores

export class NotFoundError extends AppError {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}

export class DriveUploadError extends AppError {
  constructor(message: string = "Error al cargar el archivo a Google Drive") {
    super(message, 500); 
  }
}

export class DriveDeleteError extends AppError {
  constructor(message: string = "Error al eliminar el archivo de Google Drive") {
    super(message, 500);
  }
}

export class DrivePermissionError extends AppError {
  constructor(message: string = "Error al cambiar los permisos del archivo en Google Drive") {
    super(message, 403);
  }
}

