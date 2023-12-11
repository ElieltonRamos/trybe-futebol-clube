import { DataTypes, Model, QueryInterface } from "sequelize";
import IMatches from '../../Interfaces/IMatches';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatches>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeamId: {
        field: 'home_team_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        type: DataTypes.INTEGER,
      },
      awayTeamId: {
        field: 'away_team_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        },
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        type: DataTypes.INTEGER,
      },
      inProgress: {
        field: 'in_progress',
        type: DataTypes.BOOLEAN,
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches')
  }
}