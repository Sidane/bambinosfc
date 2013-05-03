class HomeController < ApplicationController

  def show
    @teams                   = Team.all
    @goalscorers             = Player.all.sort_by(&:goals_scored).reverse
    @matches_by_date         = Match.grouped_by_matchday
    @team_points_by_matchday = MatchdayPresenter.new.team_points_by_matchday
  end

end
