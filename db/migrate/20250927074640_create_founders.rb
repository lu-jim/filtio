class CreateFounders < ActiveRecord::Migration[8.0]
  def change
    create_table :founders do |t|
      t.string :name
      t.string :linkedin

      t.timestamps
    end
  end
end
