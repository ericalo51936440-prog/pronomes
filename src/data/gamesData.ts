import {
  MatchingItem,
  EscapeRoomStep,
  ThreeTruthsRound,
  ImpostorRound,
  TrueFalseQuestion,
  MultipleChoiceQuestion,
  TeamBattleQuestion,
  TreasureClue,
  Badge,
} from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_step',
    title: 'Primeiro Passo',
    description: 'Jogaste o teu primeiro desafio!',
    icon: '🌟',
    unlocked: false,
  },
  {
    id: 'matching_master',
    title: 'Mestre da Correspondência',
    description: 'Ligaste todos os pares sem errar!',
    icon: '🔗',
    unlocked: false,
  },
  {
    id: 'escape_champion',
    title: 'Guardião da Biblioteca',
    description: 'Escapaste com sucesso do Escape Room dos Pronomes!',
    icon: '🗝️',
    unlocked: false,
  },
  {
    id: 'truth_seeker',
    title: 'Caçador de Mentiras',
    description: 'Descobriste todas as mentiras no jogo 3 Verdades e 1 Mentira!',
    icon: '🕵️',
    unlocked: false,
  },
  {
    id: 'impostor_hunter',
    title: 'Detetive de Impostores',
    description: 'Apanhaste todos os impostores disfarçados!',
    icon: '🔍',
    unlocked: false,
  },
  {
    id: 'quiz_ace',
    title: 'Ás da Escolha Múltipla',
    description: 'Acertaste no desafio de perguntas e respostas!',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'treasure_legend',
    title: 'Lenda da Ilha do Tesouro',
    description: 'Encontraste as 5 gemas mágicas dos pronomes!',
    icon: '💎',
    unlocked: false,
  },
  {
    id: 'team_hero',
    title: 'Estrela de Equipa',
    description: 'Completaste uma batalha épica de grupos na sala!',
    icon: '🏆',
    unlocked: false,
  },
];

// 1. MATCHING GAME
export const MATCHING_SETS: {
  id: string;
  title: string;
  instruction: string;
  words: { id: string; text: string; matchKey: string }[];
  categories: { id: string; text: string; matchKey: string }[];
}[] = [
  {
    id: 'match-1',
    title: 'Nível 1: Descobre a Subclasse',
    instruction: 'Clica num pronome e depois na sua subclasse correta para fazer o par!',
    words: [
      { id: 'w1', text: 'nós', matchKey: 'pessoal' },
      { id: 'w2', text: 'vosso', matchKey: 'possessivo' },
      { id: 'w3', text: 'aquele', matchKey: 'demonstrativo' },
      { id: 'w4', text: 'elas', matchKey: 'pessoal' },
      { id: 'w5', text: 'minha', matchKey: 'possessivo' },
      { id: 'w6', text: 'isto', matchKey: 'demonstrativo' },
    ],
    categories: [
      { id: 'c1', text: 'Pronome Pessoal', matchKey: 'pessoal' },
      { id: 'c2', text: 'Pronome Possessivo', matchKey: 'possessivo' },
      { id: 'c3', text: 'Pronome Demonstrativo', matchKey: 'demonstrativo' },
    ],
  },
  {
    id: 'match-2',
    title: 'Nível 2: Perto, Aí ou Longe?',
    instruction: 'Liga cada pronome demonstrativo à distância que ele indica!',
    words: [
      { id: 'w7', text: 'este / esta', matchKey: 'perto' },
      { id: 'w8', text: 'esse / essa', matchKey: 'meio' },
      { id: 'w9', text: 'aquele / aquela', matchKey: 'longe' },
      { id: 'w10', text: 'isto', matchKey: 'perto' },
      { id: 'w11', text: 'isso', matchKey: 'meio' },
      { id: 'w12', text: 'aquilo', matchKey: 'longe' },
    ],
    categories: [
      { id: 'c4', text: 'Perto de quem fala (aqui)', matchKey: 'perto' },
      { id: 'c5', text: 'Perto de quem ouve (aí)', matchKey: 'meio' },
      { id: 'c6', text: 'Longe de ambos (lá)', matchKey: 'longe' },
    ],
  },
];

// 2. ESCAPE ROOM
export const ESCAPE_ROOM_STEPS: EscapeRoomStep[] = [
  {
    id: 1,
    roomName: 'Sala 1: A Câmara dos Sujeitos Ocultos',
    description:
      'Estás preso na sala de leitura da velha biblioteca. Na parede está uma inscrição: "Descobre quem realizou a ação para revelar o 1.º dígito da chave!"',
    riddle: 'Na frase «O Tiago e a Inês leram o conto», qual é o pronome que substitui "O Tiago e a Inês"?',
    hint: 'São duas pessoas: um rapaz e uma rapariga juntos no plural.',
    options: [
      { text: 'Eles', isCorrect: true, feedback: 'Excelente! "Eles" substitui o grupo "O Tiago e a Inês". O 1.º dígito é 4!', digit: '4' },
      { text: 'Nós', isCorrect: false, feedback: '"Nós" inclui quem fala (eu + alguém). Aqui falamos de outras pessoas!', digit: '' },
      { text: 'Elas', isCorrect: false, feedback: 'Como temos o Tiago (masculino) e a Inês (feminino), o plural faz-se no masculino: Eles.', digit: '' },
      { text: 'Tu', isCorrect: false, feedback: '"Tu" é singular (uma só pessoa). Aqui são duas!', digit: '' },
    ],
  },
  {
    id: 2,
    roomName: 'Sala 2: O Cofre dos Possuidores',
    description:
      'Uma pesada porta de carvalho bloqueia o teu caminho. Há duas gavetas etiquetadas: "Um só dono" e "Vários donos". Para passar, tens de identificar a posse correta.',
    riddle: 'Qual destes pronomes possessivos indica que o objeto pertence a VÁRIOS possuidores (1.ª pessoa)?',
    hint: 'Pensa numa coisa que é tua e dos teus amigos ao mesmo tempo.',
    options: [
      { text: 'meu', isCorrect: false, feedback: '"Meu" pertence a um só possuidor (eu).', digit: '' },
      { text: 'nosso', isCorrect: true, feedback: 'Certo! "Nosso" indica posse de várias pessoas (nós). O 2.º dígito é 7!', digit: '7' },
      { text: 'teu', isCorrect: false, feedback: '"Teu" pertence apenas à pessoa com quem falas (tu).', digit: '' },
      { text: 'minha', isCorrect: false, feedback: '"Minha" é de uma só pessoa.', digit: '' },
    ],
  },
  {
    id: 3,
    roomName: 'Sala 3: O Labirinto dos Invariáveis',
    description:
      'Aparece uma ponte de pedra sobre um abismo. Uma gárgula de pedra pergunta: "Apenas palavras que NUNCA mudam de género ou número podem atravessar!"',
    riddle: 'Qual destes pronomes demonstrativos é INVARIÁVEL (não tem feminino nem plural)?',
    hint: 'Lembra-te do trio especial: isto, isso, aquilo!',
    options: [
      { text: 'aquele', isCorrect: false, feedback: '"Aquele" varia: existe "aquela", "aqueles", "aquelas".', digit: '' },
      { text: 'este', isCorrect: false, feedback: '"Este" varia: existe "esta", "estes", "estas".', digit: '' },
      { text: 'isto', isCorrect: true, feedback: 'Brilhante! "Isto" nunca muda de forma. O 3.º dígito é 2!', digit: '2' },
      { text: 'essa', isCorrect: false, feedback: '"Essa" é a forma feminina de "esse". É variável!', digit: '' },
    ],
  },
  {
    id: 4,
    roomName: 'Sala 4: O Portal Final do Guardião',
    description:
      'Estás diante do portal mágico de saída. Para obter o 4.º e último dígito, precisas de reconhecer o pronome pessoal complemento da frase!',
    riddle: 'Na frase do teu manual: «Ela deu-te um bolo», que palavra é o pronome pessoal?',
    hint: 'Repara na palavra ligada ao verbo que indica a quem foi dado o bolo.',
    options: [
      { text: 'bolo', isCorrect: false, feedback: '"Bolo" é um nome comum, não é um pronome.', digit: '' },
      { text: 'te (ou Ela)', isCorrect: true, feedback: 'Fantástico! "te" e "Ela" são pronomes pessoais! O 4.º dígito é 9!', digit: '9' },
      { text: 'deu', isCorrect: false, feedback: '"Deu" é uma forma do verbo dar.', digit: '' },
      { text: 'um', isCorrect: false, feedback: '"Um" é um determinante artigo indefinido.', digit: '' },
    ],
  },
];

// 3. THREE TRUTHS AND ONE LIE
export const THREE_TRUTHS_ROUNDS: ThreeTruthsRound[] = [
  {
    id: 1,
    title: 'Ronda 1: O que faz um Pronome?',
    statements: [
      {
        id: 's1',
        text: 'O pronome pode substituir um grupo nominal (como "o menino" por "ele").',
        isLie: false,
        explanation: 'Verdadeiro! É uma das funções principais do pronome.',
      },
      {
        id: 's2',
        text: 'A maior parte dos pronomes varia em número (singular/plural) e género.',
        isLie: false,
        explanation: 'Verdadeiro! Mudam para combinar com o nome que substituem.',
      },
      {
        id: 's3',
        text: 'Todos os pronomes da língua portuguesa são obrigados a ter plural.',
        isLie: true,
        explanation: 'MENTIRA ENCONTRADA! Há pronomes invariáveis como "isto", "isso" e "aquilo" que não têm plural!',
      },
      {
        id: 's4',
        text: 'O pronome ajuda a evitar repetições desnecessárias num texto.',
        isLie: false,
        explanation: 'Verdadeiro! Torna a escrita muito mais bonita e fluida.',
      },
    ],
  },
  {
    id: 2,
    title: 'Ronda 2: Segredos dos Pronomes Possessivos',
    statements: [
      {
        id: 's5',
        text: '«O meu carro é giro e o teu?» contém dois pronomes possessivos.',
        isLie: false,
        explanation: 'Verdadeiro! É o exemplo do teu manual do 5.º ano: "meu" e "teu".',
      },
      {
        id: 's6',
        text: '«Nosso» e «nossa» referem-se a vários possuidores (1.ª pessoa do plural).',
        isLie: false,
        explanation: 'Verdadeiro! Pertence a nós todos.',
      },
      {
        id: 's7',
        text: 'A palavra «correr» é um pronome possessivo feminino.',
        isLie: true,
        explanation: 'MENTIRA ENCONTRADA! «Correr» é um verbo, nunca um pronome!',
      },
      {
        id: 's8',
        text: 'Os pronomes possessivos variam em masculino e feminino (ex: teu / tua).',
        isLie: false,
        explanation: 'Verdadeiro! Mudam conforme o género do que é possuído.',
      },
    ],
  },
  {
    id: 3,
    title: 'Ronda 3: Demonstrativos e Distâncias',
    statements: [
      {
        id: 's9',
        text: '«Este» usa-se para algo que está perto da pessoa que está a falar.',
        isLie: false,
        explanation: 'Verdadeiro! Se está aqui na minha mão, digo «este».',
      },
      {
        id: 's10',
        text: '«Aquilo» é um pronome variável que tem a forma feminina «aquila».',
        isLie: true,
        explanation: 'MENTIRA ENCONTRADA! Não existe "aquila"! «Aquilo» é invariável e nunca muda!',
      },
      {
        id: 's11',
        text: '«Aquele» usa-se para mostrar algo que está longe de quem fala e de quem ouve.',
        isLie: false,
        explanation: 'Verdadeiro! Ex: «Aquele pássaro lá no céu».',
      },
      {
        id: 's12',
        text: '«Isto», «isso» e «aquilo» pertencem à subclasse dos pronomes demonstrativos.',
        isLie: false,
        explanation: 'Verdadeiro! São os 3 demonstrativos invariáveis.',
      },
    ],
  },
];

// 4. THE IMPOSTOR
export const IMPOSTOR_ROUNDS: ImpostorRound[] = [
  {
    id: 1,
    categoryTitle: 'Missão: Missão Pronomes Pessoais',
    hint: 'Três palavras são pronomes pessoais. Uma palavra é um impostor disfarçado!',
    words: [
      { text: 'nós', isImpostor: false, explanation: '«Nós» é pronome pessoal da 1.ª pessoa do plural.' },
      { text: 'tu', isImpostor: false, explanation: '«Tu» é pronome pessoal da 2.ª pessoa do singular.' },
      { text: 'bonito', isImpostor: true, explanation: 'IMPOSTOR APANHADO! «Bonito» é um adjetivo, não é pronome!' },
      { text: 'eles', isImpostor: false, explanation: '«Eles» é pronome pessoal da 3.ª pessoa do plural.' },
    ],
  },
  {
    id: 2,
    categoryTitle: 'Missão: Esquadrão dos Possessivos',
    hint: 'Quem não indica posse nesta equipa?',
    words: [
      { text: 'meu', isImpostor: false, explanation: '«Meu» indica que algo pertence a mim.' },
      { text: 'ontem', isImpostor: true, explanation: 'IMPOSTOR APANHADO! «Ontem» é um advérbio de tempo, não é pronome!' },
      { text: 'vosso', isImpostor: false, explanation: '«Vosso» indica pertença de vós.' },
      { text: 'nossa', isImpostor: false, explanation: '«Nossa» é possessivo feminino de nós.' },
    ],
  },
  {
    id: 3,
    categoryTitle: 'Missão: Clube dos Demonstrativos',
    hint: 'Procura a palavra que não serve para apontar nem demonstrar.',
    words: [
      { text: 'este', isImpostor: false, explanation: '«Este» demonstra proximidade de quem fala.' },
      { text: 'aquele', isImpostor: false, explanation: '«Aquele» demonstra distância.' },
      { text: 'mesa', isImpostor: true, explanation: 'IMPOSTOR APANHADO! «Mesa» é um nome comum, não é pronome!' },
      { text: 'isto', isImpostor: false, explanation: '«Isto» é demonstrativo invariável.' },
    ],
  },
  {
    id: 4,
    categoryTitle: 'Missão: O Trio dos Invariáveis',
    hint: 'Descobre qual palavra é VARIÁVEL e infiltrou-se entre os invariáveis!',
    words: [
      { text: 'isto', isImpostor: false, explanation: '«Isto» é 100% invariável.' },
      { text: 'isso', isImpostor: false, explanation: '«Isso» é 100% invariável.' },
      { text: 'aquilo', isImpostor: false, explanation: '«Aquilo» é 100% invariável.' },
      { text: 'esta', isImpostor: true, explanation: 'IMPOSTOR APANHADO! «Esta» é variável (muda para este, estes, estas)!' },
    ],
  },
];

// 5. TRUE OR FALSE
export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: 1,
    statement: 'Um pronome tem a capacidade de substituir um grupo nominal numa frase.',
    isTrue: true,
    explanation: 'Correto! Por exemplo, "O Pedro" pode ser substituído por "Ele".',
    tip: 'Pensa: o pronome joga no lugar do nome!',
  },
  {
    id: 2,
    statement: 'A palavra «isto» tem uma forma feminina chamada «ista».',
    isTrue: false,
    explanation: 'Falso! «Isto» é um pronome invariável, nunca muda de forma nem tem feminino.',
    tip: 'Lembra-te: isto, isso e aquilo nunca mudam!',
  },
  {
    id: 3,
    statement: 'Na frase «Tu gostaste de comê-lo», a palavra «-lo» é um pronome pessoal.',
    isTrue: true,
    explanation: 'Verdadeiro! É uma forma do pronome «o» ligada ao verbo por hífen.',
    tip: 'Este é um exemplo direto do teu manual!',
  },
  {
    id: 4,
    statement: 'Os pronomes possessivos indicam se um objeto está perto ou longe de quem fala.',
    isTrue: false,
    explanation: 'Falso! Quem indica perto ou longe são os pronomes demonstrativos. Os possessivos indicam POSSE (de quem é)!',
    tip: 'Possessivo = posse / Demonstrativo = demonstrar distância.',
  },
  {
    id: 5,
    statement: '«Eu», «tu», «ele», «nós», «vós» e «eles» desempenham habitualmente a função de sujeito.',
    isTrue: true,
    explanation: 'Verdadeiro! São os pronomes pessoais retos (sujeito) do 5.º ano.',
    tip: 'Quem faz a ação na frase? Eu, tu, ele...',
  },
  {
    id: 6,
    statement: '«Aquele» usa-se para algo que está encostado à mão de quem fala.',
    isTrue: false,
    explanation: 'Falso! Se está encostado à mão de quem fala usa-se «este». «Aquele» usa-se para algo que está longe!',
    tip: 'Este = aqui perto. Aquele = lá longe.',
  },
];

// 6. MULTIPLE CHOICE
export const MULTIPLE_CHOICE_QUESTIONS: MultipleChoiceQuestion[] = [
  {
    id: 1,
    question: 'Na frase «A professora elogiou o trabalho da turma e disse: — O vosso projeto está excelente!», a palavra «vosso» é:',
    context: 'Lê com atenção a palavra destacada.',
    options: [
      'Pronome possessivo (vários possuidores)',
      'Pronome demonstrativo invariável',
      'Pronome pessoal sujeito',
      'Nome comum coletivo',
    ],
    correctIndex: 0,
    explanation: '«Vosso» indica que o projeto pertence a vós (alunos). É um pronome possessivo de vários possuidores!',
    hint: 'Indica a quem pertence o projeto.',
  },
  {
    id: 2,
    question: 'Qual das opções contém APENAS pronomes demonstrativos invariáveis?',
    context: 'Pronomes que nunca mudam para o plural ou feminino.',
    options: [
      'este, esse, aquele',
      'isto, isso, aquilo',
      'meu, teu, seu',
      'eu, tu, ele',
    ],
    correctIndex: 1,
    explanation: 'Muito bem! «Isto», «isso» e «aquilo» são os três pronomes demonstrativos invariáveis do teu programa.',
    hint: 'Procura o trio que não tem forma no plural!',
  },
  {
    id: 3,
    question: 'Na frase «Nós queríamo-lo», que pronome substitui o complemento direto?',
    context: 'Exemplo retirado do teu manual Palavras fora da Caixa.',
    options: [
      'Nós',
      '-lo (forma do pronome o)',
      'queríamos',
      'bolo',
    ],
    correctIndex: 1,
    explanation: 'Exato! «Nós» é o sujeito, mas quem substitui o que era querido (o bolo/objeto) é o pronome «-lo».',
    hint: 'Procura a pequena partícula no final do verbo ligada com hífen.',
  },
  {
    id: 4,
    question: 'O Pedro quer apontar para um livro que está lá longe, na prateleira mais alta da estante. Ele deve dizer:',
    context: 'Situação prática do dia a dia.',
    options: [
      '«Podes passar-me este livro aqui?»',
      '«Qual é o livro? É aquele lá em cima!»',
      '«Gosto muito disto.»',
      '«O meu livro é teu.»',
    ],
    correctIndex: 1,
    explanation: 'Como o livro está longe tanto do Pedro como de quem o ouve, usa-se o pronome demonstrativo «aquele»!',
    hint: 'Para coisas distantes usamos aquele / aquela.',
  },
  {
    id: 5,
    question: 'Se quiseres substituir a expressão "à minha amiga" na frase «Eu emprestei o estojo à minha amiga», como fica a frase?',
    context: 'Substituição por pronome pessoal complemento indireto.',
    options: [
      '«Eu emprestei-te o estojo.»',
      '«Eu emprestei-lhe o estojo.»',
      '«Eu emprestei-nos o estojo.»',
      '«Eu emprestei-vos o estojo.»',
    ],
    correctIndex: 1,
    explanation: 'Parabéns! «Lhe» é o pronome pessoal da 3.ª pessoa do singular para complemento indireto (a ela).',
    hint: 'A ela = lhe.',
  },
];

// 7. TEAM BATTLE (EXERCÍCIO DE GRUPO / DUELO DE TURMA)
export const TEAM_BATTLE_QUESTIONS: TeamBattleQuestion[] = [
  {
    id: 1,
    question: 'Qual é o pronome pessoal da 1.ª pessoa do plural (sujeito)?',
    options: ['Eu', 'Nós', 'Vós', 'Eles'],
    correctIndex: 1,
    points: 100,
    explanation: '«Nós» representa a 1.ª pessoa do plural (eu + outros).',
  },
  {
    id: 2,
    question: 'Em «O meu cão ladra muito», «meu» refere-se a:',
    options: ['Vários possuidores', 'Um possuidor (1.ª pessoa)', 'Nenhum possuidor', 'Distância longa'],
    correctIndex: 1,
    points: 100,
    explanation: '«Meu» indica um só dono: eu!',
  },
  {
    id: 3,
    question: 'Qual dos seguintes pronomes é INVARIÁVEL?',
    options: ['aquilo', 'aquela', 'aqueles', 'aquele'],
    correctIndex: 0,
    points: 150,
    explanation: '«Aquilo» nunca muda. As outras opções variam em género e número.',
  },
  {
    id: 4,
    question: 'Se algo está mesmo perto da pessoa com quem estou a falar, que pronome uso?',
    options: ['este', 'esse', 'aquele', 'outro'],
    correctIndex: 1,
    points: 150,
    explanation: '«Esse» indica proximidade de quem ouve (2.ª pessoa).',
  },
  {
    id: 5,
    question: 'Na frase «Ela deu-te um bolo», que função tem «Ela»?',
    options: ['Sujeito da frase', 'Complemento direto', 'Complemento indireto', 'Adjetivo'],
    correctIndex: 0,
    points: 150,
    explanation: '«Ela» é o sujeito (quem deu o bolo). «te» é o complemento indireto.',
  },
  {
    id: 6,
    question: '«A nossa escola tem uma biblioteca maravilhosa.» A palavra «nossa» é:',
    options: ['Pronome pessoal', 'Pronome possessivo', 'Pronome demonstrativo', 'Verbo'],
    correctIndex: 1,
    points: 100,
    explanation: '«Nossa» indica posse colectiva da 1.ª pessoa do plural.',
  },
];

// 8. TREASURE HUNT (CAÇA AO TESOURO)
export const TREASURE_CLUES: TreasureClue[] = [
  {
    id: 1,
    spotName: 'O Farol da Entrada',
    riddle: 'No texto do faroleiro, encontra o pronome pessoal que representa a 1.ª pessoa:',
    passageText: '«O vento soprava forte na baía. Eu subi ao topo da torre para acender a grande lâmpada dourada.»',
    targetPronoun: 'Eu',
    gemName: 'Gema Safira do Sujeito',
    gemColor: '#2563eb',
    explanation: 'Encontraste «Eu»! É o pronome pessoal sujeito que substitui o nome do faroleiro.',
  },
  {
    id: 2,
    spotName: 'O Bosque das Partilhas',
    riddle: 'Dois esquilos estão a falar sobre as avelãs recolhidas. Descobre a palavra que mostra a quem pertence o cesto:',
    passageText: '«Guardei todas as bolotas no buraco da árvore, mas o cesto com as castanhas é nosso!»',
    targetPronoun: 'nosso',
    gemName: 'Gema Esmeralda da Posse',
    gemColor: '#059669',
    explanation: 'Encontraste «nosso»! É o pronome possessivo de vários possuidores.',
  },
  {
    id: 3,
    spotName: 'A Ponte dos Segredos',
    riddle: 'O capitão aponta para o mapa em cima da mesa. Qual é o demonstrativo invariável que ele usou?',
    passageText: '«Olhem bem para o pergaminho. Não toquem em nada, porque isto pode desmanchar-se com o vento.»',
    targetPronoun: 'isto',
    gemName: 'Gema Rubi Invariável',
    gemColor: '#e11d48',
    explanation: 'Encontraste «isto»! É o pronome demonstrativo invariável para coisas perto de quem fala.',
  },
  {
    id: 4,
    spotName: 'A Gruta do Eco',
    riddle: 'Uma mensagem foi gravada na rocha. Descobre o pronome demonstrativo que aponta para um navio ao longe no horizonte:',
    passageText: '«Se olhardes para o mar alto, vereis aquele navio pirata com velas brancas a navegar.»',
    targetPronoun: 'aquele',
    gemName: 'Gema Ametista da Distância',
    gemColor: '#9333ea',
    explanation: 'Encontraste «aquele»! Demonstra algo que está longe de quem fala e de quem escuta.',
  },
  {
    id: 5,
    spotName: 'O Baú Dourado Final',
    riddle: 'Para abrir o cadeado de ouro, descobre o pronome pessoal complemento na fala do papagaio real:',
    passageText: '«O tesouro é lendário e o rei ofereceu-me a chave dourada para a vossa turma!»',
    targetPronoun: '-me',
    gemName: 'Diamante Supremo dos Pronomes',
    gemColor: '#f59e0b',
    explanation: 'Encontraste «-me»! É o pronome pessoal complemento que revela a chave do grande baú!',
  },
];
