class CreateCalls < ActiveRecord::Migration[8.0]
  def change
    create_table :calls do |t|
      t.timestamps
    end
  end
end
