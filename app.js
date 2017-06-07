/* app.js
 * Jules Leow
 * Xtern Bootcamp 2017 Day 3 - 06/07/17
 */

const app = {
  init(formSelector) {    //Note: This is the same as init: function() {}
    document
      .querySelector(formSelector)
      .addEventListener('submit', this.addFlick)  //This will pass in whatever formSelector that is passed through the caller app.init()

  },      //**DONT FORGET THE COMMA!

  addFlick(ev) {
    ev.preventDefault()
    const flickName = ev.target.flickName.value
    console.log('submitted!')
  },
}

app.init('#flickForm')
