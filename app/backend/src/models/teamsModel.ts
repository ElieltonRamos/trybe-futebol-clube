import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import ITeam, { ITeamModel } from '../Interfaces/ITeam';

class TeamsModel implements ITeamModel {
  private model = SequelizeTeamsModel;

  async create(teamInfo: ITeam): Promise<ITeam> {
    const dbResponse = await this.model.create(teamInfo);
    return dbResponse.dataValues;
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbResponse = await this.model.findByPk(id);
    if (dbResponse === null) return null;
    return dbResponse.dataValues;
  }

  async findAll(): Promise<ITeam[]> {
    const dbResponse = await this.model.findAll();
    const allTeams = dbResponse.map((team) => team.dataValues);
    return allTeams;
  }

  async update(id: number, data: ITeam): Promise<ITeam | null> {
    const dbResponse = await this.model.update(data, { where: { id } });
    if (dbResponse[0] === 0) return null;
    return this.findById(id);
  }

  async delete(id: number): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}

export default TeamsModel;
