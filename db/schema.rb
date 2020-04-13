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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_13_084338) do

  create_table "abilities", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "effect"
    t.string "weight"
    t.string "tar"
  end

  create_table "flower_abilities", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "flower_id"
    t.bigint "ability_id"
    t.index ["ability_id"], name: "index_flower_abilities_on_ability_id"
    t.index ["flower_id"], name: "index_flower_abilities_on_flower_id"
  end

  create_table "flowers", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.integer "locomotion"
    t.string "job"
    t.string "nation"
    t.string "skill"
    t.integer "year"
    t.index ["name"], name: "index_flowers_on_name", unique: true
  end

  add_foreign_key "flower_abilities", "abilities"
  add_foreign_key "flower_abilities", "flowers"
end
