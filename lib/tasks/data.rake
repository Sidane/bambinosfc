# Gwyn Morfey 1
# Sam Taylor 3
# Jonas Pfenniger 3.14
# Niall Mullally 5
# Makoto Inoue 6
# Pablo Brasero 7
# Tony Marklove 8
# Mark Evans 10
# Vivien Schilis 13
# Oliver Nightingale 23
# Sam Whiting 99

namespace :data do

  task generate_players: :environment do
    team = Team.find_or_create_by_name('Bambinos FC')

    team.players.create(
      first_name: 'Gwyn',
      last_name: 'Morfey',
      number: 1,
      image: 'http://assets-1.new-bamboo.co.uk/assets/team/gwyn.jpeg'
    )
    team.players.create(
      first_name: 'Sam',
      last_name: 'Taylor',
      number: 3,
      image: 'http://assets-1.new-bamboo.co.uk/assets/team/sam.jpeg'
    )
    team.players.create(
      first_name: 'Niall',
      last_name: 'Mullally',
      number: 5,
      image: 'http://assets-1.new-bamboo.co.uk/assets/team/niall.jpeg'
    )
    team.players.create(
      first_name: 'Makoto',
      last_name: 'Inoue',
      number: 6,
      image: 'http://assets-1.new-bamboo.co.uk/assets/team/makoto.jpeg'
    )
    team.players.create(
      first_name: 'Pablo',
      last_name: 'Brasero',
      number: 7,
      image: 'http://assets-1.new-bamboo.co.uk/assets/team/pablo.jpeg'
    )
    team.players.create(
      first_name: 'Tony',
      last_name: 'Marklove',
      number: 8,
      image: 'http://assets-1.new-bamboo.co.uk/assets/team/tony.jpeg'
    )
    team.players.create(
      first_name: 'Mark',
      last_name: 'Evans',
      number: 10,
      image: 'http://assets-1.new-bamboo.co.uk/assets/team/mark.jpeg'
    )
    team.players.create(
      first_name: 'Oliver',
      last_name: 'Nightingale',
      number: 23,
      image: 'http://assets-1.new-bamboo.co.uk/assets/team/oliver-n.jpeg'
    )
    team.players.create(
      first_name: 'Sam',
      last_name: 'Whiting',
      number: 99,
      image: 'http://assets-1.new-bamboo.co.uk/assets/team/sam-w.jpeg'
    )
  end

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
