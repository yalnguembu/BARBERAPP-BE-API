import { ServiceSchema } from "../../utils";

export class Service {
  private readonly service: ServiceSchema;
  constructor(private readonly data: ServiceSchema) {
    this.service = data;
  }

  get name() {
    return this.service.name.trim() ?? "";
  }
  get description() {
    return (this.service.description ?? "").trim();
  }

  get category() {
    return (this.service.category ?? "").trim();
  }

  get picture() {
    return (this.service.picture ?? "service-default.png").trim();
  }

  get price() {
    return this.service.price ?? 0;
  }

  get duration() {
    return this.service.duration ?? 0;
  }

  details() {
    return {
      name: this.name,
      description: this.description,
      category: this.category,
      picture: this.picture,
      price: this.price,
      duration: this.duration,
    };
  }
}
