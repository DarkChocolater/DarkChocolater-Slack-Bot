export class RequestContext {
  constructor(public readonly lambdaName: string) {}
}

export class Tools {
  /**
   * `Index.initialize` only supposed to be used in Lambda deployme