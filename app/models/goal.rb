class Goal < ActiveRecord::Base
  attr_accessible :match, :goalscorer

  belongs_to :match
  belongs_to :goalscorer, class_name: 'Player'
end
