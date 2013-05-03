class MatchdayPresenter

  def initialize
    @matches = Match.grouped_by_matchday
  end

  def team_points_by_matchday
    matchdays = [teams_with_0_points_array]

    Match.grouped_by_matchday.each_value do |matches|
      teams_array = matchdays.last.dup

      matches.each do |match|
        home_team = teams_array.detect { |h| h[:name] == match.home_team.name }.dup
        away_team = teams_array.detect { |h| h[:name] == match.away_team.name }.dup

        if match.draw?
          home_team[:points] += 1
          away_team[:points] += 1
        else
          if home_team[:name] == match.winner[:name]
            home_team[:points] += 3
          else
            away_team[:points] += 3
          end
        end

        teams_array.reject! { |h| h[:name] == home_team[:name] }
        teams_array.reject! { |h| h[:name] == away_team[:name] }
        teams_array << home_team
        teams_array << away_team
      end

      matchdays << teams_array
    end

    matchdays
  end

  private

  def teams_with_0_points_array
    @teams_with_points_array ||= Team.all.inject([]) do |memo, team|
      memo << { name: team.name, points: 0 }
      memo
    end
  end

end
