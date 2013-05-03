class Match < ActiveRecord::Base
  attr_accessible :home_team, :away_team, :home_score, :away_score, :played_on

  belongs_to :home_team, class_name: 'Team'
  belongs_to :away_team, class_name: 'Team'

  has_many :goals
  has_many :goalscorers, through: :goals

  scope :home_win, where("home_score > away_score")
  scope :away_win, where("away_score > home_score")
  scope :draw, where("home_score = away_score")

  def title
    "#{home_team.name} #{home_score}:#{away_score} #{away_team.name}"
  end

  def self.grouped_by_matchday
    all.group_by(&:played_on)
  end

  def draw?
    home_score == away_score
  end

  def winner
    if home_score > away_score
      home_team
    elsif away_score > home_score
      away_team
    else
      nil
    end
  end

end
