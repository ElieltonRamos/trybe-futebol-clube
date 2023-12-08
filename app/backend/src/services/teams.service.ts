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

  listAllTeams(): ServiceResponse<string> {
    return { status: 'ok', data: 'vo faze ainda' };
  }
}

export default TeamsService;
