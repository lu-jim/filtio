class AddCompanyToFounders < ActiveRecord::Migration[8.0]
  def change
    add_reference :founders, :company, null: false, foreign_key: true
  end
end
