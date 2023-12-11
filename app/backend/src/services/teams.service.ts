import ITeam, { ITeamModel } from '../Interfaces/ITeam';
import { StatusHTTP } from '../utils/mapStatusHTPP';
import TeamsModel from '../models/teams.models';

type ServiceResponse<type> = {
  status: StatusHTTP,
  data: type
};

class TeamsService {
  constructor(
    private TeamModel: ITeamModel = new TeamsModel(),
  ) { }

  async listAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const resDB = await this.TeamModel.findAll();
    return { status: 'ok', data: resDB };
  }
}

export default TeamsService;
