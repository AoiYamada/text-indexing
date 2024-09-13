enum DocType {
  pubmed = "pubmed",
  twitter = "twitter",
}

export default DocType;

export const DocTypeValues = Object.values(DocType) as [string, ...string[]];
