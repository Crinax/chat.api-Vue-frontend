<template>
  <div class="chat-list">
    <ChatLink v-for="user in users" v-bind:key="user['id']" v-bind:userId="user['id']"></ChatLink>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ChatLink from '@/components/ChatLink.vue'
import { interval, Subscription } from 'rxjs'

@Options({
  components: {
    ChatLink
  },
  data: function ():Record<string, unknown> {
    return {
      ws: null,
      users: [],
      usersEvent$: Subscription
    }
  },
  created: function ():void {
    this.ws = new WebSocket('ws://localhost:9000/')
    this.ws.onopen = ():void => {
      this.usersEvent$ = interval(500).subscribe(() => {
        this.ws.send(JSON.stringify({ target: 'users', body: {} }))
      })
    }
    this.ws.onclose = ():void => { this.usersEvent$.unsubscribe() }
    this.ws.onmessage = (event: MessageEvent):void => {
      const res = event.data || '[]'
      if (JSON.stringify(this.users) !== res) {
        this.users = JSON.parse(res)
      }
    }
  }
})
export default class Chat extends Vue { }
</script>

<style scoped lang="scss">
  .chat-list {
    display: flex;
    flex-direction: column;
    width: 90vw;
    height: max-content;
    justify-content: flex-start;
  }
</style>
