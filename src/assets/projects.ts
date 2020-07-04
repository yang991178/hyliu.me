import fluentReader from './projects/fluent-reader.json'
import nirvanaNews from './projects/nirvana-news.json'
import smsCouncil from './projects/sms-council.json'
import bookstand from './projects/bookstand.json'

export default [
    fluentReader,
    nirvanaNews,
    smsCouncil,
    bookstand,
] as Project[]

declare global {
    type Project = {
        slug: string;
        icon?: string;
        title: string;
        slogan: string;
        screenshot?: string;
        themeColor?: string;
        textColor?: string;
    }
}