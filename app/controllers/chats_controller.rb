# frozen_string_literal: true

class ChatsController < ApplicationController
  before_action :set_chat, only: [:show]

  def index
    render inertia: "chats/Index", props: {
      chats: Chat.order(created_at: :desc).map do |chat|
        {
          id: chat.id,
          model_name: chat.model.name,
          created_at: chat.created_at,
          messages_count: chat.messages.count
        }
      end,
      models: Model.all.map { |model| { id: model.id, name: model.name } }
    }
  end

  def new
    render inertia: "chats/New", props: {
      selected_model: params[:model],
      models: Model.all.map { |model| { id: model.id, name: model.name } }
    }
  end

  def create
    return unless prompt.present?

    @chat = Chat.create!(model: model)
    ChatResponseJob.perform_later(@chat.id, prompt)

    redirect_to chat_path(@chat), notice: 'Chat was successfully created.'
  end

  def show
    render inertia: "chats/Show", props: {
      chat: {
        id: @chat.id,
        model_name: @chat.model.name,
        messages: @chat.messages.where.not(id: nil).map do |message|
          {
            id: message.id,
            role: message.role,
            content: message.content,
            created_at: message.created_at
          }
        end
      }
    }
  end

  private

  def set_chat
    @chat = Chat.find(params[:id])
  end

  def model
    params[:chat][:model].presence
  end

  def prompt
    params[:chat][:prompt]
  end
end

