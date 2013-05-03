class MatchdayPresenter

  def initialize
    @matches = Match.grouped_by_matchday
  end

  def team_points_by_matchday
    matchdays = {}

    Match.grouped_by_matchday.each_pair do |date, matches|
      matches.each do |match|
        if match.draw?
          teams_with_points_hash[match.home_team.name] += 1
          teams_with_points_hash[match.away_team.name] += 1
        else
          teams_with_points_hash[match.winner.name] += 3
        end
      end

      matchdays[date] = teams_with_points_hash.dup
    end

    matchdays
  end

  private

  def teams_with_points_hash
    @teams_with_points_hash ||= Team.all.inject({}) do |memo, team|
      memo[team.name] = 0
      memo
    end
  end

end
