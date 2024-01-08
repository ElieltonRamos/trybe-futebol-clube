const matchesMock = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      id: 16,
      teamName: 'Avaí/Kindermann'
    },
    awayTeam: {
      id: 8,
      teamName: 'Bahia'
    }
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      id: 16,
      teamName: 'Botafogo'
    },
    awayTeam: {
      id: 9,
      teamName: 'Bahia'
    }
  },
  {
    id: 2,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      id: 16,
      teamName: 'Bahia'
    },
    awayTeam: {
      id: 9,
      teamName: 'Botafogo'
    }
  }
]

export const mockMatchUpdateTest = {
  id: 41,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 9,
  awayTeamGoals: 0,
  inProgress: true,
}

export default matchesMock;
