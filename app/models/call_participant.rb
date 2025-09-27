class CallParticipant < ApplicationRecord
  belongs_to :call
  belongs_to :participant

  validates :call_id, uniqueness: { scope: :participant_id }
end
