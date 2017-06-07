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

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name

    const favBtn = this.makeFavButton()
    item.appendChild(favBtn)
    const delBtn = this.makeDelButton()
    item.appendChild(delBtn)
    const upBtn = this.makeUpButton()
    item.appendChild(upBtn)

    item.id = 'list'

    return item
  },

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

  makeFavButton() {
    const favBtn = document.createElement('button')
    const innerText = document.createTextNode('\u2665')
    favBtn.className = 'favorite'
    favBtn.appendChild(innerText)
    favBtn.value = false
    favBtn.addEventListener('click', this.handleFavorite.bind(this))

    return favBtn
  },

  makeDelButton() {
    const delBtn = document.createElement('button')
    const innerText = document.createTextNode('\u00d7')
    delBtn.className = 'delete'
    delBtn.appendChild(innerText)
    delBtn.value = false
  //  delBtn.addEventListener('click', this.handleDelete.bind(this))
    delBtn.id = 'list'

    return delBtn
  },

  makeUpButton() {
    const upBtn = document.createElement('button')
    const innerText = document.createTextNode('\u25b2')
    upBtn.className = 'upArrow'
    upBtn.appendChild(innerText)
    //upBtn.addEventListener('click', this.handleUp.bind(this))
    upBtn.value = false
  },

  handleFavorite() {

  },


}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list',

})
