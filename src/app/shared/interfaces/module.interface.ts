export interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  delay: number;
  features: string[];
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
}
