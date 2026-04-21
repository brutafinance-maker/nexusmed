export interface HistologySlide {
  id: string;
  image: string;
  target: string;
  questions: {
    label: string;
    answer: string;
  }[];
}

export interface DiscursiveQuestion {
  question: string;
  answer: string;
}

export const histologyModule7Data: HistologySlide[] = [
  {
    id: 's1',
    image: 'https://i.postimg.cc/L47wg7SM/camada-basal-endometrio-utero.png',
    target: 'Camada basal, endométrio, útero',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Camada basal' },
      { label: 'Qual o corte histológico?', answer: 'Útero' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio simples colunar (revestimento das glândulas) + tecido conjuntivo frouxo (estroma endometrial)' },
      { label: 'Tipos de células presentes', answer: 'Células epiteliais colunares ciliadas e secretoras; células estromais fusiformes; células miometriais na transição' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Glândulas endometriais tubulares com epitélio colunar simples imersas em estroma denso; camada basal pouco vascularizada; base das glândulas com aspecto reto; limite com miométrio definido' }
    ]
  },
  {
    id: 's2',
    image: 'https://i.postimg.cc/XNhmBhWb/camada-mucosa-ducto-deferente.png',
    target: 'Camada mucosa, ducto deferente',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Camada mucosa' },
      { label: 'Qual o corte histológico?', answer: 'Ducto Deferente' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio pseudoestratificado colunar com estereocílios + lâmina própria de conjuntivo' },
      { label: 'Tipos de células presentes', answer: 'Células colunares principais com estereocílios longos; células basais (curtas); músculo liso na camada muscular subjacente' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Epitélio pseudoestratificado com estereocílios apicais proeminentes; lúmen estreito e regular; parede espessa com três camadas musculares lisas' }
    ]
  },
  {
    id: 's3',
    image: 'https://i.postimg.cc/tRfwnfbb/camada-mucosa-infundibulo-tuba-uterina.png',
    target: 'Camada mucosa, infundíbulo, tuba uterina',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Camada mucosa' },
      { label: 'Qual o corte histológico?', answer: 'Tuba Uterina' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio simples colunar ciliado + lâmina própria de conjuntivo frouxo' },
      { label: 'Tipos de células presentes', answer: 'Células ciliadas (predominantes); células secretoras; células intercalares (basais)' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Pregas mucosas altamente ramificadas e numerosas; epitélio simples colunar ciliado; lúmen amplo com fimbrias; estroma vascularizado; muscular fina' }
    ]
  },
  {
    id: 's4',
    image: 'https://i.postimg.cc/9XSKwS2V/corpo-cavernoso-e-esponjoso-(nao-tem-seta)-penis.png',
    target: 'Corpo cavernoso e esponjoso, pênis',
    questions: [
      { label: 'Que órgão/tecido é este?', answer: 'Pênis' },
      { label: 'Qual o corte histológico?', answer: 'Pênis' },
      { label: 'Tipo de tecido da região', answer: 'Tecido erétil (sinusóides vasculares) envolto por túnica albugínea de tecido conjuntivo denso' },
      { label: 'Tipos de células presentes', answer: 'Células endoteliais (revestimento dos sinusóides); células musculares lisas trabeculares; fibroblastos da túnica' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Dois corpos cavernosos dorsais com sinusóides amplos; um corpo esponjoso ventral ao redor da uretra; túnica albugínea densa; fascia de Buck' }
    ]
  },
  {
    id: 's5',
    image: 'https://i.postimg.cc/GhyNFQ3w/corpo-cavernoso-penis-2.png',
    target: 'Corpo cavernoso, pênis 2',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Corpo cavernoso' },
      { label: 'Qual o corte histológico?', answer: 'Pênis' },
      { label: 'Tipo de tecido da região', answer: 'Tecido erétil: sinusóides vasculares revestidos por endotélio com trabéculas de músculo liso' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Sinusóides vasculares amplos e irregulares; túnica albugínea espessa; artérias helicinas no parênquima; endotélio simples pavimentoso' }
    ]
  },
  {
    id: 's6',
    image: 'https://i.postimg.cc/VLCTqRsc/corpo-cavernoso-penis.png',
    target: 'Corpo cavernoso, pênis',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Corpo cavernoso' },
      { label: 'Qual o corte histológico?', answer: 'Pênis' },
      { label: 'Tipo de tecido da região', answer: 'Tecido erétil com sinusóides vasculares e trabéculas de músculo liso' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Espaços sinusoidais amplos revestidos por endotélio pavimentoso simples; trabéculas musculares lisas; túnica albugínea de conjuntivo denso' }
    ]
  },
  {
    id: 's7',
    image: 'https://i.postimg.cc/ncD54kVn/ducto-epidimario-epididimo.png',
    target: 'Ducto epididimário, epidídimo',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Ducto epididimário' },
      { label: 'Qual o corte histológico?', answer: 'Epidídimo' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio pseudoestratificado colunar com estereocílios longos + lâmina própria fina + músculo liso' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Estereocílios longos projetando-se para o lúmen; lúmen com espermatozoides; músculo liso peritubular espessando-se da cabeça para a cauda' }
    ]
  },
  {
    id: 's8',
    image: 'https://i.postimg.cc/MKQ47DZ6/ducto-peidimario-epididimo.png',
    target: 'Ducto epididimário, epidídimo 2',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Ducto epididimário' },
      { label: 'Qual o corte histológico?', answer: 'Epidídimo' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio pseudoestratificado com estereocílios + tecido conjuntivo frouxo + músculo liso peritubular' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Ductos com lúmen circular; estereocílios muito longos formando pente; células basais na camada inferior; estroma com vasos sanguíneos' }
    ]
  },
  {
    id: 's9',
    image: 'https://i.postimg.cc/6pxPYvTQ/ectocervice-colo-uterino.png',
    target: 'Ectocérvice, colo uterino',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Ectocérvice' },
      { label: 'Qual o corte histológico?', answer: 'Colo Uterino' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio escamoso estratificado não queratinizado' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Epitélio escamoso espesso; camadas bem definidas (basal, parabasal, intermediária, superficial); ausência de glândulas; zona de transformação' }
    ]
  },
  {
    id: 's10',
    image: 'https://i.postimg.cc/P5n72wNx/endocervice-colo-uterino.png',
    target: 'Endocérvice, colo uterino',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Endocérvice' },
      { label: 'Qual o corte histológico?', answer: 'Colo Uterino' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio simples colunar mucossecretor + criptas cervicais' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Epitélio colunar simples alto com núcleo basal; muco apical; criptas cervicais profundas; estroma denso fibromuscular' }
    ]
  },
  {
    id: 's11',
    image: 'https://i.postimg.cc/52WrnCjF/endometrio-camada-basal-utero.png',
    target: 'Endométrio, camada basal, útero',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Endométrio' },
      { label: 'Qual o corte histológico?', answer: 'Útero' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio simples colunar + estroma endometrial especializado + bases das glândulas' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Camada basal com glandulas tubulares retas sem tortuosidade; estroma denso; transição com miométrio delimitada; não descama na menstruação' }
    ]
  },
  {
    id: 's12',
    image: 'https://i.postimg.cc/K8hWJM4T/endometrio-camada-funcional-utero.png',
    target: 'Endométrio, camada funcional, útero',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Endométrio' },
      { label: 'Qual o corte histológico?', answer: 'Útero' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio simples colunar + estroma endometrial frouxo vascularizado + glândulas tubulares' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Camada funcional com glândulas tubulares em fase proliferativa ou secretora; artérias espiraladas evidentes; camada descartada na menstruação' }
    ]
  },
  {
    id: 's13',
    image: 'https://i.postimg.cc/nhfW0DMk/ep-simples-colunar-com-esteriocilios-tuba-uterina.png',
    target: 'Ep simples colunar com cílios, tuba uterina',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Ep. simples colunar com cílios' },
      { label: 'Qual o corte histológico?', answer: 'Tuba Uterina' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio simples colunar com células ciliadas e secretoras sobre lâmina própria' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Células ciliadas altas com cílios apicais longos (móveis); células secretoras intercaladas; pregas mucosas evidentes' }
    ]
  },
  {
    id: 's14',
    image: 'https://i.postimg.cc/Hk1NByjB/fase-proliferativa-utero.png',
    target: 'Fase proliferativa, útero',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Fase proliferativa' },
      { label: 'Qual o corte histológico?', answer: 'Útero' },
      { label: 'Tipo de tecido da região', answer: 'Endométrio — camada funcional com epitélio colunar e estroma denso em regeneração' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Glândulas tubulares retas e paralelas; mitoses no epitélio; estroma compacto com poucas artérias espiraladas; lúmen estreito e vazio' }
    ]
  },
  {
    id: 's15',
    image: 'https://i.postimg.cc/T3vsCDhQ/fase-proliferativa-utero-nao-gastrico.png',
    target: 'Fase proliferativa, útero 2',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Fase proliferativa' },
      { label: 'Qual o corte histológico?', answer: 'Útero' },
      { label: 'Tipo de tecido da região', answer: 'Endométrio em regeneração pós-menstrual com epitélio colunar simples' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Glândulas tubulares retas sem conteúdo secretor; estroma denso; figuras de mitose; espessamento progressivo guiado pelo estrogênio' }
    ]
  },
  {
    id: 's16',
    image: 'https://i.postimg.cc/zGYQ0g3c/foliculo-antral-zona-cortical-ovario.png',
    target: 'Folículo antral, zona cortical, ovário',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Folículo antral' },
      { label: 'Qual o corte histológico?', answer: 'Ovário' },
      { label: 'Tipo de tecido da região', answer: 'Córtex ovariano com folículos em maturação' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Antro folicular com líquido; oócito com zona pelúcida e cumulus oophorus; teca interna e externa; membrana basal separando granulosa da teca' }
    ]
  },
  {
    id: 's17',
    image: 'https://i.postimg.cc/P5bRc584/foliculo-multilaminar-zona-cortical-ovario.png',
    target: 'Folículo multilaminar, zona cortical, ovário',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Folículo multilaminar' },
      { label: 'Qual o corte histológico?', answer: 'Ovário' },
      { label: 'Tipo de tecido da região', answer: 'Córtex ovariano com folículos secundários (multilaminares)' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Múltiplas camadas de células da granulosa (>1 camada); zona pelúcida visível; teca em formação; ausência de antro' }
    ]
  },
  {
    id: 's18',
    image: 'https://i.postimg.cc/y8hb58Sp/foliculo-primordial-zona-cortical-ovario.png',
    target: 'Folículo primordial, zona cortical, ovário',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Folículo primordial' },
      { label: 'Qual o corte histológico?', answer: 'Ovário' },
      { label: 'Tipo de tecido da região', answer: 'Córtex ovariano superficial com estroma denso e folículos quiescentes' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Folículo com oócito grande envolto por camada única de células pavimentosas; ausência de zona pelúcida; muito pequenos e periféricos' }
    ]
  },
  {
    id: 's19',
    image: 'https://i.postimg.cc/Z5PMg5yQ/foliculo-unilaminar-zona-cortical-ovario.png',
    target: 'Folículo unilaminar, zona cortical, ovário',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Folículo unilaminar' },
      { label: 'Qual o corte histológico?', answer: 'Ovário' },
      { label: 'Tipo de tecido da região', answer: 'Córtex ovariano com folículos primários unilaminares' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Oócito em crescimento; células foliculares agora cúbicas ou colunares (camada única); zona pelúcida começando a se formar' }
    ]
  },
  {
    id: 's20',
    image: 'https://i.postimg.cc/T3j4S3WF/folpiculo-antral-zona-cortical-ovario.png',
    target: 'Folículo antral, zona cortical, ovário 2',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Folículo antral' },
      { label: 'Qual o corte histológico?', answer: 'Ovário' },
      { label: 'Tipo de tecido da região', answer: 'Córtex ovariano com folículo terciário (antral)' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Antro com líquido acelular; oócito eccêntrico com cumulus oophorus; corona radiata presente; teca interna rica em vasos' }
    ]
  },
  {
    id: 's21',
    image: 'https://i.postimg.cc/x1G471zj/glande-penis.png',
    target: 'Glande, pênis',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Glande' },
      { label: 'Qual o corte histológico?', answer: 'Pênis' },
      { label: 'Tipo de tecido da região', answer: 'Tecido erétil (corpo esponjoso expandido) + epitélio escamoso estratificado' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Extensão distal do corpo esponjoso; ausência de túnica albugínea espessa; rica inervação sensitiva; glândulas de Tyson' }
    ]
  },
  {
    id: 's22',
    image: 'https://i.postimg.cc/KYZHyhPX/glandula-mamaria-mama-em-lactacao.png',
    target: 'Glândula mamária, mama em lactação',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Glândula mamária' },
      { label: 'Qual o corte histológico?', answer: 'Mama' },
      { label: 'Tipo de tecido da região', answer: 'Glândula tubuloalveolar composta em atividade secretora' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Alvéolos distendidos por leite; células cubo-colunares com vacúolos lipídicos; estroma escasso; predominância de parênquima glandular' }
    ]
  },
  {
    id: 's23',
    image: 'https://i.postimg.cc/9fWnjHdh/glandula-mamaria-mama-em-repouso-(nao-tem-seta-em-nenhum-lugar).png',
    target: 'Glândula mamária, mama em repouso',
    questions: [
      { label: 'Que órgão/tecido é este?', answer: 'Mama em repouso' },
      { label: 'Qual o corte histológico?', answer: 'Mama' },
      { label: 'Tipo de tecido da região', answer: 'Glândula tubuloalveolar composta inativa + tecido conjuntivo denso + adiposo' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Predominância de estroma conjuntivo e adiposo sobre o parênquima; ductos com lúmen pequeno e sem secreção; lobos mal definidos' }
    ]
  },
  {
    id: 's24',
    image: 'https://i.postimg.cc/yNVbzCmV/glandula-mamaria-mama-em-repouso-2.png',
    target: 'Glândula mamária, mama em repouso 2',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Glândula mamária' },
      { label: 'Qual o corte histológico?', answer: 'Mama' },
      { label: 'Tipo de tecido da região', answer: 'Glândula mamária em estado inativo com estroma fibro adiposo predominante' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Ductos com lúmen colabado ou estreito sem secreção; estroma interlobular denso fibroso; abundante gordura interlobular; padrão quiescente' }
    ]
  },
  {
    id: 's25',
    image: 'https://i.postimg.cc/ZqTMhz89/glandulas-tubuloalveolares-prostat.png',
    target: 'Glândulas tubuloalveolares, próstata',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Glândulas tubuloalveolares' },
      { label: 'Qual o corte histológico?', answer: 'Próstata' },
      { label: 'Tipo de tecido da região', answer: 'Glândula tubuloalveolar composta — epitélio simples colunar ou pseudoestratificado + estroma fibromuscular' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Glândulas com lúmen irregular e pregueado; corpos amiláceos no lúmen (concreções eosinofílicas) — patognomônicos' }
    ]
  },
  {
    id: 's26',
    image: 'https://i.postimg.cc/bv3FyVgn/glandulas-tubuloalveolares-prostata-2.png',
    target: 'Glândulas tubuloalveolares, próstata 2',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Glândulas tubuloalveolares' },
      { label: 'Qual o corte histológico?', answer: 'Próstata' },
      { label: 'Tipo de tecido da região', answer: 'Glândula tubuloalveolar composta com estroma fibromuscular proeminente' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Glândulas com lúmen amplo e festonado; corpos amiláceos lamelados; células basais na periferia; padrão de próstata adulta' }
    ]
  },
  {
    id: 's27',
    image: 'https://i.postimg.cc/DzBYvp6S/istmo-tubario-camadas-mucosa-serosa-e-muscular-tuba-uterina(nao-tem seta).png',
    target: 'Istmo tubário, tuba uterina',
    questions: [
      { label: 'Que órgão/tecido é este?', answer: 'Tuba uterina — Istmo' },
      { label: 'Qual o corte histológico?', answer: 'Tuba Uterina' },
      { label: 'Tipo de tecido da região', answer: 'Mucosa (ep. colunar simples) + muscular própria (músculo liso) + serosa' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Pregas mucosas simples e escassas; parede muscular espessa com duas camadas bem definidas; lúmen estreito' }
    ]
  },
  {
    id: 's28',
    image: 'https://i.postimg.cc/3wnb8f12/mamilo-mama',
    target: 'Mamilo, mama',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Mamilo' },
      { label: 'Qual o corte histológico?', answer: 'Mama' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio escamoso estratificado queratinizado + músculo liso + ductos lactíferos' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Epiderme espessa queratinizada sobre derme com papilas; feixes de músculo liso no estroma; ductos lactíferos principais' }
    ]
  },
  {
    id: 's29',
    image: 'https://i.postimg.cc/MGdr635V/miompetrio-utero.png',
    target: 'Miométrio, útero',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Miométrio' },
      { label: 'Qual o corte histológico?', answer: 'Útero' },
      { label: 'Tipo de tecido da região', answer: 'Tecido muscular liso organizado em feixes em múltiplas direções' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Feixes grossos de músculo liso em três camadas; vasos arcuatos e radiais proeminentes; ausência de estriações' }
    ]
  },
  {
    id: 's30',
    image: 'https://i.postimg.cc/9fJNmgbY/perimetrio-utero.png',
    target: 'Perimétrio, útero',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Perimétrio' },
      { label: 'Qual o corte histológico?', answer: 'Útero' },
      { label: 'Tipo de tecido da região', answer: 'Serosa peritoneal — mesotélio simples pavimentoso + lâmina própria de conjuntivo' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Camada mesotelial delgada na superfície externa; tecido conjuntivo subjacente com vasos e nervos; corresponde ao peritônio visceral' }
    ]
  },
  {
    id: 's31',
    image: 'https://i.postimg.cc/W4XfNY85/tecido-adiposo-mama-em-repouso.png',
    target: 'Tecido adiposo unilocular, mama em repouso',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Tecido adiposo unilocular' },
      { label: 'Qual o corte histológico?', answer: 'Mama' },
      { label: 'Tipo de tecido da região', answer: 'Tecido adiposo branco (unilocular)' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Células grandes esféricas com único vacúolo lipídico central vazio; núcleo periférico achatado; contraste com o tecido glandular' }
    ]
  },
  {
    id: 's32',
    image: 'https://i.postimg.cc/pdq1WcCC/tecido-adiposo-unilocular-mama-em-repouso.png',
    target: 'Tecido adiposo, mama em repouso',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Tecido adiposo' },
      { label: 'Qual o corte histológico?', answer: 'Mama' },
      { label: 'Tipo de tecido da região', answer: 'Tecido adiposo branco unilocular + estroma conjuntivo fibroso' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Adipócitos grandes; septos de tecido conjuntivo denso; núcleos periféricos; pouco parênquima glandular na região' }
    ]
  },
  {
    id: 's33',
    image: 'https://i.postimg.cc/GpqSLgKf/tubulo-seminifero-testiculo.png',
    target: 'Túbulo seminífero, testículo',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Túbulo seminífero' },
      { label: 'Qual o corte histológico?', answer: 'Testículo' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio espermatogênico estratificado sobre membrana basal' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Múltiplas gerações celulares em espermatogênese; células de Sertoli altas; espermatozoides com cauda no lúmen; células de Leydig no interstício' }
    ]
  },
  {
    id: 's34',
    image: 'https://i.postimg.cc/76htf1tc/tunica-albuginea-testiculo.png',
    target: 'Túnica albugínea, testículo',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Túnica albugínea' },
      { label: 'Qual o corte histológico?', answer: 'Testículo' },
      { label: 'Tipo de tecido da região', answer: 'Tecido conjuntivo denso modelado (cápsula fibrosa do testículo)' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Cápsula espessa de feixes paralelos de colágeno denso; septos que dividem o testículo em lóbulos; tecido pouco celular' }
    ]
  },
  {
    id: 's35',
    image: 'https://i.postimg.cc/Y90DhNDD/uretra-peniana-penis.png',
    target: 'Uretra peniana, pênis 2',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Uretra peniana' },
      { label: 'Qual o corte histológico?', answer: 'Pênis' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio pseudoestratificado colunar transitando para escamoso estratificado' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Lúmen uretral no interior do corpo esponjoso; glândulas de Littré nas laterais; transição distal para epitélio escamoso' }
    ]
  },
  {
    id: 's36',
    image: 'https://i.postimg.cc/Tw1NpjNF/uretra-peniana-penis-2.png',
    target: 'Uretra peniana, pênis',
    questions: [
      { label: 'Que estrutura está na ponta da seta?', answer: 'Uretra peniana' },
      { label: 'Qual o corte histológico?', answer: 'Pênis' },
      { label: 'Tipo de tecido da região', answer: 'Epitélio pseudoestratificado colunar + lâmina própria + corpo esponjoso' },
      { label: 'Cite características histológicas marcantes visíveis nesta lâmina.', answer: 'Canal uretral com epitélio pseudoestratificado; nichos glandulares na mucosa; sinusóides de paredes finas ao redor' }
    ]
  }
];

export const discursiveModule7Data: DiscursiveQuestion[] = [
  { question: 'Qual a diferença histológica fundamental entre o folículo primordial e o folículo unilaminar?', answer: 'No folículo primordial as células foliculares são achatadas (pavimentosas). No unilaminar as células são cúbicas ou colunares.' },
  { question: 'Como distinguir histologicamente a camada basal da camada funcional do endométrio?', answer: 'A basal tem glândulas retas e estroma denso (não descama). A funcional tem glândulas tortuosas e estroma frouxo (descama).' },
  { question: 'Quais características histológicas diferenciam o epidídimo do ducto deferente?', answer: 'Epidídimo: epitélio pseudoestratificado com estereocílios longos e parede muscular fina. Ducto deferente: estereocílios curtos e parede muscular triplamente espessa.' },
  { question: 'Como diferenciar histologicamente o infundíbulo do istmo da tuba uterina?', answer: 'Infundíbulo: pregas mucosas numerosas e ramificadas, lúmen amplo. Istmo: pregas simples e escassas, parede muscular espessa, lúmen estreito.' },
  { question: 'O que são estereocílios e em que estruturas são encontrados? Como diferenciá-los de cílios?', answer: 'São microvilosidades imóveis e agrupadas. Encontrados no epidídimo e ducto deferente. Diferem dos cílios porque estes têm axonema (9+2) e são móveis.' },
  { question: 'Quais células são encontradas no interstício testicular e qual sua função?', answer: 'Células de Leydig. Função: produção de testosterona em resposta ao LH.' },
  { question: 'Cite uma estrutura histológica patognomônica da próstata e explique sua origem.', answer: 'Os corpos amiláceos. São concreções lamelares calcificadas formadas por secreção acumulada.' },
  { question: 'Como diferenciar histologicamente a mama em lactação da mama em repouso?', answer: 'Em lactação: alvéolos distendidos com leite, estroma escasso e mitoses. Em repouso: ductos colabados, estroma fibroadiposo predominante.' },
  { question: 'Qual o papel das células de Sertoli no testículo e como reconhecê-las na lâmina?', answer: 'Sustentam e nutrem germinativas, barreira hematotesticular. Reconhecidas pelo núcleo triangular/oval claro com nucléolo proeminente e localização basal.' },
  { question: 'Quais são as diferenças histológicas entre ectocérvice e endocérvice?', answer: 'Ectocérvice: epitélio escamoso estratificado não queratinizado sem glândulas. Endocérvice: simples colunar mucossecretor com criptas profundas.' },
  { question: 'O que caracteriza histologicamente o miométrio e como ele se organiza em camadas?', answer: 'Músculo liso em três camadas (longitudinal subendometrial, vascular, longitudinal subserosa). Células fusiformes sem estriações.' },
  { question: 'Como identificar o corpo esponjoso em relação ao corpo cavernoso em corte histológico de pênis?', answer: 'Corpo esponjoso envolve a uretra, tem sinusóides menores e túnica albugínea fina. Cavernosos são pareados, maiores e com túnica espessa.' }
];
