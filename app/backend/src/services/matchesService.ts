import IMatches from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/IServicesResponse';
import MatchesModels from '../models/matchesModel';

class MatchesService {
  constructor(
    private matchesModel = new MatchesModels(),
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
}

export default MatchesService;
