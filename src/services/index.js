import { parseRecording } from '../utils'

/**
 * Fetches an API response and parses the result
 * @param {string} endpoint 
 * @param {function} parse 
 */
async function callApi(endpoint, parse) {
  const fullUrl = (endpoint.indexOf(process.env['BASE_URL']) === -1) ? process.env['BASE_URL'] + endpoint : endpoint
  const response = await fetch(fullUrl, {
    headers: {
      Authorization: 'Basic ' + process.env['BASIC_TOKEN']
    }
  })
  const json = await response.json()
  return {
    result: typeof parse === 'function' ? parse(json) : json,
    nextPageUrl: json.next
  }
}

export const fetchRecordings = url => callApi(url, (json) => json.result.map(item => parseRecording(item.recordings)))
export const fetchBooks = url => callApi(url, (json) => json.result.map(item => item.audiobooks))
export const fetchPresenters = url => callApi(url, (json) => json.result.map(item => item.presenters))
export const fetchConferences = url => callApi(url, (json) => json.result.map(item => item.conferences))
export const fetchSponsors = url => callApi(url, (json) => json.result.map(item => item.sponsors))
export const fetchSeries = url => callApi(url, (json) => json.result.map(item => item.series))
export const fetchTopics = url => callApi(url, (json) => json.result.map(item => item.topics))
