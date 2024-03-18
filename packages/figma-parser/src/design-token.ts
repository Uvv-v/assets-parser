type TProperties = Record<string, string>

export default abstract class DesignToken {
  private node

  protected constructor(options) {
  }

  protected abstract getProperties(): TProperties

  protected abstract getMarkdown(): string
}
