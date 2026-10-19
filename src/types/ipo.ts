export type ComponentCategory = 'input' | 'process' | 'storage' | 'output';

export interface HardwareItem {
  id: string;
  name: string;
  category: ComponentCategory;
  categoryLabel: string;
  iconName: string;
  role: string;
  description: string;
  analogOrDigital: string;
  examples: string[];
}

export interface ScenarioSlot {
  id: string;
  targetCategory: ComponentCategory;
  assignedItem: HardwareItem | null;
  hint: string;
}

export interface ScenarioCase {
  id: string;
  title: string;
  subtitle: string;
  story: string;
  icon: string;
  realLifeContext: string;
  availableItems: HardwareItem[];
  expectedSolution: {
    input: string[];
    process: string[];
    storage?: string[];
    output: string[];
  };
  stepExplainer: {
    input: string;
    process: string;
    storage?: string;
    output: string;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  scenarioContext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  categoryTarget: ComponentCategory | 'general';
}

export interface LKPDAnswer {
  studentName: string;
  studentClass: string;
  groupName: string;
  scenarioAnalysis: string;
  blenderAnalogyNotes: string;
  differenceRamStorage: string;
  whyIsPrinterOutput: string;
  reflection: string;
}
