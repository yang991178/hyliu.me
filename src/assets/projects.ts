import fluentReader from './projects/fluent-reader.json'
import fluentReaderLite from './projects/fluent-reader-lite.json'
import dailycal from './projects/dailycal.json'
import nirvanaNews from './projects/nirvana-news.json'
import smsCouncil from './projects/sms-council.json'
import bookstand from './projects/bookstand.json'
import saa from './projects/saa.json'

export default [
    fluentReader,
    fluentReaderLite,
    dailycal,
    nirvanaNews,
    smsCouncil,
    bookstand,
    saa,
] as Project[]

declare global {
    type Project = {
        slug: string;
        title: string;
        slogan: string;
        stack?: string[];
        links?: [string, string][];
        wide?: boolean;
        screenshot?: boolean;
        screenshotShadow?: boolean;
        themeColor?: string;
        textColor?: string;
    }
}