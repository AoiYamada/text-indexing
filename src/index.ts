import { readFileSync } from "fs";
import PubmedParser from "./parsers/PubmedParser";

const xml = readFileSync("./data-source/pubmed24n1219.xml", {
  encoding: "utf-8",
});

const articles = new PubmedParser().parseArticles(xml);

// Demonstrate the output
console.log(JSON.stringify(articles, null, 2));
// [
//   {
//     "title": "GRP94 in cerebrospinal fluid may contribute to a potential biomarker of depression: Based on proteomics.",
//     "abstract": "The present study was designed to investigate potential biomarkers of depression and targets of antidepressants from the perspective of hippocampal endoplasmic reticulum stress (ERS) based on cerebrospinal fluid (CSF) proteomics. Firstly, a six-week depression model was established and treated with fluoxetine (FLX). We found antidepressant-FLX could ameliorate depression-like behaviors and cognition in depressed rats caused by chronic unpredictable mild stress (CUMS). FLX significantly increased neuronal numbers in dentate gyrus (DG) and CA3 regions of hippocampus. CSF proteome data revealed thirty-seven differentially expressed proteins (DEPs) co-regulated by CUMS and FLX, including GRP94 and EIF2α. Results of Gene Oncology (GO) annotation and KEGG pathway enrichment for DEPs mainly included PERK-mediated unfolded protein response, endoplasmic reticulum, and translational initiation. The expression levels of GRP94, p-PERK, p-EIF2α, CHOP and Caspase-12 were increased in hippocampus of CUMS rats, and FLX worked the opposite way. FLX had strong affinity and binding activity with GRP94 protein, and four key proteins on the PERK pathway (PERK, EIF2α, p-EIF2α, CHOP). We proposed that FLX may exert antidepressant effects and neuroprotective action by alleviating excessive activation of the hippocampal PERK pathway and reducing neuronal deficits in depressed rats. PERK, EIF2α, p-EIF2α, and CHOP may be potential targets for antidepressant-FLX. GRP94 in CSF may be a potential biomarker of depression and the therapeutic effects of antidepressants."
//   },
//   {
//     "title": "The application of ferritin in transporting and binding diverse metal ions.",
//     "abstract": "The ferritin cage can not only load iron ions in its inner cavity, but also has the capacity to carry other metal ions, thus constructing a new biological nano-transport system. The nanoparticles formed by ferritin and minerals can be used as ingredients of mineral supplements, which overcome the shortcomings of traditional mineral ingredients such as low bioavailability. Moreover, ferritin can be used to remove heavy metal ions from contaminated food. Silver and palladium nanoparticles formed by ferritin are also applied as anticancer agents. Ferritin combined with metal ions can be also used to detect harmful substances. This review aims to provide a comprehensive overview of ferritin's function in transporting and binding metal ions, and discusses the limitations and future prospects, which offers valuable insights for the application of ferritin in mineral supplements, food detoxifiers, anticancer agents, and food detections."
//   },
//   {
//     "title": "Design and characterization of tannic acid/ε-polylysine biocomposite packaging films with excellent antibacterial and antioxidant properties for beef preservation.",
//     "abstract": "The shelf life of beef is shortened by microbial infection, which limits its supply in the market. Active packaging film is expected to overcome this difficulty. In this study, an antibacterial/antioxidant SS-ε-PL-TA biocomposite film made by soy protein isolate/sodium alginate/ε-polylysine/tannic acid was designed and prepared. Due to the formation of hydrogen bonds and enhanced hydrophobic interactions, the biocomposite film showed enhanced mechanical property. Tensile strength increased from 22.8 ± 2.59 MPa to 64.34 ± 6.22 MPa, and elongation at break increased from 7.70 ± 1.07 % to 13.98 ± 0.22 %. The composite film displayed excellent antibacterial activity owing to the damage to cell membranes and biofilms of bacteria. Furthermore, the antioxidant activity also significantly increased (DPPH ∙ scavenging activity was 78.0 %). The shelf life of beef covered with the SS-ε-PL-TA film was extended by 3 days compared to the control group by decreasing lipid oxidation and inhibiting bacterial growth, showing a good application potential in food packaging."
//   },
//   {
//     "title": "A comprehensive \"quality-quantity-activity\" approach based on portable near-infrared spectrometer and membership function analysis to systematically evaluate spice quality: Cinnamomum cassia as an example.",
//     "abstract": "Spices have long been popular worldwide. Besides serving as aromatic and flavorful food and cooking ingredients, many spices exhibit notable bioactivity. Quality evaluation methods are essential for ensuring the quality and flavor of spices. However, existing methods typically focus on the content of particular components or certain aspects of bioactivity. For a systematic evaluation of spice quality, we herein propose a comprehensive \"quality-quantity-activity\" approach based on portable near-infrared spectrometer and membership function analysis. Cinnamomum cassia was used as a representative example to illustrate this approach. Near-infrared spectroscopy and chemometric methods were combined to predict the geographical origin, cinnamaldehyde content, ash content, antioxidant activity, and integrated membership function value. All the optimal prediction models displayed good predictive ability (correlation coefficient of prediction > 0.9, residual predictive deviation > 2.1). The proposed approach can provide a valuable reference for the rapid and comprehensive quality evaluation of spices."
//   },
//   {
//     "title": "A novel colorimetric and fluorometric dual-signal identification of organics and Baijiu based on nanozymes with peroxidase-like activity.",
//     "abstract": "Nanozymes were nanomaterials with enzymatic properties. They had diverse functions, adjustable catalytic activity, high stability, and easy large-scale production, attracting interest in biosensing. However, nanozymes were scarcely applied in Baijiu identification. Herein, a colorimetric and fluorometric dual-signal determination mediated by a nanozyme-HO-TMB system was developed for the first time to identify organics and Baijiu. Since the diverse peroxidase-like activity of nanozymes, resulted in different degrees of oxidized TMB. Based on this, 21 organics were identified qualitatively and quantitatively by colorimetric method with a rapid response (<12 min), broad linearity (0.0005-35 mM), and low detection limits (a minimum of 30 nM for glutaric acids). Furthermore, the fluorometric method exhibited excellent potential for accurate determination of organics, with detection ranges of 2-200 µmol/L (LOD: 0.22 µmol/L) for l-ascorbic acid and 2-300 µmol/L (LOD: 0.59 µmol/L) for guaiacol. Finally, the sensor was successfully applied to identify fake Baijiu and Baijiu from 16 different brands."
//   }
// ]
