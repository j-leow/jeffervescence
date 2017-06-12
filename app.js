/* app.js
 * Jules Leow
 * Xtern Bootcamp 2017 Day 3 - 06/07/17
 */
//
// const app = {
//   init(selectors) {    //Note: This is the same as init: function() {}
//     this.flicks = []
//     this.max = 0  //Keep track of the property of id. Will be the same as saying max: 0. This is another property we're assigning to the Obj app.
//     this.list = document.querySelector(selectors.listSelector)
//     document
//       .querySelector(selectors.formSelector)
//       .addEventListener('submit', this.addFlick.bind(this))  //This will pass in whatever formSelector that is passed through the caller app.init()
//   },      //**DONT FORGET THE COMMA!
//
//   save() {
//     localStorage.setItem('flicksArray', JSON.stringify(this.flicks))
//   }
//
//   makeFavButton() {
//     const favBtn = document.createElement('button')
//     const innerText = document.createTextNode('\u2665')
//     favBtn.className = 'favorite'
//     favBtn.appendChild(innerText)
//     favBtn.value = false
//     favBtn.addEventListener('click', this.handleFavorite.bind(this))
//
//     return favBtn
//   },
//
//   makeDelButton() {
//     const delBtn = document.createElement('button')
//     const innerText = document.createTextNode('\u00d7')
//     delBtn.className = 'delete'
//     delBtn.appendChild(innerText)
//     delBtn.value = false
//     delBtn.id = 'list'
//     delBtn.addEventListener('click', this.handleDelete.bind(this))
//     return delBtn
//   },
//
//   makeUpButton() {
//     const upBtn = document.createElement('button')
//     const innerText = document.createTextNode('\u25b2')
//     upBtn.className = 'upArrow'
//     upBtn.appendChild(innerText)
//     upBtn.value = '0'
//     upBtn.addEventListener('click', this.handleMove.bind(this))
//
//     return upBtn
//   },
//
//   makeDownButton() {
//     const downBtn = document.createElement('button')
//     const innerText = document.createTextNode('\u25bc')
//     downBtn.className = 'dwnArrow'
//     downBtn.appendChild(innerText)
//     downBtn.value = '1'
//     downBtn.addEventListener('click', this.handleMove.bind(this))
//
//     return downBtn
//   },
//
//   handleFavorite(ev) {
//     ev.preventDefault()
//     const favorite = ev.target
//
//     if (favorite.value === 'false') {
//       favorite.style.backgroundColor = '#db4141'
//       favorite.style.borderColor = "#db4141"
//       favorite.style.color = '#ffdd02'
//       favorite.value = true
//     }
//
//     else if (favorite.value === 'true') {
//       favorite.style.backgroundColor = null
//       favorite.style.borderColor = null
//       favorite.style.color = null
//       favorite.value = false
//     }
//   },
//
//   handleDelete(ev) {
//     const delBtn = ev.target
//     delBtn.parentElement.outerHTML = ""
//     },
//
//   handleMove(ev) {
//     ev.preventDefault()
//     const btn = ev.target
//     const thisItem = btn.parentElement
//     const nextItem = thisItem.nextSibling
//     const prevItem = thisItem.previousSibling
//
//     if (btn.value === '0' && prevItem != null) {
//       this.list.insertBefore(thisItem, prevItem)
//     }
//
//     else if (btn.value === '1' && nextItem != null) {
//       this.list.insertBefore(prevItem, thisItem)
//     }
//
//     this.save()
//   },
//
//   renderListItem(flick) {
//     const item = document.createElement('li')
//     item.textContent = flick.name
//
//     const favBtn = this.makeFavButton()renderListItem(flick) {
  //   const template = document.querySelector('.flick.template') //We don't need to create a new li anymore because we've already made the li in the HTML. Instead, we will just select the HTML li that we've created
  //   // const item = document.createElement('li')
  //   item.textContent = flick.name
  //   item.dataset.id = flick.id    //Add data attribute to each list item. Makes it easier to look for it using querySelector.
  //   return item
  // },
//     item.appendChild(favBtn)
//     const upBtn = this.makeUpButton()
//     item.appendChild(upBtn)
//     const downBtn = this.makeDownButton()
//     item.appendChild(downBtn)
//     const delBtn = this.makeDelButton()
//     item.appendChild(delBtn)
//
//     item.id = 'list'
//
//     return it  //   const template = document.querySelector('.flick.template') //We don't need to create a new li anymore because we've already made the li in the HTML. Instead, we will just select the HTML li that we've created
  //   // const item = document.createElement('li')
  //   item.textContent = flick.name
  //   item.dataset.id = flick.id    //Add data attribute to each list item. Makes it easier to look for it using querySelector.
  //   return item
  // },
//   },
//
//   addFlick(ev) {
//     ev.preventDefault()
//     const f = ev.target
//     //const flickName = ev.target.flickName.value   //This will select the value within the flickName input textbox. Without .value, it will select the actual input but not the value.
//     const flick = {
//       id: this.max + 1,
//       name: f.flickName.value,
//     }
//
//     const listItem = this.renderListItem(flick)
//
//     this.list.appendChild(listItem)
//
//     this.flicks.push(listItem)
//
//     ++ this.max
//   },
// }
//
// app.init({
//   formSelector: '#flick-form',
//   listSelector: '#flick-list',
//
// })

//DAY 4
const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document
      .querySelector(selectors.listSelector)
    this.template = document
      .querySelector(selectors.templateSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addFlickViaForm.bind(this))

    this.load()
  },

  load() {
    // Get the JSON string out of localStorage
    const flicksJSON = localStorage.getItem('flicks')

    // Turn that into an array
    const flicksArray = JSON.parse(flicksJSON)

    // Set this.flicks to that array
    if (flicksArray) {
      flicksArray
        .reverse()
        .map(this.addFlick.bind(this))
    }
  },

  addFlick(flick) {
    const listItem = this.renderListItem(flick)
    this.list
      .insertBefore(listItem, this.list.firstChild)

    ++ this.max
    this.flicks.unshift(flick)
    this.save()
  },

  addFlickViaForm(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    this.addFlick(flick)

    f.reset()
  },

  save() {
    localStorage
      .setItem('flicks', JSON.stringify(this.flicks))

  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.flick-name')
      .textContent = flick.name

    item
      .querySelector('button.remove')
      .addEventListener('click', this.removeFlick.bind(this))
    item
      .querySelector('button.fav')
      .addEventListener('click', this.favFlick.bind(this, flick))

    return item
  },

  removeFlick(ev) {
    const listItem = ev.target.closest('.flick')

    // Find the flick in the array, and remove it
    for (let i = 0; i < this.flicks.length; i++) {
      const currentId = this.flicks[i].id.toString()
      if (listItem.dataset.id === currentId) {
        this.flicks.splice(i, 1)
        break
      }
    }

    listItem.remove()
    this.save()
  },

  favFlick(ev) {
    console.log(arguments)
    const listItem = ev.target.closest('.flick')
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template',
})
