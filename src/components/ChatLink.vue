<template>
  <div v-if="userId != '1'" class="">
    <router-link :to="'/room/' + userId" class="chat-link ripple">Пользователь: {{ userId }}</router-link>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    userId: String
  }
})
export default class ChatLink extends Vue {
  userId!: string
}
</script>
<style scoped lang="scss">
  .chat-link {
    padding: 1vh 2vw;
    background: #fff;
    box-shadow: 0 0 2px 0 #000;
    text-overflow: ellipsis;
    max-width: 240px;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    margin: 1vh 1vw;
    border-radius: 3px;
    text-decoration: none;
    &:hover {
      background-color: #ccf;
    }
  }
</style>
