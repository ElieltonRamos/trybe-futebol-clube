import TeamsModel from '../models/teamsModel';
import IMatches from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/IServicesResponse';
import MatchesModels from '../models/matchesModel';
import ITeam from '../Interfaces/ITeam';

type ValidTeams = {
  homeTeam: ITeam,
  awayTeam: ITeam,
};

class MatchesService {
  constructor(
    private matchesModel = new MatchesModels(),
    private teamModel = new TeamsModel(),
  ) { }

  async listAllMatches(inProgress: unknown): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    if (inProgress === 'true') {
      const filteredMatchs = allMatches.filter((match) => match.inProgress);
      return { status: 'ok', data: filteredMatchs };
    }
    if (inProgress === 'false') {
      const filteredMatchs = allMatches.filter((match) => match.inProgress === false);
      return { status: 'ok', data: filteredMatchs };
    }
    return { status: 'ok', data: allMatches };
  }

  async finishMatch(id: number): Promise<ServiceResponse<{ message: string }>> {
    const match = await this.matchesModel.findById(id);
    if (!match) return { status: 'notFound', data: { message: 'match not found' } };

    const matchUpdated = { ...match, inProgress: false };
    await this.matchesModel.update(id, matchUpdated);

    return { status: 'ok', data: { message: 'Finished' } };
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<IMatches>> {
    const match = await this.matchesModel.findById(id);
    if (!match) return { status: 'notFound', data: { message: 'match not found' } };

    const matchUpdated = { ...match, homeTeamGoals, awayTeamGoals };
    const resultUpdated = await this.matchesModel.update(id, matchUpdated);

    if (!resultUpdated) return { status: 'serverError', data: { message: 'Internal Error' } };

    return { status: 'ok', data: resultUpdated };
  }

  async createMatch(data: IMatches): Promise<ServiceResponse<IMatches | string>> {
    const matchValid = await this.validateMatch(data);

    if ('status' in matchValid) return matchValid;

    const infoMatch = {
      inProgress: true,
      awayTeamGoals: data.awayTeamGoals,
      homeTeamGoals: data.homeTeamGoals,
      awayTeamId: matchValid.awayTeam.id,
      homeTeamId: matchValid.homeTeam.id,
    };

    const newMatch = await this.matchesModel.create(infoMatch);
    return { status: 'created', data: newMatch };
  }

  async validateMatch(data: IMatches): Promise<ServiceResponse<string> | ValidTeams> {
    // const fieldsValids = this.requiredFields(data);
    // if (fieldsValids !== 'valid') return fieldsValids;

    const homeTeam = await this.teamModel.findById(data.homeTeamId);
    const awayTeam = await this.teamModel.findById(data.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return {
        status: 'notFound',
        data: { message: 'There is no team with such id!' },
      };
    }

    if (homeTeam.id === awayTeam.id) {
      return {
        status: 'unprocessableEntity',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    return { homeTeam, awayTeam };
  }

  requiredFields = (data: IMatches): ServiceResponse<string> | 'valid' => {
    const propertiesNecessary = ['homeTeamId', 'awayTeamId', 'homeTeamGoals', 'awayTeamGoals'];
    const dataValid = propertiesNecessary.every((property) => property in data);

    if (!dataValid) return { status: 'badRequest', data: { message: 'All fields are required' } };

    return 'valid';
  };
}

export default MatchesService;
