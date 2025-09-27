class AddFieldsToCalls < ActiveRecord::Migration[8.0]
  def change
    add_column :calls, :transcript_file, :text
    add_column :calls, :call_date, :date
    add_column :calls, :call_time, :time
    add_reference :calls, :company, null: false, foreign_key: true
  end
end
