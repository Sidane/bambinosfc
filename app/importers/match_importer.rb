require 'csv'

class MatchImporter

  CSV_FILE_PATH = Rails.root + 'doc/february - may 2013 results.csv'

  def self.import
    match_date = nil

    CSV.foreach(CSV_FILE_PATH) do |row|
      next if row.first.blank?

      if is_date_row?(row)
        match_date = parse_date(row.first)
        next
      end

      if is_match_result_row?(row)
        home_team  = Team.find_or_create_by_name(row[0])
        away_team  = Team.find_or_create_by_name(row[4])
        home_score = row[1]
        away_score = row[3]

        # ignore if postponed match
        if home_score =~ /P/i || home_score =~ /P/i
          next
        end

        Match.create(
          played_on: match_date,
          home_team: home_team,
          away_team: away_team,
          home_score: home_score,
          away_score: away_score
        )
      end
    end
  end

  private

  def self.is_date_row?(row)
    begin
      return true if parse_date(row.first)
    rescue
      false
    end
  end

  def self.is_match_result_row?(row)
    row[0,5].all?(&:present?)
  end

  def self.parse_date(date)
    Date.parse(date)
  end

end

