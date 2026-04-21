import { ClinicalCase, Question, Course, TheoryTopic } from './types';

export const mockUser = {
  id: 'u1',
  name: 'Dr. Matheus',
  avatar: 'https://picsum.photos/seed/doctor1/200/200',
  level: 12,
  xp: 4500,
  progress: {
    overall: 65,
    byCategory: {
      'Clínica Médica': 80,
      'Cirurgia': 45,
      'Pediatria': 70,
      'Ginecologia e Obstetrícia': 55,
      'Medicina Preventiva': 90
    },
    questionsAnswered: 1240,
    successRate: 78,
    streak: 15
  }
};

export const mockClinicalCases: ClinicalCase[] = [
  {
    id: 'c1',
    title: 'Dispneia Súbita no Pós-Operatório',
    discipline: 'Cirurgia',
    difficulty: 'Médio',
    status: 'completed',
    problem: 'Paciente masculino, 65 anos, submetido a artroplastia total de quadril há 5 dias. Apresenta início súbito de dispneia, dor torácica pleurítica e taquicardia.',
    hypotheses: [
      'Tromboembolismo Pulmonar (TEP)',
      'Infarto Agudo do Miocárdio',
      'Pneumonia Nosocomial',
      'Insuficiência Cardíaca Congestiva'
    ],
    learningGoals: [
      'Identificar fatores de risco para TEP',
      'Interpretar escore de Wells',
      'Determinar exames padrão-ouro para diagnóstico',
      'Estabelecer manejo terapêutico inicial'
    ],
    theoryContent: 'O Tromboembolismo Pulmonar é uma complicação grave do pós-operatório... [Resumo teórico detalhado]'
  },
  {
    id: 'c2',
    title: 'Cefaleia e Rigidez de Nuca em Lactente',
    discipline: 'Pediatria',
    difficulty: 'Difícil',
    status: 'unlocked',
    problem: 'Lactente de 8 meses levado à emergência com febre alta, irritabilidade e abaulamento de fontanela há 12 horas.',
    hypotheses: [
      'Meningite Bacteriana Aguda',
      'Meningite Viral',
      'Sepse Neonatal Tardia',
      'Abscesso Cerebral'
    ],
    learningGoals: [
      'Reconhecer sinais de irritação meníngea em lactentes',
      'Indicar e interpretar líquor',
      'Escolher antibioticoterapia empírica por faixa etária'
    ],
    theoryContent: 'A meningite na infância requer diagnóstico rápido e início imediato de tratamento...'
  },
  {
    id: 'c3',
    title: 'Dor Abdominal em Fossa Ilíaca Direita',
    discipline: 'Clínica Médica',
    difficulty: 'Fácil',
    status: 'locked',
    problem: 'Paciente feminino, 22 anos, dor periumbilical que migrou para FID, associada a anorexia e náuseas.',
    hypotheses: [
      'Apendicite Aguda',
      'Cisto de Ovário Roto',
      'Gravidez Ectópica',
      'Doença Inflamatória Pélvica'
    ],
    learningGoals: [
      'Avaliar escore de Alvarado',
      'Indicar exames de imagem pertinentes',
      'Manejo pré-operatório'
    ],
    theoryContent: 'A apendicite aguda é a causa mais comum de abdome agudo cirúrgico...'
  }
];

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Qual o escore de Wells para um paciente com FC > 100 bpm, história de TVP prévia e diagnóstico provável de TEP?',
    options: [
      { id: 'a', text: '3.0 pontos' },
      { id: 'b', text: '4.5 pontos' },
      { id: 'c', text: '6.0 pontos' },
      { id: 'd', text: '1.5 pontos' }
    ],
    correctOptionId: 'b',
    comment: 'A pontuação de Wells atribui 1.5 para FC > 100, 1.5 para TVP/TEP prévio e 3.0 para TEP como diagnóstico principal/mais provável. Total: 6.0 (em algumas versões) ou 4.5 dependendo da classificação simplificada.',
    discipline: 'Clínica Médica',
    subject: 'Pneumologia',
    difficulty: 'Médio'
  },
  {
    id: 'q2',
    text: 'Sobre o tratamento da Apendicite Aguda não complicada, qual a conduta preferencial?',
    options: [
      { id: 'a', text: 'Observação e antibioticoterapia exclusiva' },
      { id: 'b', text: 'Apendicectomia laparoscópica' },
      { id: 'c', text: 'Apendicectomia aberta (McBurney)' },
      { id: 'd', text: 'Drenagem percutânea de abscesso' }
    ],
    correctOptionId: 'b',
    comment: 'Atualmente, a apendicectomia laparoscópica é o padrão-ouro devido à recuperação mais rápida e menor taxa de infecção de ferida operatória.',
    discipline: 'Cirurgia',
    subject: 'Gastroenterologia Cirúrgica',
    difficulty: 'Fácil'
  }
];

export const mockCourses: Course[] = [
  {
    id: 'medcof-osce',
    title: 'Dominando o OSCE',
    instructor: 'Grupo Medcof',
    description: 'Transforme sua preparação para a prova prática com o método Medcof. Casos reais, check-lists e revisões focadas no que realmente cai no OSCE de Ginecologia e Obstetrícia.',
    thumbnail: 'https://raw.githubusercontent.com/samielabud-ui/nexus-capas/main/Gemini_Generated_Image_sz0oc7sz0oc7sz0o.png',
    category: 'Prática / OSCE',
    modules: [
      {
        id: 'go-ginecologia',
        title: 'Ginecologia',
        lessons: [
          { id: 'go1', title: 'Anticoncepção - Aula 1', videoUrl: '8tnBj63JAWY' },
          { id: 'go2', title: 'Anticoncepção - Aula 2', videoUrl: 'dCyu6P5XuKU' },
          { id: 'go3', title: 'Anticoncepção - Aula 3', videoUrl: 'Iq32zAYlPqQ' },
          { id: 'go4', title: 'Anticoncepção CE', videoUrl: 'B3obDlkdqY0' },
          { id: 'go5', title: 'Incontinência Urinária', videoUrl: 'mnFU-DM2KtU' },
          { id: 'go6', title: 'Incontinência Urinária Uroginecologia', videoUrl: 'rZ71QJ-P1UM' },
          { id: 'go7', title: 'Incontinência Uroginecológica', videoUrl: '9aztoXZkNNQ' },
          { id: 'go8', title: 'Incontinência Uroginecológica COFEXPRESS', videoUrl: 'iJXn5NBdNnc' },
          { id: 'go9', title: 'Sangramento Uterino Anormal - Aula 1', videoUrl: 't3rqopjvBCI' },
          { id: 'go10', title: 'Sangramento Uterino Anormal - Aula 2', videoUrl: 'hFz3amcSPXI' },
          { id: 'go11', title: 'Sangramento Uterino Anormal - Aula 3', videoUrl: 'LZlsKBwSknU' },
          { id: 'go12', title: 'Sangramento Uterino Anormal COFEXPRESS', videoUrl: 'Toye6BdkcFk' },
          { id: 'go13', title: 'Neoplasia de Mama', videoUrl: 'akuAI_Q5Mmw' },
          { id: 'go14', title: 'Câncer de Mama - Aula 1', videoUrl: 'xNSmW8PyTFY' },
          { id: 'go15', title: 'Câncer de Mama - Aula 2', videoUrl: 'tva3UociD2k' },
          { id: 'go16', title: 'Câncer de Mama COFEXPRESS', videoUrl: '6rPxeV-YI_4' },
          { id: 'go17', title: 'Puberdade Precoce - Aula 1', videoUrl: 'JgDIXx7oQjc' },
          { id: 'go18', title: 'Puberdade Precoce - Aula 2', videoUrl: 'B2hOmZEhAds' },
          { id: 'go19', title: 'Puberdade Precoce - Aula 3', videoUrl: 'EnVLCPPAUU8' },
          { id: 'go20', title: 'Puberdade Precoce COFEXPRESS', videoUrl: 'lQNjJ71sBvU' },
          { id: 'go21', title: 'Endometriose - Aula 1', videoUrl: 'W15524c3t_c' },
          { id: 'go22', title: 'Endometriose - Aula 2', videoUrl: 'HHSNQ-MwAPk' },
          { id: 'go23', title: 'Endometriose - Aula 3', videoUrl: 'VaG_Wa8nMPE' },
          { id: 'go24', title: 'Endometriose COFEXPRESS', videoUrl: 'oNDDe_trO3I' },
          { id: 'go25', title: 'Climatério e Menopausa - Aula 1', videoUrl: 'iGztoIh1mjo' },
          { id: 'go26', title: 'Climatério e Menopausa - Aula 2', videoUrl: 'xxXvn3Q-bxc' },
          { id: 'go27', title: 'Climatério e Menopausa - Aula 3', videoUrl: 'uw8P6NiqzDk' },
          { id: 'go28', title: 'Climatério e Menopausa COFXPRESS', videoUrl: 'ujzxTd8iouY' },
          { id: 'go29', title: 'Amenorreia - Aula 1', videoUrl: 'CS1iuhjD3JE' },
          { id: 'go30', title: 'Amenorreia - Aula 2', videoUrl: 'zwrqMZMnwUA' },
          { id: 'go31', title: 'Amenorreia - Aula 3', videoUrl: 'usNL6rQ8WOY' },
          { id: 'go32', title: 'Amenorreia COFXPRESS', videoUrl: '7uh-BkAtVA0' },
          { id: 'go33', title: 'Infertilidade - Aula 1', videoUrl: 'poU6jKK3Qjc' },
          { id: 'go34', title: 'Infertilidade - Aula 2', videoUrl: 'AJTyMKSBrYU' },
          { id: 'go35', title: 'Infertilidade - Aula 3', videoUrl: 'adsMFypQCSo' },
          { id: 'go36', title: 'Infertilidade CE', videoUrl: 'obwSbC3b0OU' },
          { id: 'go37', title: 'Ovários Policísticos - Aula 1', videoUrl: 'iIjjO4nizkQ' },
          { id: 'go38', title: 'Ovários Policísticos - Aula 2', videoUrl: '6dlGHanV2l0' },
          { id: 'go39', title: 'Ovários Policísticos - Aula 3', videoUrl: 'e8ShK1vdXY4' },
          { id: 'go40', title: 'Síndrome dos Ovários Policísticos COFXPRESS', videoUrl: 'wcm8JyNFNsg' },
        ]
      },
      {
        id: 'go-obstetricia',
        title: 'Obstetrícia',
        lessons: [
          { id: 'go41', title: 'Rotura Prematura de Membranas Ovulares - Aula 1', videoUrl: 'euuWUKtsr9g' },
          { id: 'go42', title: 'Rotura Prematura de Membranas Ovulares - Aula 2', videoUrl: 'c7VlRfdKl1E' },
          { id: 'go43', title: 'Rotura Prematura de Membranas Ovulares - Aula 3', videoUrl: '3UibigrzZbw' },
          { id: 'go44', title: 'Rotura Prematura de Membranas Ovulares RPMO COFXPRESS', videoUrl: 'Sa5h775FpsI' },
          { id: 'go45', title: 'Gestação Ectópica - Aula 1', videoUrl: 'xJsCceT-kaw' },
          { id: 'go46', title: 'Gestação Ectópica - Aula 2', videoUrl: 'a6Kz0VBdE84' },
          { id: 'go47', title: 'Gestação Ectópica - Aula 3', videoUrl: 'WPKjh_uVuws' },
          { id: 'go48', title: 'Gestação Ectópica COFEXPRESS', videoUrl: '40baB7fbj4E' },
          { id: 'go49', title: 'Sangramento da 2a metade da gestação - Aula 1', videoUrl: 'KKMzRFvos3c' },
          { id: 'go50', title: 'Sangramento da 2a metade da gestação - Aula 2', videoUrl: '8-XQ9OOHGTc' },
          { id: 'go51', title: 'Sangramento da 2a metade da gestação - Aula 3', videoUrl: '-dwoQEriPW4' },
          { id: 'go52', title: 'Sangramento da 2a metade da gestação COFEXPRESS', videoUrl: 'R8UBHx1hoP0' },
          { id: 'go53', title: 'Trabalho de Parto Prematuro - Aula 1', videoUrl: 'PLNrwBW_Cc8' },
          { id: 'go54', title: 'Trabalho de Parto Prematuro - Aula 2', videoUrl: 'UhThM-dkPwE' },
          { id: 'go55', title: 'Trabalho de Parto Prematuro - Aula 3', videoUrl: '0VEVGmBCvuc' },
          { id: 'go56', title: 'Trabalho de Parto Prematuro COFEXPRESS', videoUrl: '8pTKLxwnwxA' },
          { id: 'go57', title: 'Parto Normal e Instrumentalizado - Aula 1', videoUrl: 'hgikjivNUQM' },
          { id: 'go58', title: 'Parto Normal e Instrumentalizado - Aula 2', videoUrl: '79_cZkJI4Hs' },
          { id: 'go59', title: 'Parto Normal e Instrumentalizado - Aula 3', videoUrl: '2moUaEl5c9k' },
          { id: 'go60', title: 'Parto Normal e Instrumentalizado COFEXPRESS', videoUrl: 'qhOtQCbHS2o' },
          { id: 'go61', title: 'Gemelaridade - Aula 1', videoUrl: 'j6vEXGrHnOs' },
          { id: 'go62', title: 'Gemelaridade - Aula 2', videoUrl: 'wzN9lNKRjj0' },
          { id: 'go63', title: 'Gemelaridade - Aula 3', videoUrl: 'DhjuW3W-9lc' },
          { id: 'go64', title: 'Gemelaridade COFEXPRESS', videoUrl: 'gWINL4-DcTA' },
          { id: 'go65', title: 'Puerpério - Aula 1', videoUrl: 'VDRpJ6C9whs' },
          { id: 'go66', title: 'Puerpério - Aula 2', videoUrl: 'L0lNg80tW_0' },
          { id: 'go67', title: 'Puerpério - Aula 3', videoUrl: 'mjz24BiiM3M' },
          { id: 'go68', title: 'Puerpério COFEXPRESS', videoUrl: 'wT2JoEewGRY' },
          { id: 'go69', title: 'Dengue na Gestação - Aula 1', videoUrl: '_P1YyYES4tY' },
          { id: 'go70', title: 'Dengue na Gestação - Aula 2', videoUrl: 'YlTXUP27Pl8' },
          { id: 'go71', title: 'Dengue na Gestação - Aula 3', videoUrl: 'ND4DEphjo3A' },
          { id: 'go72', title: 'Dengue na Gestação COFEXPRESS', videoUrl: 'qSttQ83v_xI' },
          { id: 'go73', title: 'Pré Natal e Aloimunização Rh - Aula 1', videoUrl: 'GnHUWandX60' },
          { id: 'go74', title: 'Pré Natal e Aloimunização Rh - Aula 2', videoUrl: 'XSaqaA_YB7A' },
          { id: 'go75', title: 'Pré Natal e Aloimunização Rh - Aula 3', videoUrl: '9Wk-k6NXGyU' },
          { id: 'go76', title: 'Pré Natal e Aloimunização Rh COFEXPRESS', videoUrl: 'nWlrs5OK9_Q' },
          { id: 'go77', title: 'Doença Trofoblástica Gestacional - Aula 1', videoUrl: 'XjNwafHA0-E' },
          { id: 'go78', title: 'Doença Trofoblástica Gestacional - Aula 2', videoUrl: 'ucGxa2LuDa8' },
          { id: 'go79', title: 'Doença Trofoblástica Gestacional - Aula 3', videoUrl: 'nEjPAaSjrOc' },
          { id: 'go80', title: 'Doença Trofoblástica Gestacional COFEXPRESS', videoUrl: 'iR7dTEYwT7U' },
        ]
      }
    ]
  }
];

import { tubaUterinaContent } from './data/tubaUterinaData';
import { uteroContent } from './data/uteroData';
import { cervixData } from './data/cervixData';

export const anatomyAtlas = [
  { id: 'ana-cardio', title: 'Sistema Cardiovascular', content: 'O sistema cardiovascular é composto pelo coração e pelos vasos sanguíneos...' },
  { id: 'ana-resp', title: 'Sistema Respiratório', content: 'O sistema respiratório é responsável pela troca de gases entre o organismo e o meio...' },
  { id: 'ana-dig', title: 'Sistema Digestório', content: 'O sistema digestório é responsável pela ingestão, digestão e absorção de nutrientes...' },
  { id: 'ana-uri', title: 'Sistema Urinário', content: 'O sistema urinário filtra o sangue e produz a urina para eliminar resíduos...' },
  { id: 'ana-nerv', title: 'Sistema Nervoso', content: 'O sistema nervoso coordena as funções corporais através de sinais elétricos...' },
  { id: 'ana-endo', title: 'Sistema Endócrino', content: 'O sistema endócrino regula o corpo através da secreção de hormônios...' },
  { id: 'ana-musq', title: 'Sistema Musculoesquelético', content: 'Composto por ossos e músculos, garante a sustentação e o movimento...' },
  { id: 'ana-integ', title: 'Sistema Tegumentar', content: 'A pele e seus anexos formam a barreira protetora do corpo...' },
  { id: 'ana-repro', title: 'Sistema Reprodutor', content: 'Responsável pela reprodução humana e produção de células germinativas...' },
  { id: 'ana-linf', title: 'Sistema Linfático e Imune', content: 'Responsável pela defesa do organismo e circulação da linfa...' },
];

export const histologyAtlas = [
  { id: 'his-cardio', title: 'Histologia Cardiovascular', content: 'O miocárdio é composto por células musculares estriadas cardíacas...' },
  { id: 'his-resp', title: 'Histologia Respiratória', content: 'As vias aéreas são revestidas por epitélio pseudoestratificado ciliado...' },
  { id: 'his-dig', title: 'Histologia Digestória', content: 'A parede do trato digestório possui quatro camadas básicas: mucosa...' },
  { id: 'his-uri', title: 'Histologia Urinária', content: 'O néfron é a unidade funcional do rim, composta por glomérulo e túbulos...' },
  { id: 'his-nerv', title: 'Histologia Nervosa', content: 'O tecido nervoso é composto por neurônios e células da glia...' },
  { id: 'his-endo', title: 'Histologia Endócrina', content: 'As glândulas endócrinas são ricamente vascularizadas para secretar hormônios...' },
  { id: 'his-musq', title: 'Histologia Muscular e Óssea', content: 'O tecido ósseo é um tecido conjuntivo especializado com matriz mineralizada...' },
  { id: 'his-integ', title: 'Histologia Tegumentar', content: 'A epiderme é um epitélio estratificado pavimentoso queratinizado...' },
  { id: 'his-repro', title: 'Histologia Reprodutora', content: 'placeholder' },
  { id: 'his-linf', title: 'Histologia Linfática', content: 'Os linfonodos possuem córtex e medula com alta densidade de linfócitos...' },
];

export const reproductiveHistologyData = {
  feminino: [
    { 
      id: 'ovario', 
      title: 'Ovário — Histologia Completa', 
      content: `
### 🔎 Visão geral do ovário

![Visão geral do ovário](https://images.openai.com/static-rsc-4/FetmfZmNczgivigdEaPsxpx_iY404t75-xKesSYQ_GjdmlHjPMUz677pVLrwkymtMdoMrsjvY_t_ylJYmGFaspB2yfsU_ek6s9gPQTI1hKrEypicX0EKkvwm84JwfgeG_4lQgszbWKimk5iCy78VN5WjrYzBQEFYUSJ9TsX8Og4?purpose=inline)

O ovário é dividido em duas regiões principais:

*   **Córtex** → onde estão os folículos ovarianos em diferentes estágios
*   **Medula** → tecido conjuntivo frouxo com vasos sanguíneos e nervos

**Revestimento:**
*   Epitélio simples cúbico (epitélio germinativo)
*   Túnica albugínea (tecido conjuntivo denso logo abaixo)

---

### 🌱 Folículo Primordial

**Características:**
*   Ovócito primário pequeno
*   Células foliculares achatadas ao redor
*   Localizados na periferia do córtex

> **Fato Clínico:** É o estágio mais inicial e mais abundante no ovário.

---

### 🌿 Folículo Primário

![Folículo Primário](https://images.openai.com/static-rsc-4/pxe-kx7KThURCVHROqdILXnmvX_5B1i_plkgv6PVQ-HGmLGUaxaRtkGvakBaQqp0-_2wcSjvl4MSB9XTa8j8NMu6Z106kn2xWHGlZHjdPe00uMTFAfN3i2d3aeRzCocTRcIvTUJIEabNDYqrYrTZjwm7te71TEqGKahHGc8ZotQ?purpose=inline)

**Características:**
*   Ovócito maior
*   Células foliculares tornam-se cúbicas (**granulosa**)
*   Surge a **zona pelúcida**

---

### 🌳 Folículo Secundário (Antral)

![Folículo Secundário Histologia](https://images.openai.com/static-rsc-4/RgYDMbqv7vxAfb5L2VSjbATqBYbZA8HqGpXWZdF9VgbXkXb-3hMPlG1NQUYpFAiZ7l7aIp5RrusXM8uM9nAI2BywRgUsdcF8587R4BGAEwbUuwl4Ao_DKvmFUbceUITafhw6JHoembT8GtNIU70odnsXLxLMx2hnJR2sdv8O0HkM5nYP4Taq1GKc1rKTKO_T?purpose=inline)

![Morfologia Folicular](https://images.openai.com/static-rsc-4/DXmQQfXDX2XwzclrCBEll_VWM5G7wJ1YP4rdRrNSZmzDXSazMQhvsOLx-VQ1PG4UfcNmgCGGUXBVgSbx3heh6GwBWjUZPtPqG5dgcR0p6CnXuJnpTKMxHKukkcLx2o1MqzS5aii6Ua6T_UGkhSYERHlr_xydJGTKS_YCvZ-OZNw?purpose=inline)

**Características:**
*   Formação do **antro folicular** (espaço com líquido)
*   Presença de:
    *   Células da granulosa
    *   Teca interna (produtora de hormônios)
    *   Teca externa (tecido conjuntivo)

---

### 🌕 Folículo de Graaf (Maduro)

![Folículo de Graaf](https://images.openai.com/static-rsc-4/-Eremn-n2fryiaWzxsVbdy4ZUzRymN57fYhCsvRBJq8xzs56tohZv4xcWevT8KvSWFQn1K3JEsfEVrgVzecN0PIwJuAdHj-lWMjC1HBaTY-KmNbtpHKbS5Gmfy3GNBEL_ORwZRCqx3rykjppD-hhUKVRZrAey98yq9X1s24S3RY?purpose=inline)

**Características:**
*   Antro muito grande
*   Ovócito deslocado para a periferia
*   Presença de:
    *   **Cúmulo oóforo**
    *   **Corona radiata**

> **Pronto para ovulação.**

---

### 💛 Corpo Lúteo

![Corpo Lúteo](https://images.openai.com/static-rsc-4/SgnVoMOWHbU8WJHHLOZ7CG71cLJRRaHO-lWKo_YmF5jGvPm4eAMTsjgWyVkWEbs2BVs4-qP9OOHZNxCBvcxGKARV_Bjq_jMytecCKdPZIq3M0aGNBIpmd8O1ThlBT3IPzYaEGAI7rBuUdjxqlihim1hMdQlfoxZRwI6at0S90nQ?purpose=inline)

**Características:**
*   Formação após a ovulação
*   Células grandes e eosinofílicas (luteínicas)
*   Produção de progesterona

---

### ⚪ Corpo Albicans

![Corpo Albicans](https://images.openai.com/static-rsc-4/t4bIZJhts1VPWV_ibLhQfplKI_8NMUDP_AoJkKP5UchrCbJxeGmLE3ufth9pBcCs7ByNgFo4CPUpEiZ0o38R7Olr3si7yHaJJmbDB4UhjDQMX-POPmGaTRe-YIN8v03QZuVzEBTw-c-KsIoBJoXtVg1xhywblkvJCtYaUz-mO5ir769DiQquLvWd0jX823ka?purpose=inline)

**Características:**
*   Estrutura fibrosa
*   Resultado da degeneração do corpo lúteo
*   Aspecto de cicatriz
      `
    },
    { 
      id: 'tuba', 
      title: 'Tuba Uterina — Histologia Completa', 
      content: tubaUterinaContent 
    },
    { 
      id: 'utero', 
      title: 'Útero — Histologia Completa e Ciclo Endometrial', 
      content: uteroContent 
    },
    { 
      id: 'colo', 
      title: 'Colo do Útero (Cérvix) — Histologia e Secreção', 
      content: cervixData 
    },
    { id: 'vagina', title: 'Vagina', content: 'Epitélio estratificado pavimentoso não queratinizado rico em glicogênio.' },
  ],
  mamaria: [
    { id: 'mama-nao-lactante', title: 'Mama não lactante', content: 'Predomina tecido conjuntivo denso e adiposo com poucos ductos.' },
    { id: 'mama-lactante', title: 'Mama lactante', content: 'Proliferação de alvéolos secretores e ductos para produção de leite.' },
  ],
  masculino: [
    { id: 'testiculo', title: 'Testículo', content: 'Túbulos seminíferos (espermatogênese), Células de Sertoli (suporte) e Células de Leydig (testosterona).' },
    { id: 'epididimo', title: 'Epidídimo', content: 'Epitélio pseudoestratificado com estereocílios para maturação de espermatozoides.' },
    { id: 'deferente', title: 'Ducto Deferente', content: 'Camada muscular espessa e lúmen irregular.' },
    { id: 'seminal', title: 'Vesícula Seminal', content: 'Mucosa pregueada, secreta fluido rico em frutose.' },
    { id: 'prostata', title: 'Próstata', content: 'Glândulas tubuloalveolares e corpos amiláceos.' },
    { id: 'bulbouretrais', title: 'Glândulas Bulbouretrais', content: 'Secretam muco pré-ejaculatório.' },
    { id: 'penis', title: 'Pênis', content: 'Tecido erétil: corpos cavernosos e corpo esponjoso.' },
  ],
  correlacoes: [
    { id: 'ciclo-endometrio', title: 'Endométrio no Ciclo', content: 'Diferenciação histológica entre fase proliferativa e secretora.' },
    { id: 'hpb', title: 'Hiperplasia Prostática', content: 'Aumento estromal e glandular na HPB.' },
    { id: 'cervicais', title: 'Alterações Cervicais', content: 'Citopatologia na zona de transformação.' },
    { id: 'tumores', title: 'Tumores Testiculares', content: 'Padrões básicos de seminomas e tumores não-seminomatosos.' },
  ]
};

export const mockTheory: TheoryTopic[] = [
  {
    id: 't1',
    title: 'Insuficiência Cardíaca Congestiva',
    category: 'Clínica Médica',
    summary: 'Definição, critérios de Framingham, classificação NYHA e estágios da AHA...',
  },
  {
    id: 't2',
    title: 'DHE (Distúrbios Hidroeletrolíticos)',
    category: 'Clínica Médica',
    summary: 'Sódio, Potássio e Cálcio: principais alterações e manejo clínico.',
  }
];

export const pblModules = [
  { id: '1', title: 'Módulo 1 — Introdução ao Estudo da Medicina', cycle: 'Básico' },
  { id: '2', title: 'Módulo 2 — Proliferação, Alteração do Crescimento e Diferenciação Celular', cycle: 'Básico' },
  { id: '3', title: 'Módulo 3 — Funções Biológicas 1', cycle: 'Básico' },
  { id: '4', title: 'Módulo 4 — Funções Biológicas 2', cycle: 'Básico' },
  { id: '5', title: 'Módulo 5 — Metabolismo e Nutrição', cycle: 'Básico' },
  { id: '6', title: 'Módulo 6 — Mecanismo de Agressão e Defesa', cycle: 'Básico' },
  { id: '7', title: 'Módulo 7 — Concepção, Formação do Ser Humano e Gestação', cycle: 'Básico' },
  { id: '8', title: 'Módulo 8 — Nascimento, Crescimento e Desenvolvimento da Criança e do Adolescente', cycle: 'Básico' },
  { id: '9', title: 'Módulo 9 — Vida Adulta e Processo de Envelhecimento', cycle: 'Básico' },
  { id: '10', title: 'Módulo 10 — Percepção, Consciência e Emoções', cycle: 'Básico' },
  { id: '11', title: 'Módulo 11 — Febre, Inflamação e Infecção', cycle: 'Básico' },
  { id: '12', title: 'Módulo 12 — Fadiga, Perda de Peso e Anemias', cycle: 'Básico' },
  { id: '13', title: 'Módulo 13 — Disúria, Edema e Proteinúria', cycle: 'Clínico' },
  { id: '14', title: 'Módulo 14 — Perda de Sangue', cycle: 'Clínico' },
  { id: '15', title: 'Módulo 15 — Mente e Comportamento', cycle: 'Clínico' },
];
