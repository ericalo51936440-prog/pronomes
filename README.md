# 🌟 Aventura dos Pronomes - Português 5.º Ano

Uma plataforma educativa e interactiva desenvolvida para alunos do 5.º ano de escolaridade (10 a 12 anos), especialmente concebida com apoios de acessibilidade e leitura facilitada. Baseada no programa de Português e no manual escolar *«Palavras fora da Caixa»* (Raiz Editora).

---

## 🚀 Como Publicar no GitHub e Ativar o GitHub Pages

Este projeto já vem **100% configurado** com suporte para caminhos relativos (`base: './'`) e com um fluxo de **GitHub Actions** (`.github/workflows/deploy.yml`) para publicação automática.

### Passo 1: Criar o Repositório no GitHub
1. Entra na tua conta no [GitHub](https://github.com/) e cria um novo repositório (por exemplo: `aventura-dos-pronomes`).
2. Mantém o repositório como **Público** (ou Privado com GitHub Pages ativo).

### Passo 2: Enviar o Código para o GitHub
No terminal da tua máquina local (na pasta do projeto), executa os seguintes comandos:

```bash
# 1. Inicializar o repositório git (se ainda não estiver inicializado)
git init

# 2. Adicionar todos os ficheiros
git add .

# 3. Criar o primeiro commit
git commit -m "Publicação inicial: Aventura dos Pronomes 5.º Ano"

# 4. Definir a branch principal como main
git branch -M main

# 5. Associar ao teu repositório remoto (substitui pelo teu utilizador e repositório)
git remote add origin https://github.com/O-TEU-UTILIZADOR/aventura-dos-pronomes.git

# 6. Enviar para o GitHub
git push -u origin main
```

### Passo 3: Ativar o GitHub Pages
1. No teu repositório no GitHub, clica em **Settings** (no menu superior).
2. Na barra lateral esquerda, clica em **Pages** (na secção *Code and automation*).
3. Na opção **Build and deployment** > **Source**, seleciona:
   👉 **GitHub Actions**
4. Pronto! O fluxo de compilação automática vai arrancar. Em cerca de 1 a 2 minutos, o teu site estará publicado e acessível no endereço:
   `https://O-TEU-UTILIZADOR.github.io/aventura-dos-pronomes/`

---

## 💻 Desenvolvimento Local

Para testar ou executar o projeto no teu computador:

```bash
# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Gerar a compilação para produção
npm run build

# Pré-visualizar a compilação de produção
npm run preview
```

---

## 🎯 Conteúdos Pedagógicos Incluídos

- **Classes de Palavras: O Pronome (5.º Ano)**
  - O que é o pronome e o que pode substituir (grupo nominal, adjetivo, grupo preposicional, frase).
  - Variáveis em género e número vs. Invariáveis (*isto, isso, aquilo*).
  - **Pronomes Pessoais**: Sujeito (*eu, tu, ele/ela, nós, vós, eles/elas*) e Complementos direto/indireto (*me, te, o, a, se, nos, vos, lhes/lhe*).
  - **Pronomes Possessivos**: Um possuidor (*meu, teu, seu*) e Vários possuidores (*nosso, vosso, seu*).
  - **Pronomes Demonstrativos**: A régua da distância (*este/esta/isto*, *esse/essa/isso*, *aquele/aquela/aquilo*).

---

## 🎮 Jogos e Atividades Interactivas

1. **Exercícios de Correspondência**: ligar os pronomes às suas subclasses ou distâncias.
2. **Escape Room (*O Mistério da Biblioteca*)**: 4 salas com enigmas que revelam a chave secreta de 4 dígitos.
3. **3 Verdades e 1 Mentira**: descobrir a afirmação falsa entre quatro frases.
4. **O Impostor**: descobrir a palavra intrusa que não pertence à classe.
5. **Verdadeiro ou Falso**: perguntas dinâmicas com dicas de memorização.
6. **Quiz de Escolha Múltipla**: perguntas de exame com dicas do professor.
7. **Duelo de Turma (Jogo em Grupo)**: competição amigável entre duas equipas (*Azul vs Vermelha*) com placar de pontos em tempo real.
8. **Caça ao Tesouro**: mapa na Ilha da Gramática com 5 pistas no texto para encontrar as gemas mágicas.

---

## ♿ Recursos de Acessibilidade

- **Leitor de Voz (Text-to-Speech)** em Português de Portugal para alunos com dificuldades de leitura.
- **Tipografia Lexend**: fonte com elevada legibilidade recomendada para alunos com dislexia.
- **Modo Foco de Leitura**: espaçamento otimizado para facilitar o acompanhamento visual.
- **Tamanho de Letra Ajustável** (A / A+ / A++).
- **Caderneta de Medalhas e Diploma Imprimível** com feedback personalizado.
