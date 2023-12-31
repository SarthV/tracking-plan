class EntityAlreadyExists extends Error {
    statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.name = "EntityAlreadyExists";
      this.statusCode = 409;
      Object.setPrototypeOf(this, EntityAlreadyExists.prototype);
    }
  }
  
  export default EntityAlreadyExists;