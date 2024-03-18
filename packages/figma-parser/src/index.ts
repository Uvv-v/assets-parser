import { COLOR_CODE, log, logPerform } from 'logger'
import { FigmaFetcher, FigmaFetcherOptions } from './figma-fetcher'
import { extractTokens } from './figma-file-converter'

export type ParserOptions = {
  fetcherOptions: FigmaFetcherOptions
  themePrefix: RegExp
}

export class FigmaParser {
  private readonly fetcher: FigmaFetcher
  private readonly themePrefix: RegExp

  public constructor(options: ParserOptions) {
    this.fetcher = new FigmaFetcher(options.fetcherOptions)
    this.themePrefix = options.themePrefix
  }

  public async run() {
    log('FigmaParser', COLOR_CODE.CYAN)

    await logPerform('COMPLETED', async () => {
      const file = await logPerform(
        'Fetching FigmaFile',
        () => this.fetcher.fetchFile(),
      )

      const json = await logPerform(
        'Converting FigmaFile',
        async () => extractTokens(file, this.themePrefix),
      )
    }, { color: COLOR_CODE.ORANGE, donePostfix: ' in ' })
  }
}
