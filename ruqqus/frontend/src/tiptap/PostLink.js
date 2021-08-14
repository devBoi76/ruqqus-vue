import { Node } from 'tiptap'

export default class PostLink extends Node {

  get name() {
    return 'postlink'
  }

  get schema() {
    return {
      marks: "",
      content: 'inline*',
      parseDOM: [{
        tag: 'p',
      }],
      toDOM: () => ['p', {class: "link mb-4 mb-md-5"}, 0],
    }
  }

}