import ITeam, { ITeamModel } from '../Interfaces/ITeam';
import TeamsModel from '../models/teamsModel';
import { ServiceResponse } from '../Interfaces/IServicesResponse';

class TeamsService {
  constructor(
    private TeamModel: ITeamModel = new TeamsModel(),
  ) { }

  async listAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const resDB = await this.TeamModel.findAll();
    return { status: 'ok', data: resDB };
  }

  async listTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const resDB = await this.TeamModel.findById(id);
    if (!resDB) return { status: 'notFound', data: { message: 'team not found' } };
    return { status: 'ok', data: resDB };
  }
}

export default TeamsService;
