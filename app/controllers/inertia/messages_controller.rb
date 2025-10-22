# frozen_string_literal: true

class Inertia::MessagesController < ApplicationController
  before_action :set_chat

  def create
    return unless content.present?

    ChatResponseJob.perform_later(@chat.id, content)

    # For Inertia, we'll redirect back to the chat page
    # The real-time updates will be handled via Action Cable
    redirect_to inertia_chat_path(@chat)
  end

  private

  def set_chat
    @chat = Chat.find(params[:chat_id])
  end

  def content
    params[:message][:content]
  end
end
