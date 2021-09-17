const API_URL = 'v1'

async function httpGetWaitlist() {
  const response = await fetch(`${API_URL}/waitlist`)
  return await response.json()
}

export { httpGetWaitlist }
