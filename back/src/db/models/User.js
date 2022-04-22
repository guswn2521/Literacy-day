import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ _id: userId });
    return user;
  }

  static async update({ userId, toUpdate }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async delete({ userId }) {
    const deletedUser = await UserModel.deleteOne({ _id: userId });
    return deletedUser;
  }
}

export { User };
