import { FigmaFile } from './types/figma-api.types'

export type FigmaFetcherOptions = {
  baseUrl?: string
  version?: string
  fileKey: string
  accessToken: string
}

const BASE_URL = 'https://api.figma.com/'
const BASE_VERSION = 'v1'

export class FigmaFetcher {
  private readonly baseUrl: string
  private readonly version: string

  private readonly fileKey: string
  private readonly accessToken: string

  public constructor(options: FigmaFetcherOptions) {
    this.baseUrl = options.baseUrl ?? BASE_URL
    this.version = options.version ?? BASE_VERSION
    this.fileKey = options.fileKey
    this.accessToken = options.accessToken
  }

  public async fetchFile() {
    const url = this.baseUrl + this.version + '/files/' + this.fileKey
    const init: RequestInit = { headers: { 'X-Figma-Token': this.accessToken } }

    const response = await fetch(url, init)

    return await response.json() as FigmaFile
  }
}
