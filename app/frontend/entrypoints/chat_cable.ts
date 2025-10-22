import { createConsumer } from '@rails/actioncable'

// Create Action Cable consumer
const consumer = createConsumer()

// Chat channel for real-time updates
class ChatChannel {
  private consumer: any
  private subscription: any
  private chatId: number
  private onMessage: (data: any) => void

  constructor(chatId: number, onMessage: (data: any) => void) {
    this.consumer = consumer
    this.chatId = chatId
    this.onMessage = onMessage
    this.subscribe()
  }

  subscribe() {
    this.subscription = this.consumer.subscriptions.create(
      {
        channel: 'ChatChannel',
        chat_id: this.chatId
      },
      {
        received: (data: any) => {
          this.onMessage(data)
        }
      }
    )
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}

export default ChatChannel

