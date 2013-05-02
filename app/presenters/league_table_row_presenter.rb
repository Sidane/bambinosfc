class LeagueTableRowPresenter

  attr_reader :team

  def initialize(team)
    @team = team
  end

  def team_name
    team.name
  end

  def matches_played
    team.home_matches.count + team.away_matches.count
  end

  def number_of_wins
    team.home_matches.home_win.count + team.away_matches.away_win.count
  end

  def number_of_draws
    team.home_matches.draw.count + team.away_matches.draw.count
  end

  def number_of_loses
    matches_played - number_of_wins - number_of_draws
  end

  def goals_for
    team.home_matches.sum(&:home_score) + team.away_matches.sum(&:away_score)
  end

  def goals_against
    team.home_matches.sum(&:away_score) + team.away_matches.sum(&:home_score)
  end

  def goal_difference
    goals_for - goals_against
  end

  def points
    (number_of_wins * 3) + number_of_draws
  end

end
