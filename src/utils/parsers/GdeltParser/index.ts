import { int } from "@/types/alias";

type RawJson = string | Buffer

// sample data
type GdeltRawData = {
    url: string;
    title: string;
    content: string | null; // this value maybe null
}[];

type Gdelt = {
    url: string;
    title: string;
    content: string;
}


class GdeltParser {
    parse(jsonBuffer: RawJson, count?: int): Gdelt[] {
        const data: GdeltRawData = JSON.parse(jsonBuffer.toString());
        // TODO: validation

        let i = 0;
        const articles = [];
        for (const article of data) {
            if (count && i >= count) {
                break;
            }

            if (article.content === null) {
                continue
            }

            articles.push({
                url: article.url,
                title: article.title,
                content: article.content,
            });
            i++;
        }
        return articles;
    }
}

export default GdeltParser;
