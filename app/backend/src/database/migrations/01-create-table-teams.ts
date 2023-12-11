import { Model, QueryInterface, DataTypes } from 'sequelize';
import ITeam from '../../Interfaces/ITeam';

interface ITeamMigration extends Omit<ITeam, 'teamName'> {
  team_Name: string;
}

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeamMigration>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      team_Name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams')
  },
};
