class Player < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :number, :image

  has_many :goals, foreign_key: 'goalscorer_id'
  has_many :matches_scored_in, through: :goals, source: :match

  def full_name
    "#{first_name} #{last_name}"
  end

  def goals_scored
    goals.count
  end
end
