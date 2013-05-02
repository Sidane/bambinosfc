class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.references :match, :goalscorer
      t.timestamps
    end

    add_index :goals, :match_id
    add_index :goals, :goalscorer_id
  end
end
