import { XMLParser } from "fast-xml-parser";
import { AbstractText, PubmedRawData } from "./types";
import { int } from "../../../types/alias";

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

  public parse(xml: RawXML, count?: int): Pubmed[] {
    const data: PubmedRawData = this._parser.parse(xml);
    // TODO: validation

    let i = 0;
    const articles: Pubmed[] = [];
    const rawArticles = Array.isArray(data.PubmedArticleSet.PubmedArticle)
      ? data.PubmedArticleSet.PubmedArticle
      : [data.PubmedArticleSet.PubmedArticle];

    for (const article of rawArticles) {
      if (count && i >= count) {
        break;
      }

      const abstract = article.MedlineCitation.Article.Abstract;

      articles.push({
        title: article.MedlineCitation.Article.ArticleTitle,
        abstract: Array.isArray(abstract.AbstractText)
          ? abstract.AbstractText.map(nestedTextToString).join(" ")
          : nestedTextToString(abstract.AbstractText),
      });

      i++;
    }

    return articles;
  }
}

export default PubmedParser;

function nestedTextToString(abstractText: AbstractText) {
  return typeof abstractText === "string"
    ? abstractText
    : abstractText["#text"];
}
