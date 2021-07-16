<template>
  <div class="chat-form">
        <div class="messages-wrapper">
            <div class="message-recipient">
                <p class="message-recipient-text">Пользователь</p>
            </div>
            <div class="messages-place">
                <div class="message-body recipient">
                    <p class="message-text recipient-text">Lorem ipsum dolar sit amet</p>
                </div>
                <div class="message-body user">
                    <p class="message-text user-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
            <textarea name="message" class="message-field message-textarea" placeholder="Введите сообщение..."></textarea>
            <button class="send-message block-button">Отправить сообщение</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { interval, Subscription } from 'rxjs'

@Options({
  data: function ():Record<string, unknown> {
    return {
      query: { uid: this.$route.params.id },
      ws: null,
      messages: [],
      messageEvent$: Subscription
    }
  },
  created: function ():void {
    this.ws = new WebSocket('ws://localhost:9000/')
    this.ws.onopen = ():void => {
      this.messageEvent$ = interval(500).subscribe(() => {
        this.ws.send(JSON.stringify({ target: 'messages', body: this.query }))
      })
    }
    this.ws.onclose = ():void => { this.messageEvent$.unsubscribe() }
    this.ws.onmessage = (event: MessageEvent):void => {
      const res = event.data || '[]'
      console.log(event.data)
      if (JSON.stringify(this.messages) !== res) {
        this.messages = JSON.parse(res)
        console.log(this.messages)
      }
    }
  }
})
export default class Room extends Vue {}
</script>
