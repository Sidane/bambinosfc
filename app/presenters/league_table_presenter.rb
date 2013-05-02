class LeagueTablePresenter

  attr_reader :teams, :template

  def initialize(teams, template)
    @teams = teams
    @template = template
  end

  def render
    rows = league_table_row_presenters.collect do |row|
      template.render("league_table/row", team: row)
    end

    rows.unshift(header)
    rows.push(footer)
    rows.join.html_safe
  end

  private

  def league_table_row_presenters
    rows = teams.map do |team|
      LeagueTableRowPresenter.new(team)
    end
    rows.sort_by(&:points).reverse
  end

  def header
    template.render("league_table/header")
  end

  def footer
    template.render("league_table/footer")
  end

end
