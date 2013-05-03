namespace :data do

  task generate_goalscorers: :environment do
    bambinos = Team.find_by_name('Bambinos FC')
    players  = bambinos.players

    bambinos.home_matches.each do |match|
      match.home_score.times do
        match.goals.create(goalscorer: players.sample)
      end
    end

    bambinos.away_matches.each do |match|
      match.away_score.times do
        match.goals.create(goalscorer: players.sample)
      end
    end
  end

end
