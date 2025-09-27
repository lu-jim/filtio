class CreateCallParticipants < ActiveRecord::Migration[8.0]
  def change
    create_table :call_participants do |t|
      t.references :call, null: false, foreign_key: true
      t.references :participant, null: false, foreign_key: true

      t.timestamps
    end
    
    add_index :call_participants, [:call_id, :participant_id], unique: true
  end
end
