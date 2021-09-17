// Query selectors
const waitlistInput = document.querySelector('.waitlist-input')
const waitlistButton = document.querySelector('.waitlist-button')
const waitlistContainer = document.querySelector('.waitlist-container')
const waitlist = document.querySelector('.waitlist-list')
const error = document.querySelector('.error')
const showButton = document.querySelector('.waitlist-show')
const numberWaitlist = document.querySelector('.no-waitlist')
const numberFreeslots = document.querySelectorAll('.no-freeslots')
const autocompleteInput = document.getElementById('history-input')
const clearHistoryButton = document.querySelector('.history-clearbtn')
const searchHistoryButton = document.querySelector('.history-searchbtn')

// Global variables, constants
const waitlistLocalStoreName = 'waitlist'
const historyLocalStoreName = 'history'
let searched = false

// Event listeners
document.addEventListener('DOMContentLoaded', getList)
waitlistButton.addEventListener('click', addWaitlist)
waitlist.addEventListener('click', deleteItem)
showButton.addEventListener('click', showList)
clearHistoryButton.addEventListener('click', clearHistory)
searchHistoryButton.addEventListener('click', searchHistory)
autocomplete()

function addWaitlist(e) {
  e.preventDefault()
  if (!waitlistInput.value) {
    alert('Please enter a name!')
    return
  }

  const data = {}
  data.customerName = waitlistInput.value.trim()
  data.start = new Date().toUTCString()
  data.id = Math.floor(Math.random() * 100000000)

  const totalCount = waitlist.getElementsByTagName('div').length
  if (totalCount < 25) {
    createEntry(data)
  }
  updateStatus()

  // Clear input
  waitlistInput.value = ''
}

function createEntry(data, save = true) {
  const newEntry = document.createElement('div')
  newEntry.classList.add('waitlist-newentry')

  const customerName = document.createElement('li')
  customerName.innerText = data.customerName
  customerName.classList.add('waitlist-item')
  newEntry.appendChild(customerName)

  const start = document.createElement('li')
  start.innerText = `ticket no. ${data.id}`
  start.classList.add('waitlist-item')
  newEntry.appendChild(start)

  // Save to localstorage
  save ? saveLocal(data, waitlistLocalStoreName) : null

  // Delete button
  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Done'
  deleteButton.classList.add('delete-btn')
  newEntry.appendChild(deleteButton)

  // Add to waitlist
  waitlist.appendChild(newEntry)
}

function deleteItem(e) {
  const item = e.target
  const entry = item.parentElement

  if (item.classList[0] === 'delete-btn') {
    const data = checkLocalStorage(waitlistLocalStoreName)
    const id = Number(entry.getElementsByTagName('li')[1].innerText.match(/ticket no. (.*)/i)[1])
    const servedCustomer = data.find((item) => item.id === id)
    servedCustomer.end = new Date().toUTCString()

    saveLocal(servedCustomer, historyLocalStoreName)
    autocomplete()
    entry.remove()
    removeLocal(id, waitlistLocalStoreName)
  }

  if (item.classList[0] === 'history-deletebtn') {
    const id = Number(entry.firstChild.innerText.match(/Ticket (.*)/i)[1])
    while (entry.firstChild) {
      entry.removeChild(entry.lastChild)
    }
    removeLocal(id, historyLocalStoreName)
    autocompleteInput.value = ''
    autocomplete()
  }
  updateStatus()
}

function updateStatus() {
  totalCount = waitlist.getElementsByTagName('div').length
  numberWaitlist.innerText = `${totalCount} people waiting`
  for (const item of numberFreeslots) {
    item.innerText = `${25 - totalCount} free slots available`
  }
  error.innerText = ''
  if (totalCount === 25) {
    error.innerText = 'There are no more slots available, please attend to existing customers!'
  }
}

function showList() {
  const text = showButton.innerText
  const showText = 'Show List'
  const hideText = 'Hide List'

  if (totalCount === 0) return
  if (text === showText) {
    showButton.innerText = hideText
  }
  if (text === hideText) {
    showButton.innerText = showText
  }
  waitlistContainer.classList.toggle('show')
}

function getList() {
  const data = checkLocalStorage(waitlistLocalStoreName)
  if (!data) {
    // reset
    while (waitlistContainer.firstChild) {
      waitlistContainer.removeChild(waitlistContainer.lastChild)
    }
  }
  const dontSaveToLocalStore = false
  data.forEach((entry) => {
    createEntry(entry, dontSaveToLocalStore)
  })
  updateStatus()
}

function saveLocal(entry, storageName) {
  const data = checkLocalStorage(storageName)
  data.push(entry)
  localStorage.setItem(storageName, JSON.stringify(data))
}

function removeLocal(entry, storageName) {
  const data = checkLocalStorage(storageName)
  const index = data.map((item) => item.id).indexOf(entry)
  data.splice(index, 1)
  localStorage.setItem(storageName, JSON.stringify(data))
}

function checkLocalStorage(storageName) {
  if (localStorage.getItem(storageName) === null) {
    return []
  }
  return JSON.parse(localStorage.getItem(storageName))
}

function clearHistory(e) {
  e.preventDefault()
  const confirmDelete = confirm('Are you sure you would like to clear all previous history?')
  if (confirmDelete) {
    localStorage.removeItem(historyLocalStoreName)
    autocomplete()
  }
}

function searchHistory(e) {
  e.preventDefault()

  const container = document.getElementById('history-resultcontainer')
  let value = autocompleteInput.value.match(/ticket no. (.*)/i)
  value = value === null ? '' : Number(value[1])
  const data = checkLocalStorage(historyLocalStoreName)
  const validSearchInput = data.find((item) => item.id === value)
  const start = validSearchInput?.start
  const end = validSearchInput?.end
  const waitTime = ((Date.parse(end) - Date.parse(start)) / 1000 / 60).toFixed(2)

  // reset
  while (container.firstChild) {
    container.removeChild(container.lastChild)
  }

  if (validSearchInput) {
    const headerDiv = document.createElement('div')
    headerDiv.classList.add('history-resultheader')
    headerDiv.innerText = `Ticket ${validSearchInput?.id}`
    container.appendChild(headerDiv)
  }

  const resultDiv = document.createElement('div')
  resultDiv.classList.add('history-result')
  resultDiv.innerText = validSearchInput
    ? `${validSearchInput?.customerName} was served on ${start} and waited for ${waitTime} mins`
    : 'Please try again, no such entry'
  container.appendChild(resultDiv)

  if (validSearchInput) {
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete Entry'
    deleteButton.classList.add('history-deletebtn')
    deleteButton.addEventListener('click', deleteItem)
    container.appendChild(deleteButton)
  }

  searched = validSearchInput ? true : false
}

function autocomplete() {
  let currentFocus = -1
  const data = checkLocalStorage(historyLocalStoreName)

  autocompleteInput.addEventListener('input', onInputType(data))
  autocompleteInput.addEventListener('keydown', onKeyDown(currentFocus))

  document.addEventListener('click', function (e) {
    closeAutocompleteList(e.target)
  })
}

function onInputType(data) {
  return (e) => {
    if (searched) {
      autocompleteInput.value = e.data
      searched = false
    }
    const value = autocompleteInput.value
    closeAutocompleteList()
    if (!value) return false
    const autocompleteContainer = document.createElement('div')
    autocompleteContainer.setAttribute('id', 'autocomplete-list')
    autocompleteContainer.setAttribute('class', 'autocomplete-items')
    autocompleteInput.parentNode.appendChild(autocompleteContainer)

    for (const customerHistory of data) {
      const customerName = customerHistory.customerName
      const customerID = customerHistory.id.toString()
      if (customerName.substr(0, value.length).toUpperCase() === value.toUpperCase()) {
        const dataDiv = document.createElement('div')
        dataDiv.innerHTML = `<strong>${customerName.substr(0, value.length)}</strong>`
        dataDiv.innerHTML += customerName.substr(value.length)
        dataDiv.innerHTML += `<span style='color:grey'> - ticket no. ${customerID}</span>`
        dataDiv.innerHTML += `<input type="hidden" value="${customerName} - ticket no. ${customerID}">`
        dataDiv.addEventListener('click', function (e) {
          autocompleteInput.value = dataDiv.getElementsByTagName('input')[0].value
          closeAutocompleteList()
        })
        autocompleteContainer.appendChild(dataDiv)
      }
      if (customerID.substr(0, value.length) === value) {
        const dataDiv = document.createElement('div')
        dataDiv.innerHTML = `<strong>${customerID.substr(0, value.length)}</strong>`
        dataDiv.innerHTML += customerID.substr(value.length)
        dataDiv.innerHTML += `<span style='color:grey'> - customer ${customerName}</span>`
        dataDiv.innerHTML += `<input type="hidden" value="${customerName} - ticket no. ${customerID}">`
        dataDiv.addEventListener('click', function (e) {
          autocompleteInput.value = dataDiv.getElementsByTagName('input')[0].value
          closeAutocompleteList()
        })
        autocompleteContainer.appendChild(dataDiv)
      }
    }
  }
}

function onKeyDown(currentFocus) {
  return (e) => {
    const autocompleteList = document.getElementById('autocomplete-list')
    const items = autocompleteList ? autocompleteList.getElementsByTagName('div') : null
    if (searched) {
      currentFocus = -1
    }
    if (e.keyCode === 40 && items) {
      // arrow down
      currentFocus++
      currentFocus = checkFocusBounds(items, currentFocus)
      addActive(items, currentFocus)
      items[currentFocus]?.scrollIntoView(true)
    }
    if (e.keyCode === 38 && items) {
      // arrow up
      currentFocus--
      currentFocus = checkFocusBounds(items, currentFocus)
      addActive(items, currentFocus)
      items[currentFocus]?.scrollIntoView(true)
    }
    if (e.keyCode === 13 && currentFocus > -1 && items?.length > 0) {
      // enter
      items[currentFocus]?.click()
    }
  }
}

function addActive(items, currentFocus) {
  // reset
  for (const item of items) {
    item.classList.remove('autocomplete-active')
  }
  if (currentFocus > -1 && items.length > 0) {
    items[currentFocus].classList.add('autocomplete-active')
  }
}

function checkFocusBounds(items, currentFocus) {
  if (currentFocus >= items.length) currentFocus = 0
  if (currentFocus < 0) currentFocus = items.length - 1
  return currentFocus
}

function closeAutocompleteList(element) {
  // close all autocomplete lists in the document except arg
  const autocompleteItems = document.getElementsByClassName('autocomplete-items')
  for (const item of autocompleteItems) {
    if (element !== item && element !== autocompleteInput) {
      item.parentNode.removeChild(item)
    }
  }
}

// Scrolling Animation
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('in-view', entry.isIntersecting)
  })
}
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.35,
}
const observer = new IntersectionObserver(callback, options)
const sections = [
  document.getElementById('home'),
  document.getElementById('waitlist'),
  document.getElementById('history'),
]
sections.forEach((section) => observer.observe(section))
