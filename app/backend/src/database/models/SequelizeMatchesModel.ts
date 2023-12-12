import { DataTypes, Model } from 'sequelize';
import IMatches from '../../Interfaces/IMatches';
import db from '.';
import TeamsModel from './SequelizeTeamsModel';

class SequelizeMatchesModel extends Model<IMatches> {
  declare readonly id: number;
  // declare id: CreationOptional<number>; caso ocorra erro na criacao de entidades
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'home_team_id',
});

SequelizeMatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'away_team_id',
});

export default SequelizeMatchesModel;
