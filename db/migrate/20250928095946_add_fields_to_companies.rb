class AddFieldsToCompanies < ActiveRecord::Migration[8.0]
  def change
    add_column :companies, :logo, :string
    add_column :companies, :tagline, :string
    add_column :companies, :year, :integer
    add_column :companies, :size, :string

    add_check_constraint :companies, "size IN ('0-10', '50-100', '100-250', '+250')", name: 'companies_size_check'
  end
end
