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

  async finishMatch(id: number): Promise<ServiceResponse<{ message: string }>> {
    const match = await this.matchesModel.findById(id);
    if (!match) return { status: 'notFound', data: { message: 'match not found' } };

    const matchUpdated = { ...match, inProgress: false };
    await this.matchesModel.update(id, matchUpdated);

    return { status: 'ok', data: { message: 'Finished' } };
  }
}

export default MatchesService;
