# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_09_27_120139) do
  create_table "agents", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "call_participants", force: :cascade do |t|
    t.integer "call_id", null: false
    t.integer "participant_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["call_id", "participant_id"], name: "index_call_participants_on_call_id_and_participant_id", unique: true
    t.index ["call_id"], name: "index_call_participants_on_call_id"
    t.index ["participant_id"], name: "index_call_participants_on_participant_id"
  end

  create_table "calls", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "transcript_file"
    t.date "call_date"
    t.time "call_time"
    t.integer "company_id", null: false
    t.index ["company_id"], name: "index_calls_on_company_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "website"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "founders", force: :cascade do |t|
    t.string "name"
    t.string "linkedin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "company_id", null: false
    t.index ["company_id"], name: "index_founders_on_company_id"
  end

  create_table "participants", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "call_participants", "calls"
  add_foreign_key "call_participants", "participants"
  add_foreign_key "calls", "companies"
  add_foreign_key "founders", "companies"
end
