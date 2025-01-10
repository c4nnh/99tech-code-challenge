class BaseError extends Error {
  metadata?: Record<string, unknown>;
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message);
    this.name = "BaseError";
    this.metadata = metadata;
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, metadata);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends BaseError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, metadata);
    this.name = "ConflictError";
  }
}

export class UnauthenticatedError extends BaseError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, metadata);
    this.name = "UnauthenticatedError";
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, metadata);
    this.name = "BadRequestError";
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, metadata);
    this.name = "ForbiddenError";
  }
}
