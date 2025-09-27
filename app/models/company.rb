class Company < ApplicationRecord
  has_many :founders, dependent: :destroy
  accepts_nested_attributes_for :founders, allow_destroy: true, reject_if: :all_blank
  
  validates :name, presence: true
end
