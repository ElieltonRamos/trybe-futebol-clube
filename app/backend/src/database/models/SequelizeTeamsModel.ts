import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeTeamsModel extends Model<InferAttributes<SequelizeTeamsModel>,
InferCreationAttributes<SequelizeTeamsModel>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeamsModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default SequelizeTeamsModel;
