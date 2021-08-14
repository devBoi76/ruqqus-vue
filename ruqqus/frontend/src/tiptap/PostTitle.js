import { Node } from 'tiptap'

export default class PostTitle extends Node {

  get name() {
    return 'posttitle'
  }

  get schema() {
    return {
      marks: "",
      content: 'text*',
      parseDOM: [{
        tag: 'h3',
      }],
      toDOM: () => ['h3', {class: "title h5 mb-0"}, 0],
    }
  }


}