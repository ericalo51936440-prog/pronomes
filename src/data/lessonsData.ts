export interface SubstitutionExample {
  id: string;
  original: string;
  highlightOriginal: string;
  replaced: string;
  highlightReplaced: string;
  replacedType: string;
  explanation: string;
}

export const SUBSTITUTION_EXAMPLES: SubstitutionExample[] = [
  {
    id: 'sub-1',
    original: 'A Maria leu o livro todo.',
    highlightOriginal: 'A Maria',
    replaced: 'Ela leu o livro todo.',
    highlightReplaced: 'Ela',
    replacedType: 'Grupo Nominal (Nome)',
    explanation: 'Em vez de repetirmos "A Maria", usamos o pronome pessoal "Ela". Fica muito mais natural!',
  },
  {
    id: 'sub-2',
    original: 'Os alunos queriam o bolo.',
    highlightOriginal: 'o bolo',
    replaced: 'Os alunos queriam-no (ou queríamo-lo).',
    highlightReplaced: '-no / -lo',
    replacedType: 'Grupo Nominal (Complemento Direto)',
    explanation: 'O pronome "o" (que se transforma em "-no" ou "-lo" com verbos) substitui "o bolo".',
  },
  {
    id: 'sub-3',
    original: 'A Sofia deu um abraço à mãe.',
    highlightOriginal: 'à mãe',
    replaced: 'A Sofia deu-lhe um abraço.',
    highlightReplaced: '-lhe',
    replacedType: 'Grupo Preposicional (Complemento Indireto)',
    explanation: 'O pronome "-lhe" substitui a quem se deu o abraço ("à mãe").',
  },
  {
    id: 'sub-4',
    original: 'O carro do João é rápido, mas o teu carro é mais bonito.',
    highlightOriginal: 'o teu carro',
    replaced: 'O carro do João é rápido, mas o teu é mais bonito.',
    highlightReplaced: 'o teu',
    replacedType: 'Grupo Nominal com Posse',
    explanation: 'O pronome possessivo "o teu" evita repetir a palavra "carro" duas vezes.',
  },
  {
    id: 'sub-5',
    original: 'Vou comprar este caderno aqui e aquele caderno ali.',
    highlightOriginal: 'aquele caderno',
    replaced: 'Vou comprar este caderno aqui e aquele.',
    highlightReplaced: 'aquele',
    replacedType: 'Grupo Nominal com Distância',
    explanation: 'O pronome demonstrativo "aquele" mostra o caderno que está longe sem ter de repetir a palavra.',
  },
];

export const PERSONAL_PRONOUNS_DATA = {
  title: 'Pronomes Pessoais',
  tagline: 'Referem-se às pessoas que participam na conversa ou na história!',
  description:
    'Os pronomes pessoais variam em pessoa (1.ª, 2.ª ou 3.ª), em número (singular ou plural), em género e também de acordo com o papel que desempenham na frase (se são o Sujeito que faz a ação ou o Complemento que a recebe).',
  examplesFromPdf: [
    'Ela deu-te um bolo.',
    'Tu gostaste de comê-lo.',
    'Nós queríamo-lo.',
  ],
  table: [
    {
      person: '1.ª pessoa (quem fala)',
      singularSubject: 'eu',
      singularDirect: 'me',
      singularIndirect: 'me',
      pluralSubject: 'nós',
      pluralDirect: 'nos',
      pluralIndirect: 'nos',
      memoryTip: 'Eu falo de mim mesmo ("eu", "me") ou do meu grupo ("nós", "nos").',
    },
    {
      person: '2.ª pessoa (com quem se fala)',
      singularSubject: 'tu',
      singularDirect: 'te',
      singularIndirect: 'te',
      pluralSubject: 'vós',
      pluralDirect: 'vos',
      pluralIndirect: 'vos',
      memoryTip: 'Estou a falar contigo ("tu", "te") ou convosco ("vós", "vos").',
    },
    {
      person: '3.ª pessoa (de quem se fala)',
      singularSubject: 'ele / ela',
      singularDirect: 'o, a, se',
      singularIndirect: 'lhe',
      pluralSubject: 'eles / elas',
      pluralDirect: 'os, as, se',
      pluralIndirect: 'lhes',
      memoryTip: 'Falamos de outra pessoa ou coisa ("ele", "ela", "o", "a", "lhe", "eles", "lhes").',
    },
  ],
};

export const POSSESSIVE_PRONOUNS_DATA = {
  title: 'Pronomes Possessivos',
  tagline: 'Mostram de quem é alguma coisa (a quem pertence)!',
  description:
    'Indicam uma relação de posse com as pessoas do discurso. Variam se há apenas UM possuidor ou VÁRIOS possuidores, no singular e no plural, e em género (masculino e feminino).',
  exampleFromPdf: 'O meu carro é giro e o teu?',
  oneOwner: {
    title: 'Um possuidor (uma só pessoa dona)',
    rows: [
      {
        person: '1.ª pessoa (eu)',
        mascSing: 'meu',
        femSing: 'minha',
        mascPlur: 'meus',
        femPlur: 'minhas',
        phrase: 'O lápis é meu. As borrachas são minhas.',
      },
      {
        person: '2.ª pessoa (tu)',
        mascSing: 'teu',
        femSing: 'tua',
        mascPlur: 'teus',
        femPlur: 'tuas',
        phrase: 'Perdeste o teu estojo? E as tuas canetas?',
      },
      {
        person: '3.ª pessoa (ele / ela)',
        mascSing: 'seu',
        femSing: 'sua',
        mascPlur: 'seus',
        femPlur: 'suas',
        phrase: 'Ele trouxe o seu casaco e as suas sapatilhas.',
      },
    ],
  },
  multiOwners: {
    title: 'Vários possuidores (duas ou mais pessoas donas)',
    rows: [
      {
        person: '1.ª pessoa (nós)',
        mascSing: 'nosso',
        femSing: 'nossa',
        mascPlur: 'nossos',
        femPlur: 'nossas',
        phrase: 'A nossa turma é fantástica e estes trabalhos são nossos.',
      },
      {
        person: '2.ª pessoa (vós)',
        mascSing: 'vosso',
        femSing: 'vossa',
        mascPlur: 'vossos',
        femPlur: 'vossas',
        phrase: 'Este projeto é vosso? Parabéns pela vossa dedicação!',
      },
      {
        person: '3.ª pessoa (eles / elas)',
        mascSing: 'seu',
        femSing: 'sua',
        mascPlur: 'seus',
        femPlur: 'suas',
        phrase: 'Eles apresentaram as suas ideias e os seus desenhos.',
      },
    ],
  },
};

export const DEMONSTRATIVE_PRONOUNS_DATA = {
  title: 'Pronomes Demonstrativos',
  tagline: 'Servem para apontar e indicar se algo está perto ou longe!',
  description:
    'Estabelecem uma relação de proximidade ou distância em relação a quem fala (1.ª pessoa), a quem ouve (2.ª pessoa) ou a alguém afastado (3.ª pessoa). Podem ser variáveis ou invariáveis.',
  exampleFromPdf: 'Qual é o meu livro? – É este ou aquele?',
  distanceRule: [
    {
      distance: 'Perto de quem fala (aqui ao meu pé)',
      variables: 'este, esta, estes, estas',
      invariable: 'isto',
      realLifeExample: '«Este lápis aqui na minha mão escreve muito bem.» / «O que é isto?»',
    },
    {
      distance: 'Perto de quem ouve (aí junto de ti)',
      variables: 'esse, essa, esses, essas',
      invariable: 'isso',
      realLifeExample: '«Podes passar-me esse caderno que está aí ao teu lado?» / «Não faças isso.»',
    },
    {
      distance: 'Longe de ambos (lá ao fundo)',
      variables: 'aquele, aquela, aqueles, aquelas',
      invariable: 'aquilo',
      realLifeExample: '«Vês aquela árvore lá ao fundo no recreio?» / «O que será aquilo?»',
    },
  ],
  invariableNotice: {
    title: 'Atenção aos Invariáveis: "isto", "isso", "aquilo"',
    text: 'Nunca mudam! Não têm masculino nem feminino, nem singular nem plural. Não existe "istos" nem "issas". São sempre iguais!',
  },
};
