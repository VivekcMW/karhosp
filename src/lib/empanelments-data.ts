export type EmpanelmentType = "Private" | "Public" | "TPA";

export type Empanelment = {
  name: string;
  type: EmpanelmentType;
  key: string;
};

export const EMPANELMENTS: Empanelment[] = [
  { name: "Digit Insurance", type: "Private", key: "digit" },
  { name: "Manipal CIGNA", type: "Private", key: "manipalCigna" },
  { name: "HDFC ERGO General Insurance", type: "Private", key: "hdfcErgo" },
  { name: "IFFCO Tokio Insurance", type: "Private", key: "iffcoTokio" },
  { name: "ICICI Lombard Insurance", type: "Private", key: "iciciLombard" },
  { name: "ACKO General Insurance Company", type: "Private", key: "acko" },
  { name: "Star Health Insurance", type: "Private", key: "starHealth" },
  { name: "Reliance General Insurance", type: "Private", key: "relianceGeneral" },
  { name: "Bajaj General Insurance Ltd", type: "Private", key: "bajaj" },
  { name: "Care Health Insurance", type: "Private", key: "care" },
  { name: "Aditya Birla Health Insurance Co. Ltd", type: "Private", key: "adityaBirla" },
  { name: "Liberty General Insurance", type: "Private", key: "liberty" },
  { name: "NAVI General Insurance Ltd", type: "Private", key: "navi" },
  { name: "Galaxy Health Insurance", type: "Private", key: "galaxy" },
  { name: "Generali Central Insurance Co. Ltd", type: "Private", key: "generali" },
  { name: "SBI General Insurance", type: "Public", key: "sbi" },
  { name: "Universal Sompo General Insurance Company Limited", type: "Private", key: "universalSompo" },
  { name: "Cholamandalam MS General Insurance Co. Ltd", type: "Private", key: "cholaMs" },
  { name: "Health Insurance TPA", type: "TPA", key: "healthInsuranceTpa" },
  { name: "Link Insurance TPA Pvt. Ltd", type: "TPA", key: "linkTpa" },
  { name: "Heritage Health Insurance TPA", type: "TPA", key: "heritageTpa" },
  { name: "MD India Health Insurance TPA", type: "TPA", key: "mdIndiaTpa" },
  { name: "Health Assist Insurance TPA Pvt. Ltd", type: "TPA", key: "healthAssistTpa" },
  { name: "Mediassist TPA", type: "TPA", key: "mediassist" },
];
