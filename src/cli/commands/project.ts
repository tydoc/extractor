import Command, { flags } from '@oclif/command'
import { fromProject, renderMarkdown } from '../../'

export class Project extends Command {
  static strict = false
  static args = [{ name: 'filePath', required: true }]
  static flags = {
    markdown: flags.boolean({ default: true, char: 'm', exclusive: ['json'] }),
    json: flags.boolean({ default: false, char: 'j', exclusive: ['markdown'] }),
    'flat-terms-section': flags.boolean({
      default: false,
      description:
        'For use with markdown rendering. Whether or not the API terms section should have a title and nest its term entries under it. If false, term entry titles are de-nested by one level.',
    }),
  }
  async run() {
    const { flags, argv } = this.parse(Project)
    // const existsResult = fs.exists(args.filePath)

    // if (existsResult === false) {
    //   return this.error(`No module found at ${args.filePath}`)
    // }

    // let docs
    // if (existsResult === 'dir') {
    //   docs = )
    // } else {
    //   docs = extractDocsFromProject(args.filePath)
    // }

    const docs = fromProject({ entrypoints: argv })

    if (flags.json) {
      this.log(JSON.stringify(docs, null, 2))
      return
    }

    if (flags.markdown) {
      const options = {
        flatTermsSection: flags['flat-terms-section'],
      }
      this.log(renderMarkdown(docs, options))
      return
    }
  }
}
