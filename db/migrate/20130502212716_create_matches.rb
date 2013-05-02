class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.references :home_team, :away_team
      t.integer :home_score
      t.integer :away_score
      t.date :played_on
      t.timestamps
    end

    add_index :matches, :home_team_id
    add_index :matches, :away_team_id
  end
end
