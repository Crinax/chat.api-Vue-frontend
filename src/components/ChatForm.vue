<template>
      <textarea class="message-field message-textarea" placeholder="Введите сообщение..." v-model="message"></textarea>
      <button class="send-message" :class="{ 'block-button': isBlocked }" v-on:click="send()">Отправить сообщение</button>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  props: {
    userId: String
  },
  data: function ():Record<string, unknown> {
    return {
      isBlocked: true,
      message: '',
      ws: null
    }
  },
  methods: {
    send: function ():void {
      if (this.ws !== null && !this.isBlocked && this.userId !== '') {
        const query = {
          uid: this.userId,
          content: this.message,
          isAdmin: '1'
        }
        const wsMessage = {
          target: 'push',
          body: query
        }
        this.ws.send(JSON.stringify(wsMessage))
        this.message = ''
        this.isBlocked = true
      }
    }
  },
  watch: {
    message (newMessage) {
      this.isBlocked = newMessage.length === 0
    }
  },
  created: function ():void {
    this.ws = new WebSocket('ws://localhost:9000/')
  }
})
export default class ChatForm extends Vue {
  userId!: string
}
</script>
