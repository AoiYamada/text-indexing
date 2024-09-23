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

      console.log(abstract)

      articles.push({
        title: article.MedlineCitation.Article.ArticleTitle,
        abstract:
          typeof abstract.AbstractText === "string"
            ? abstract.AbstractText
            : Array.isArray(abstract.AbstractText) ? abstract.AbstractText.map(nestedTextToString).join(' '): abstract.AbstractText["#text"],
      });

      i++;
    }

    return articles;
  }
}

export default PubmedParser;

function nestedTextToString(abstractText: AbstractText) {
     if(typeof abstractText === "string") {
        return abstractText
     } else {
        return abstractText["#text"]
     }
}
