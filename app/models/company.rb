class Company < ApplicationRecord
  has_many :founders, dependent: :destroy
  has_many :calls, dependent: :destroy
  accepts_nested_attributes_for :founders, allow_destroy: true, reject_if: :all_blank
  
  validates :name, presence: true
  
  def recent_calls(limit = 5)
    calls.by_date.limit(limit)
  end
end
