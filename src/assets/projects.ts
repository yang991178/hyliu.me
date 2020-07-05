import fluentReader from './projects/fluent-reader.json'
import dailycal from './projects/dailycal.json'
import nirvanaNews from './projects/nirvana-news.json'
import smsCouncil from './projects/sms-council.json'
import bookstand from './projects/bookstand.json'
import saa from './projects/saa.json'

export default [
    fluentReader,
    dailycal,
    nirvanaNews,
    smsCouncil,
    bookstand,
    saa,
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