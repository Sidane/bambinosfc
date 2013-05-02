class HomeController < ApplicationController

  def show
    @teams = Team.all
    @goalscorers = Player.all.sort_by(&:goals_scored).reverse
  end

end
