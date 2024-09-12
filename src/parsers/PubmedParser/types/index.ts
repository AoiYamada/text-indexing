// use https://json-5.com/ to convert json ts types
export type PubmedRawData = {
  "?xml": "";
  PubmedArticleSet: PubmedArticleSet;
};

type PubmedArticleSet = {
  PubmedArticle: PubmedArticle[];
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
  ArticleId: (number | string)[];
};

type History = {
  PubMedPubDate: PubMedPubDate[];
};

type PubMedPubDate = {
  Year: number;
  Month: number;
  Day: number;
  Hour?: number;
  Minute?: number;
};

type MedlineCitation = {
  PMID: number;
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
  NlmUniqueID: number;
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
  AbstractText: AbstractText;
  CopyrightInformation: string;
};

type AbstractText =
  | string
  | {
      sub: number[];
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
  Volume: number;
  PubDate: PubDate;
};

type PubDate = {
  Year: number;
  Month: string;
  Day: number;
};

type DateRevised = {
  Year: number;
  Month: number;
  Day: number;
};
