const API_URL = 'http://localhost:8000'

async function httpGetWaitlist() {
  const response = await fetch(`${API_URL}/waitlist`)
  return await response.json()
}

export { httpGetWaitlist }
