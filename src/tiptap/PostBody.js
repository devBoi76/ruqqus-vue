import { Doc } from '@tiptap/core'

export default class CustomDoc extends Doc {

  get schema() {
    return {
      content: 'block+',
    }
  }

}