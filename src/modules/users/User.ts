export type UserSchema = {
  _id?: string;
  password?: string;
  email?: string;
  username?: string;
  picture?: string;
  createdAt?: string;
  updatedAt?: string;
};

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

  get createdAt() {
    return this.user.createdAt ?? "";
  }

  get updatedAt() {
    return this.user.updatedAt ?? "";
  }

  get details() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      picture: this.picture,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
