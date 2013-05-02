class Match < ActiveRecord::Base
  attr_accessible :home_team, :away_team, :home_score, :away_score, :played_on

  belongs_to :home_team, class_name: 'Team'
  belongs_to :away_team, class_name: 'Team'

  has_many :goals
  has_many :goalscorers, through: :goals

  def title
    "#{home_team.name} #{home_score}:#{away_score} #{away_team.name}"
  end
end
