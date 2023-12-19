import IMatches from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/IServicesResponse';
import MatchesModels from '../models/matchesModel';

class MatchesService {
  constructor(
    private matchesModel = new MatchesModels(),
  ) { }

  async listAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'ok', data: allMatches };
  }
}

export default MatchesService;
