class Participant < ApplicationRecord
  has_many :call_participants, dependent: :destroy
  has_many :calls, through: :call_participants
  
  validates :name, presence: true
  validates :name, uniqueness: true
  
  scope :by_name, -> { order(:name) }
end
