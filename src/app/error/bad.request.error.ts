class BadRequestError extends Error {
    statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.name = "BadRequestError";
      this.statusCode = 404;
      Object.setPrototypeOf(this, BadRequestError.prototype);
    }
  }
  
  export default BadRequestError;
  