# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130502214752) do

  create_table "goals", :force => true do |t|
    t.integer  "match_id"
    t.integer  "goalscorer_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "goals", ["goalscorer_id"], :name => "index_goals_on_goalscorer_id"
  add_index "goals", ["match_id"], :name => "index_goals_on_match_id"

  create_table "matches", :force => true do |t|
    t.integer  "home_team_id"
    t.integer  "away_team_id"
    t.integer  "home_score"
    t.integer  "away_score"
    t.date     "played_on"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "matches", ["away_team_id"], :name => "index_matches_on_away_team_id"
  add_index "matches", ["home_team_id"], :name => "index_matches_on_home_team_id"

  create_table "players", :force => true do |t|
    t.integer  "team_id"
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "number"
    t.string   "image"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "players", ["team_id"], :name => "index_players_on_team_id"

  create_table "teams", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
