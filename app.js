/* app.js
 * Jules Leow
 * Xtern Bootcamp 2017 Day 3 - 06/07/17
 */

const app = {
  init(selectors) {    //Note: This is the same as init: function() {}
    this.flicks = []
    this.max = 0  //Keep track of the property of id. Will be the same as saying max: 0. This is another property we're assigning to the Obj app.
    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addFlick.bind(this))  //This will pass in whatever formSelector that is passed through the caller app.init()
  },      //**DONT FORGET THE COMMA!

  addFlick(ev) {
    ev.preventDefault()
    const f = ev.target
    //const flickName = ev.target.flickName.value   //This will select the value within the flickName input textbox. Without .value, it will select the actual input but not the value.
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    const listItem = this.renderListItem(flick)
    this.list.appendChild(listItem)
    this.flicks.push(listItem)

    ++ this.max
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name
    return item
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list',

})
