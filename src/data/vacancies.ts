export type PlacementType = "permanent" | "interim" | "secondment" | "executive";
export type Sector = "industrie" | "bouw" | "offshore" | "energie" | "scheepsbouw";
export type Location = "rotterdam" | "amsterdam" | "den haag" | "amersfoort" | "ijmuiden" | "tilburg" | "deurne" | "midden nederland";

export interface Vacancy {
  slug: string;
  title: string;
  type: PlacementType;
  sector: Sector;
  location: string;
  locationKey: Location;
  salary: string;
  postedAgo: string;
  recruiterInitials: string;
  recruiterName: string;
  recruiterEmail: string;
  recruiterTitle: string;
  description: string;
  whatYouDo: string[];
  whatYouBring: string[];
  whatOnOffer: string[];
  recruiterNote: string;
}

export const vacancies: Vacancy[] = [
  {
    slug: "interim-senior-project-buyer-rotterdam",
    title: "Interim Senior Project Buyer",
    type: "interim",
    sector: "scheepsbouw",
    location: "Rotterdam",
    locationKey: "rotterdam",
    salary: "€700–850 / day",
    postedAgo: "2 days ago",
    recruiterInitials: "MS",
    recruiterName: "Maarten Smits van Oyen",
    recruiterEmail: "maarten.smitsvanoyen@xentys.nl",
    recruiterTitle: "Consultant — Permanent & Interim",
    description:
      "A leading shipbuilding company in the Rotterdam region is looking for an experienced interim Senior Project Buyer to join their procurement team on a 6-month contract with likely extension.",
    whatYouDo: [
      "Managing the full procurement cycle for project-specific materials and subcontracts",
      "Conducting supplier negotiations and contract management for high-value items",
      "Collaborating with project managers and engineering to align procurement timelines",
      "Identifying and mitigating supply chain risks across active projects",
      "Reporting on procurement performance to senior stakeholders",
    ],
    whatYouBring: [
      "5+ years of procurement experience in a project-based or maritime/offshore environment",
      "Strong negotiation skills and experience managing strategic supplier relationships",
      "Comfortable working in a fast-moving, technically complex environment",
      "HBO or WO working level, preferably NEVI I or II certified",
      "Available immediately or within 2 weeks",
    ],
    whatOnOffer: [
      "Day rate: €700–850 depending on experience",
      "6-month contract, high probability of extension",
      "Hybrid working: 3 days on-site, 2 days remote",
    ],
    recruiterNote:
      "This client builds some of the most technically demanding vessels in the Netherlands. The procurement team is lean, experienced, and genuinely respected within the business.",
  },
  {
    slug: "strategic-buyer-energy-transition-amersfoort",
    title: "Strategic Buyer — Energy Transition",
    type: "permanent",
    sector: "energie",
    location: "Amersfoort",
    locationKey: "amersfoort",
    salary: "€75,000–85,000 / year",
    postedAgo: "5 days ago",
    recruiterInitials: "AU",
    recruiterName: "Aurelia Bredet",
    recruiterEmail: "aurelia.bredet@xentys.nl",
    recruiterTitle: "Consultant — Permanent Recruitment",
    description:
      "A fast-growing energy transition company in Amersfoort is looking for a Strategic Buyer to lead category strategy for critical components in their manufacturing operations.",
    whatYouDo: [
      "Develop and implement category strategies for direct and indirect spend",
      "Lead supplier selection, qualification, and performance management",
      "Drive cost reduction and risk mitigation across the supply base",
      "Collaborate with R&D and engineering on new product introduction",
    ],
    whatYouBring: [
      "5+ years in strategic procurement, preferably in an industrial or energy environment",
      "Proven experience with category management and supplier development",
      "Strong analytical skills and commercial mindset",
      "NEVI II or equivalent preferred",
    ],
    whatOnOffer: [
      "Salary: €75,000–85,000 depending on experience",
      "25 days holiday + pension + lease car",
      "Hybrid working policy",
    ],
    recruiterNote:
      "This company is genuinely doing interesting work in the energy transition — not greenwashing. The procurement function has real influence on product development.",
  },
  {
    slug: "purchaser-maritime-ijmuiden",
    title: "Purchaser — Maritime",
    type: "permanent",
    sector: "offshore",
    location: "IJmuiden",
    locationKey: "ijmuiden",
    salary: "€5,500 / month",
    postedAgo: "1 week ago",
    recruiterInitials: "AB",
    recruiterName: "Adriaan Brok",
    recruiterEmail: "adriaan.brok@xentys.nl",
    recruiterTitle: "Consultant — Interim Specialist",
    description:
      "An offshore and maritime company based in IJmuiden is looking for an experienced Purchaser to manage tactical procurement for their vessel operations and maintenance activities.",
    whatYouDo: [
      "Manage day-to-day procurement of materials, spare parts, and services",
      "Maintain and develop supplier relationships in the maritime supply base",
      "Process purchase orders and monitor delivery performance",
      "Support technical departments with procurement advice",
    ],
    whatYouBring: [
      "3+ years of purchasing experience, preferably in maritime or offshore",
      "Knowledge of technical materials and maritime equipment",
      "Structured, hands-on, and comfortable in an operational environment",
    ],
    whatOnOffer: [
      "Salary: €5,500 per month",
      "28 days holiday + good secondary benefits",
      "On-site role with some flexibility",
    ],
    recruiterNote:
      "A stable company with a good team culture. The previous holder of this role was promoted internally — there's real room to grow here.",
  },
  {
    slug: "tactical-purchaser-maritime-rotterdam",
    title: "Tactical Purchaser — Maritime",
    type: "permanent",
    sector: "offshore",
    location: "Rotterdam",
    locationKey: "rotterdam",
    salary: "€70,000–78,000 / year",
    postedAgo: "3 days ago",
    recruiterInitials: "MS",
    recruiterName: "Maarten Smits van Oyen",
    recruiterEmail: "maarten.smitsvanoyen@xentys.nl",
    recruiterTitle: "Consultant — Permanent & Interim",
    description: "Tactical procurement role for a maritime company in Rotterdam. Focused on operational purchasing across the vessel fleet.",
    whatYouDo: ["Tactical purchasing for vessel operations", "Supplier management and negotiation", "Purchase order processing and tracking"],
    whatYouBring: ["3–5 years tactical purchasing experience", "Maritime or offshore background preferred", "NEVI I certified"],
    whatOnOffer: ["Salary: €70,000–78,000", "Hybrid working", "Training budget"],
    recruiterNote: "Solid company, professional team, good growth opportunities for the right person.",
  },
  {
    slug: "interim-strategic-buyer-biomass-tilburg",
    title: "Interim Strategic Buyer — Biomass",
    type: "interim",
    sector: "energie",
    location: "Tilburg",
    locationKey: "tilburg",
    salary: "€600–750 / day",
    postedAgo: "4 days ago",
    recruiterInitials: "AB",
    recruiterName: "Adriaan Brok",
    recruiterEmail: "adriaan.brok@xentys.nl",
    recruiterTitle: "Consultant — Interim Specialist",
    description: "Energy company in Tilburg seeking an interim Strategic Buyer with biomass or renewable energy procurement experience.",
    whatYouDo: ["Develop biomass sourcing strategy", "Manage key supplier contracts", "Risk and compliance reporting"],
    whatYouBring: ["Strategic procurement experience", "Energy or biomass sector knowledge preferred", "Available within 2 weeks"],
    whatOnOffer: ["Day rate: €600–750", "6-month contract", "Hybrid working"],
    recruiterNote: "Fast-growing energy player. Real procurement autonomy from day one.",
  },
  {
    slug: "supply-chain-officer-mechatronics-deurne",
    title: "Supply Chain Officer — Mechatronics",
    type: "permanent",
    sector: "industrie",
    location: "Deurne",
    locationKey: "deurne",
    salary: "€4,200 / month",
    postedAgo: "1 week ago",
    recruiterInitials: "AU",
    recruiterName: "Aurelia Bredet",
    recruiterEmail: "aurelia.bredet@xentys.nl",
    recruiterTitle: "Consultant — Permanent Recruitment",
    description: "Industrial mechatronics manufacturer in Deurne looking for a Supply Chain Officer to manage inbound logistics and supplier coordination.",
    whatYouDo: ["Coordinate inbound supply chain", "Manage supplier delivery performance", "Support procurement with operational input"],
    whatYouBring: ["Supply chain or operational purchasing background", "ERP experience (SAP preferred)", "Analytical and hands-on"],
    whatOnOffer: ["Salary: €4,200/month", "25 days holiday", "Good pension"],
    recruiterNote: "Technically interesting environment. Stable company with low turnover.",
  },
  {
    slug: "strategisch-inkoper-modules-midden-nederland",
    title: "Strategisch Inkoper — Modules",
    type: "permanent",
    sector: "industrie",
    location: "Midden Nederland",
    locationKey: "midden nederland",
    salary: "€85,000–95,000 / year",
    postedAgo: "2 days ago",
    recruiterInitials: "MS",
    recruiterName: "Maarten Smits van Oyen",
    recruiterEmail: "maarten.smitsvanoyen@xentys.nl",
    recruiterTitle: "Consultant — Permanent & Interim",
    description: "High-tech machine builder in central Netherlands seeking a Strategic Buyer to lead procurement for complex module assemblies.",
    whatYouDo: ["Lead category strategy for module and sub-assembly procurement", "Supplier development and dual-sourcing", "New product introduction support"],
    whatYouBring: ["7+ years strategic procurement", "High-tech or mechanical industry background", "NEVI II or equivalent"],
    whatOnOffer: ["Salary: €85,000–95,000", "Bonus scheme", "Lease car"],
    recruiterNote: "Complex, technically challenging procurement environment. For someone who wants to do real strategic work.",
  },
  {
    slug: "tactical-purchaser-it-rotterdam",
    title: "Tactical Purchaser — IT",
    type: "permanent",
    sector: "offshore",
    location: "Rotterdam",
    locationKey: "rotterdam",
    salary: "€72,000–80,000 / year",
    postedAgo: "6 days ago",
    recruiterInitials: "AB",
    recruiterName: "Adriaan Brok",
    recruiterEmail: "adriaan.brok@xentys.nl",
    recruiterTitle: "Consultant — Interim Specialist",
    description: "Offshore company in Rotterdam seeks a Tactical Purchaser for IT hardware and software procurement.",
    whatYouDo: ["Manage IT procurement across hardware, software, and services", "Supplier negotiations and contract renewals", "Internal stakeholder management"],
    whatYouBring: ["3+ years purchasing experience", "IT category knowledge", "NEVI I preferred"],
    whatOnOffer: ["Salary: €72,000–80,000", "Hybrid working", "25 days holiday"],
    recruiterNote: "Interesting intersection of IT and offshore procurement. Good team, modern tooling.",
  },
  {
    slug: "category-manager-infrastructure-den-haag",
    title: "Category Manager — Infrastructure",
    type: "secondment",
    sector: "bouw",
    location: "Den Haag",
    locationKey: "den haag",
    salary: "€6,000–7,000 / month",
    postedAgo: "Today",
    recruiterInitials: "AU",
    recruiterName: "Aurelia Bredet",
    recruiterEmail: "aurelia.bredet@xentys.nl",
    recruiterTitle: "Consultant — Permanent Recruitment",
    description: "Construction and infrastructure company in Den Haag seeking a Category Manager on secondment basis.",
    whatYouDo: ["Lead category strategy for civil infrastructure spend", "Manage framework agreements and supplier panels", "Drive value and sustainability in sourcing"],
    whatYouBring: ["Category management experience in construction or infrastructure", "Strong stakeholder skills", "Commercially driven"],
    whatOnOffer: ["Monthly salary: €6,000–7,000", "On Xentys payroll", "Flexible term"],
    recruiterNote: "Large-scale infrastructure projects with real category complexity. On the Xentys payroll — full employment security.",
  },
];

export function getVacancyBySlug(slug: string): Vacancy | undefined {
  return vacancies.find((v) => v.slug === slug);
}
