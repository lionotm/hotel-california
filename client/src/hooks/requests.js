// for production
// const API_URL = 'v1'

// for local testing
const API_URL = 'http://localhost:8000/v1'

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
  } catch (errpr) {
    return { ok: false }
  }
}

async function httpRemoveCustomer(ticketNumber) {
  try {
    return await fetch(`${API_URL}/waitlist/${ticketNumber}`, {
      method: 'delete',
    })
  } catch (err) {
    return { ok: false }
  }
}

export { httpGetWaitlist, httpAddCustomer, httpRemoveCustomer }
