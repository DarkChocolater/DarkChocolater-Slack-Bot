export class RequestContext {
  constructor(public readonly lambdaName: string) {}
}

export class Tools {
  /**
   * `Index.initialize` only supposed to be used in Lambda deployments
   */
  static initialize(requestContext: RequestContext) {
    this.instance = new Tools(requestContext);
  }

  /**
   * `Index.getInstance` only supposed to be used in Lambda deployments
   * using it in other types of developments could cause uninte