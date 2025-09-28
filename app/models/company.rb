class Company < ApplicationRecord
  has_many :founders, dependent: :destroy
  has_many :calls, dependent: :destroy
  accepts_nested_attributes_for :founders, allow_destroy: true, reject_if: :all_blank

  validates :name, presence: true
  validates :year, presence: true, numericality: { only_integer: true, greater_than: 1800, less_than_or_equal_to: Date.current.year }
  validates :size, inclusion: { in: %w[0-10 50-100 100-250 +250] }

  def recent_calls(limit = 5)
    calls.by_date.limit(limit)
  end
end
