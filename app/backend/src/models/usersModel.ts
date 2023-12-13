import IUser, { IUserModel } from '../Interfaces/IUser';
import SequelizeUsersModel from '../database/models/SequelizeUsersModel';

class UsersModel implements IUserModel {
  private model = SequelizeUsersModel;

  async findByEmail(email: string) {
    const dbResponse = await this.model.findOne({ where: { email } });
    if (dbResponse === null) return null;
    return dbResponse.dataValues;
  }

  async create(data: IUser): Promise<IUser> {
    const dbRes = await this.model.create(data);
    return dbRes.dataValues;
  }

  async findAll(): Promise<IUser[]> {
    const dbRes = await this.model.findAll();
    return dbRes.map((user) => user.dataValues);
  }

  async findById(id: number): Promise<IUser | null> {
    const dbRes = await this.model.findByPk(id);
    if (dbRes === null) return null;
    return dbRes.dataValues;
  }

  async update(id: number, data: IUser): Promise<IUser | null> {
    const dbRes = await this.model.update(data, { where: { id } });
    if (dbRes[0] === 0) return null;
    return this.findById(id);
  }

  async delete(id: number): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}

export default UsersModel;
