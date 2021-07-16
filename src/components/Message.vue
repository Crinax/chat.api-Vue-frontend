<template>
  <div class="message-body" :class="{ 'recipient': isRecipient, 'user': !isRecipient }">
    <p class="message-text"  :class="{ 'recipient-text': isRecipient, 'user-text': !isRecipient }">{{ content }}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    content: String,
    status: String
  },
  data: function ():Record<string, unknown> {
    return {
      isRecipient: this.status !== '1'
    }
  }
})
export default class Room extends Vue {
  content!: string;
  status!: string
}
</script>
