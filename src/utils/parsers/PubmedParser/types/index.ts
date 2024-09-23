import { int } from "../../../../types/alias";

// use https://json-5.com/ to convert json ts types
export type PubmedRawData = {
  "?xml": "";
  PubmedArticleSet: PubmedArticleSet;
};

type PubmedArticleSet = {
  PubmedArticle: PubmedArticle | PubmedArticle[];
};

type PubmedArticle = {
  MedlineCitation: MedlineCitation;
  PubmedData: PubmedData;
};

type PubmedData = {
  History: History;
  PublicationStatus: string;
  ArticleIdList: ArticleIdList;
};

type ArticleIdList = {
  ArticleId: (int | string)[];
};

type History = {
  PubMedPubDate: PubMedPubDate[];
};

type PubMedPubDate = {
  Year: int;
  Month: int;
  Day: int;
  Hour?: int;
  Minute?: int;
};

type MedlineCitation = {
  PMID: int;
  DateRevised: DateRevised;
  Article: Article;
  MedlineJournalInfo: MedlineJournalInfo;
  CitationSubset: string;
  KeywordList: KeywordList;
  CoiStatement: string;
};

type KeywordList = {
  Keyword: string[];
};

type MedlineJournalInfo = {
  Country: string;
  MedlineTA: string;
  NlmUniqueID: int;
  ISSNLinking: string;
};

type Article = {
  Journal: Journal;
  ArticleTitle: string;
  Pagination: Pagination;
  ELocationID: string[];
  Abstract: Abstract;
  AuthorList: AuthorList;
  Language: string;
  PublicationTypeList: PublicationTypeList;
  ArticleDate: DateRevised;
};

type PublicationTypeList = {
  PublicationType: string;
};

type AuthorList = {
  Author: Author[];
};

type Author = {
  LastName: string;
  ForeName: string;
  Initials: string;
  AffiliationInfo: AffiliationInfo;
};

type AffiliationInfo = {
  Affiliation: string;
};

type Abstract = {
  AbstractText: AbstractText | AbstractText[];
  CopyrightInformation: string;
};

export type AbstractText =
  | string
  | {
      sub: int[];
      "#text": string;
    };

type Pagination = {
  MedlinePgn: string;
};

type Journal = {
  ISSN: string;
  JournalIssue: JournalIssue;
  Title: string;
  ISOAbbreviation: string;
};

type JournalIssue = {
  Volume: int;
  PubDate: PubDate;
};

type PubDate = {
  Year: int;
  Month: string;
  Day: int;
};

type DateRevised = {
  Year: int;
  Month: int;
  Day: int;
};
