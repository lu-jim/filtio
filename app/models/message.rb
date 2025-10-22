class Message < ApplicationRecord
  acts_as_message
  has_many_attached :attachments
  broadcasts_to ->(message) { "chat_#{message.chat_id}" }

  def broadcast_append_chunk(content)
    # For Inertia, we'll use Action Cable to broadcast updates
    # This will trigger a page refresh or partial update in the React component
    ActionCable.server.broadcast(
      "chat_#{chat_id}",
      {
        type: "message_chunk",
        message_id: id,
        content: content,
        timestamp: Time.current.iso8601
      }
    )
  end
end
