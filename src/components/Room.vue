<template>
  <div class="chat-form">
      <div class="messages-wrapper">
        <div class="message-recipient">
          <p class="message-recipient-text">Пользователь</p>
        </div>
        <div class="messages-place">
          <Message v-for="message in messages" :key="message['id']" :content="message['content']" :status="message['isAdmin']"></Message>
        </div>
        <ChatForm :userId="messages[0] == undefined ? '' : messages[0]['userId']"></ChatForm>
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Message from '@/components/Message.vue'
import ChatForm from '@/components/ChatForm.vue'
import { interval, Subscription } from 'rxjs'

@Options({
  components: {
    Message,
    ChatForm
  },
  data: function ():Record<string, unknown> {
    return {
      query: { uid: this.$route.params.id },
      ws: null,
      messages: [],
      messageEvent$: Subscription
    }
  },
  // watch: {
  //   '$route' () {
  //     this.onUnmounted()
  //   }
  // },
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
      if (JSON.stringify(this.messages) !== res) {
        this.messages = JSON.parse(res)
      }
    }
  }
})
export default class Room extends Vue {}
</script>
<style scoped lang="scss">

</style>
