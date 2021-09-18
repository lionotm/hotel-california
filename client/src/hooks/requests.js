// for production in containers
const API_URL = 'v1'

// for local testing
// const API_URL = 'http://localhost:8000/v1'

async function httpGetMaxSlots() {
  const response = await fetch(`${API_URL}/waitlist/maxslots`)
  return await response.json()
}

async function httpGetWaitlist() {
  const response = await fetch(`${API_URL}/waitlist`)
  return await response.json()
}

async function httpAddCustomer(formData) {
  try {
    return await fetch(`${API_URL}/waitlist`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
  } catch (error) {
    return { ok: false }
  }
}

async function httpRemoveCustomer(ticketNumber) {
  try {
    return await fetch(`${API_URL}/waitlist/${ticketNumber}`, {
      method: 'delete',
    })
  } catch (error) {
    return { ok: false }
  }
}

async function httpGetHistory() {
  const response = await fetch(`${API_URL}/waitlist/history`)
  return await response.json()
}

async function httpRemoveHistory(ticketNumbers) {
  try {
    return await fetch(`${API_URL}/waitlist/history`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketNumbers),
    })
  } catch (error) {
    return { ok: false }
  }
}

export {
  httpGetWaitlist,
  httpAddCustomer,
  httpRemoveCustomer,
  httpGetHistory,
  httpRemoveHistory,
  httpGetMaxSlots,
}
