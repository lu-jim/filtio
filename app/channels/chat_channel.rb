# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    chat_id = params[:chat_id]
    stream_from "chat_#{chat_id}" if chat_id
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
