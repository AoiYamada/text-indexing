enum DocType {
  pubmed = "pubmed",
  gdelt = "gdelt",
}

export default DocType;

export const DocTypeValues = Object.values(DocType) as [string, ...string[]];
