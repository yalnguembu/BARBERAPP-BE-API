import { CategorySchema } from "../../utils";

export class Category {
  private readonly categorie: CategorySchema;
  constructor(private readonly data: CategorySchema) {
    this.categorie = data;
  }

  get id() {
    return this.categorie._id ?? "";
  }

  get title() {
    return this.categorie.title ?? "";
  }

  get summary() {
    return this.categorie.summary ?? "";
  }

  details = () => {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
    };
  };
}
