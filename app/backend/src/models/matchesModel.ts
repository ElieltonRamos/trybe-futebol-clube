import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import IMatches, { IMatchWithTeamNames, IMatchesModel } from '../Interfaces/IMatches';

class MatchesModel implements IMatchesModel {
  private model = SequelizeMatchesModel;

  async create(data: IMatches): Promise<IMatches> {
    const resDB = await this.model.create(data);
    return resDB.dataValues;
  }

  async findAll(): Promise<IMatchWithTeamNames[]> {
    const dbResponse = await this.model.findAll({
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeamsModel, as: 'awayTeam', attributes: ['teamName'] }],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    const allMatches = dbResponse.map((matche) => matche.dataValues) as unknown;
    const allMatchesTeamsNames = allMatches as IMatchWithTeamNames[];
    return allMatchesTeamsNames;
  }

  async findById(id: number): Promise<IMatches | null> {
    const dbResponse = await this.model.findByPk(id);
    if (dbResponse === null) return null;
    return dbResponse.dataValues;
  }

  async update(id: number, data: IMatches): Promise<IMatches | null> {
    const dbResponse = await this.model.update(data, { where: { id } });
    if (dbResponse[0] === 0) return null;
    return this.findById(id);
  }

  async delete(id: number): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}

export default MatchesModel;
