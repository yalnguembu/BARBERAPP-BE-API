import { UserSchema } from "../../utils";

export class User {
  private readonly user: UserSchema;
  constructor(data: UserSchema) {
    this.user = data;
  }

  get id() {
    return this.user._id ?? "";
  }

  get email() {
    return this.user.email ?? "";
  }

  get password() {
    return this.user.password ?? "";
  }

  get username() {
    return this.user.username ?? "";
  }

  get picture() {
    return this.user.picture ?? "";
  }

  get role() {
    return this.user.role ?? "";
  }

  get createdAt() {
    return this.user.createdAt ?? "";
  }

  get updatedAt() {
    return this.user.updatedAt ?? "";
  }

  details = () => {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      picture: this.picture,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  };
}
