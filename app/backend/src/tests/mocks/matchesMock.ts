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
      teamName: 'São Paulo'
    },
    awayTeam: {
      id: 8,
      teamName: 'Grêmio'
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
      teamName: 'São Paulo'
    },
    awayTeam: {
      id: 9,
      teamName: 'Internacional'
    }
  }
]

export default matchesMock;
