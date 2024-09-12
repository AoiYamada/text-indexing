import { XMLParser } from "fast-xml-parser";
import { PubmedRawData } from "./types";

type RawXML = Parameters<XMLParser["parse"]>[0];

type Pubmed = {
  title: string;
  abstract: string;
};

class PubmedParser {
  private _parser: XMLParser;

  constructor() {
    this._parser = new XMLParser();
  }

  parseArticles(xml: RawXML): Pubmed[] {
    const data: PubmedRawData = this._parser.parse(xml);
    // const count = data.PubmedArticleSet.PubmedArticle.length;
    const count = 5;
    let i = 0;
    const articles: Pubmed[] = [];

    for (const article of data.PubmedArticleSet.PubmedArticle) {
      if (i >= count) {
        break;
      }

      const abstract = article.MedlineCitation.Article.Abstract;

      articles.push({
        title: article.MedlineCitation.Article.ArticleTitle,
        abstract:
          typeof abstract.AbstractText === "string"
            ? abstract.AbstractText
            : abstract.AbstractText["#text"],
      });

      i++;
    }

    return articles;
  }
}

export default PubmedParser;
