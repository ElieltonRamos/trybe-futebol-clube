import { ServiceResponse } from '../Interfaces/IServicesResponse';

class leaderboardService {
  async leaderboardSearchHome(): Promise<ServiceResponse<string>> {
    return { status: 'ok', data: 'ovofaze' };
  }
}

export default leaderboardService;
