class ChatResponseJob < ApplicationJob
  def perform(chat_id, content)
    chat = Chat.find(chat_id)

    chat.ask(content) do |chunk|
      if chunk.content && !chunk.content.blank?
        message = chat.messages.last
        message.broadcast_append_chunk(chunk.content)
      end
    end

    # Broadcast that the message is complete
    message = chat.messages.last
    ActionCable.server.broadcast(
      "chat_#{chat_id}",
      {
        type: "message_complete",
        message: {
          id: message.id,
          role: message.role,
          content: message.content,
          created_at: message.created_at.iso8601
        }
      }
    )
  end
end