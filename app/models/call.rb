class Call < ApplicationRecord
  belongs_to :company
  has_many :call_participants, dependent: :destroy
  has_many :participants, through: :call_participants

  validates :call_date, presence: true
  validates :call_time, presence: true
  validates :transcript_file, presence: true

  scope :by_date, -> { order(:call_date, :call_time) }
  scope :for_company, ->(company) { where(company: company) }
end
