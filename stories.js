const stories = [
  // 1-36: REWORK DAS HISTÓRIAS ORIGINAIS (Mantendo IDs e Unlocks)
  {
    id: "flowers",
    title: "Invocação das Flores",
    icon: "🌸",
    unlock: 1,
    friend: "melody",
    text: "My Melody desenhou um círculo de transmutação no chão usando pétalas. Ela está murmurando palavras em latim.",
    choices: ["Ajudar no ritual cabalístico", "Chutar as pétalas e correr", "Fazer uma pose de JoJo", "Oferecer um pudim ao demônio"],
    outcomes: [
      { type: "good", message: "O ritual funcionou! Flores de cerejeira brotaram abençoando você com corações." },
      { type: "bad", message: "My Melody ficou com os olhos vermelhos e sugou sua energia vital..." },
      { type: "neutral", message: "Um Stand de flor apareceu, achou sua pose maneira, mandou um 'Yare Yare Daze' e foi embora." },
      { type: "chaotic", message: "O demônio amou o pudim e a realidade distorceu aleatoriamente!" }
    ]
  },
  {
    id: "tea",
    title: "Chá Radioativo",
    icon: "🫖",
    unlock: 4,
    friend: "kitty",
    text: "A mesa do chá está brilhando verde neon. Hello Kitty diz que é 'matcha especial' importado de Chernobyl.",
    choices: ["Beber tudo bravamente", "Derramar o chá no chão", "Analisar o chá com um Scouter", "Invocar a Vigilância Sanitária"],
    outcomes: [
      { type: "good", message: "Você ganhou superpoderes temporários e uma avalanche de corações!" },
      { type: "bad", message: "O chá derramado derreteu o chão e engoliu suas gemas no processo." },
      { type: "neutral", message: "'It's over 9000!!!' O scouter explodiu, mas ninguém se feriu." },
      { type: "chaotic", message: "Agentes do governo invadiram a festa, confiscaram os bolos e o caos se instaurou!" }
    ]
  },
  {
    id: "sweets",
    title: "Pudim Sensiente",
    icon: "🍰",
    unlock: 8,
    friend: "pompom",
    text: "O pudim gigante do Pompompurin abriu um olho e perguntou o sentido da vida.",
    choices: ["Dar uma palestra filosófica", "Comer o pudim vivo", "Colocar um óculos escuro no pudim", "Cantar a abertura de Evangelion"],
    outcomes: [
      { type: "good", message: "A palestra iluminou o pudim. Ele ascendeu aos céus e deixou um tesouro!" },
      { type: "bad", message: "O pudim revidou! Você sofreu uma intoxicação alimentar e perdeu itens." },
      { type: "neutral", message: "O pudim se achou descolado, cruzou os bracinhos (de gelatina) e sorriu." },
      { type: "chaotic", message: "'Cruel Angel's Thesis' ecoou... O pudim entrou num robô gigante." }
    ]
  },
  {
    id: "clouds",
    title: "Nuvem Voadora Kintoun",
    icon: "☁️",
    unlock: 13,
    friend: "cinnamoroll",
    text: "Cinnamoroll trouxe uma nuvem dourada. Ele diz que só quem tem o coração puro pode subir.",
    choices: ["Pular com confiança", "Duvidar da própria pureza", "Gritar 'KAMEHAMEHA' pra nuvem", "Oferecer dinheiro pra nuvem"],
    outcomes: [
      { type: "good", message: "Você subiu e surfou pelos céus coletando gemas puras!" },
      { type: "bad", message: "Você caiu feio porque no fundo já mentiu no imposto de renda..." },
      { type: "neutral", message: "Cinnamoroll ficou assustado com o grito, mas te achou divertido." },
      { type: "chaotic", message: "A nuvem aceitou o suborno e te levou pra um cassino nas alturas!" }
    ]
  },
  {
    id: "treasure",
    title: "O One Piece Existe!",
    icon: "🗺️",
    unlock: 18,
    friend: "chococat",
    text: "Chococat achou um mapa que promete o maior tesouro do mundo, assinado por um tal de 'Joy Boy'.",
    choices: ["Zarpar rumo a Grand Line", "Rasgar o mapa", "Procurar Frutas do Diabo", "Comer carne como um desesperado"],
    outcomes: [
      { type: "good", message: "Você achou o tesouro! A amizade e muitos corações foram a recompensa!" },
      { type: "bad", message: "A Marinha descobriu seu plano e confiscou parte do seu inventário." },
      { type: "neutral", message: "Você não achou nenhuma fruta, mas encontrou uma maçã bem gostosa." },
      { type: "chaotic", message: "Seu corpo esticou que nem borracha e você esbarrou em tudo!" }
    ]
  },
  {
    id: "stars",
    title: "Estrelas Explosivas",
    icon: "🌟",
    unlock: 25,
    friend: "twinstars",
    text: "As estrelas gêmeas pegaram pólvora ao invés de poeira estelar. Elas vão acender a noite!",
    choices: ["Substituir por glitter mágico", "Acender com um lança-chamas", "Gritar 'EXPLOSION!'", "Chamar os bombeiros"],
    outcomes: [
      { type: "good", message: "O glitter mágico salvou a festa e gerou uma chuva de recompensas." },
      { type: "bad", message: "KABOOM! Você perdeu muitos corações e precisou pagar os danos." },
      { type: "neutral", message: "A Megumin estaria orgulhosa do seu grito de invocação." },
      { type: "chaotic", message: "Os bombeiros chegaram e fizeram um churrasco surpresa!" }
    ]
  },
  {
    id: "lake",
    title: "Sapos Shinobis",
    icon: "🐸",
    unlock: 30,
    friend: "keroppi",
    text: "Keroppi está treinando selos de mão com os sapos do Monte Myōboku no lago.",
    choices: ["Aprender o Modo Sábio", "Jogar uma pedra no lago", "Invocar uma cobra gigante", "Correr com os braços pra trás"],
    outcomes: [
      { type: "good", message: "Você dominou o chakra da natureza e recebeu muito poder!" },
      { type: "bad", message: "A pedra acordou um sapo ancião mal-humorado que roubou suas gemas." },
      { type: "neutral", message: "Todo mundo correu que nem o Naruto, foi um exercício ótimo." },
      { type: "chaotic", message: "Jiraiya apareceu no lago buscando 'inspiração' para seus livros..." }
    ]
  },
  {
    id: "secret",
    title: "Diário do Futuro",
    icon: "🖤",
    unlock: 35,
    friend: "kuromi",
    text: "Kuromi abriu seu diário secreto e percebeu que ele está prevendo o futuro, dizendo que você vai morrer em 5 minutos.",
    choices: ["Mudar a linha do tempo", "Aceitar o destino", "Gritar 'YUKKIIII!'", "Jogar o diário no lixo"],
    outcomes: [
      { type: "good", message: "Você alterou o espaço-tempo e salvou o dia ganhando presentes." },
      { type: "bad", message: "Você aceitou o destino e a Kuromi te cobrou um pedágio pós-vida." },
      { type: "neutral", message: "Kuromi revirou os olhos com a sua referência a Mirai Nikki." },
      { type: "chaotic", message: "O lixo era um buraco negro que distorceu todas as suas finanças!" }
    ]
  },
  {
    id: "skate",
    title: "Pro Skater 9000",
    icon: "🛹",
    unlock: 40,
    friend: "badtz",
    text: "Badtz-Maru quer dar um 'Kickflip 1080' pulando por cima de um vulcão ativo improvisado.",
    choices: ["Equipar o skate com foguetes", "Sabotar as rodinhas", "Colocar som de Tony Hawk", "Oferecer um capacete de gatinho"],
    outcomes: [
      { type: "good", message: "A manobra foi épica e os patrocinadores te lotaram de corações!" },
      { type: "bad", message: "O vulcão espirrou lava e derreteu algumas gemas do seu bolso." },
      { type: "neutral", message: "A trilha sonora nostálgica do PS1 deixou todo mundo emocionado." },
      { type: "chaotic", message: "Badtz voou pro espaço e descobriu vida alienígena!" }
    ]
  },
  {
    id: "piano",
    title: "Concerto de Chopin e Chaos",
    icon: "🎹",
    unlock: 45,
    friend: "daniel",
    text: "Dear Daniel está tocando piano, mas a partitura pertence ao fantasma da Ópera.",
    choices: ["Tocar uma melodia angelical", "Bater no teclado furiosamente", "Dedilhar a música do Mario", "Vestir uma máscara quebrada"],
    outcomes: [
      { type: "good", message: "O fantasma chorou de emoção e te deixou uma herança de corações." },
      { type: "bad", message: "O piano quebrou e você teve que bancar o conserto." },
      { type: "neutral", message: "Um encanador de bigode apareceu pulando pelos móveis." },
      { type: "chaotic", message: "O lustre do teto desabou, mas caiu em slow-motion cinematográfico!" }
    ]
  },
  {
    id: "race",
    title: "Corrida Titanica",
    icon: "👟",
    unlock: 50,
    friend: "pochacco",
    text: "Pochacco organizou uma corrida, mas do nada apareceu um Titã Colossal de Pelúcia correndo atrás de todos.",
    choices: ["Usar o Equipamento DMT", "Gritar 'SHINZOU WO SASAGEYO!'", "Deixar o Pochacco pra trás", "Oferecer um lanchinho ao Titã"],
    outcomes: [
      { type: "good", message: "Vocês manobraram com o DMT, abateram o titã fofo e saquearam o espólio!" },
      { type: "bad", message: "Covarde! Por deixar o amigo pra trás, a culpa levou seus itens embora." },
      { type: "neutral", message: "Todos bateram continência chorando e correram pra valer." },
      { type: "chaotic", message: "O Titã era só o Pompompurin fantasiado buscando pão de queijo!" }
    ]
  },
  {
    id: "dance",
    title: "Batalha de Breakdance Mágica",
    icon: "🕺",
    unlock: 55,
    friend: "pekkle",
    text: "Pekkle começou a fazer moonwalk no chão de madeira, invocando espíritos de discoteca antigos.",
    choices: ["Acompanhar com passinhos sincronizados", "Jogar água no chão de propósito", "Mandar um passinho do Romano", "Invocar o Michael Jackson"],
    outcomes: [
      { type: "good", message: "A pista pegou fogo (no bom sentido) e choveu recompensas brilhantes!" },
      { type: "bad", message: "Pekkle escorregou feio e cobrou de você os custos médicos." },
      { type: "neutral", message: "O Passinho do Romano desestabilizou as leis da física no jardim." },
      { type: "chaotic", message: "Os espíritos fizeram uma coreografia de Thriller com todo o bairro!" }
    ]
  },
  {
    id: "picnic",
    title: "Piquenique no Multiverso",
    icon: "🍎",
    unlock: 60,
    friend: "kitty",
    text: "A toalha xadrez que a Kitty estendeu no gramado acidentalmente rasgou o tecido da realidade.",
    choices: ["Costurar a fenda interdimensional", "Pular dentro do buraco de minhoca", "Oferecer maçãs às variantes da Kitty", "Tirar uma selfie com o caos"],
    outcomes: [
      { type: "good", message: "A fenda foi fechada e a Kitty de outro universo te agradeceu com presentes!" },
      { type: "bad", message: "Você pulou e perdeu grande parte das suas gemas no hiperespaço." },
      { type: "neutral", message: "A selfie bateu 10 milhões de likes, mas você não ganhou 1 centavo." },
      { type: "chaotic", message: "De repente, começou a chover hambúrgueres e patos de borracha!" }
    ]
  },
  { id: "butterflies", title: "Borboletas Mutantes", icon: "🦋", unlock: 65, friend: "melody", text: "As borboletas da My Melody estão comendo metal e crescendo exponencialmente.", choices: ["Alimentá-las com pólen divino", "Fugir com medo dos insetos", "Tentar capturar na Pokébola", "Cantar música de ninar"], outcomes: [{ type: "good", message: "O pólen as acalmou e elas geraram cristais belíssimos!" }, { type: "bad", message: "Elas sentiram seu medo, te perseguiram e roubaram seus itens." }, { type: "neutral", message: "A Pokébola falhou porque você não abaixou o HP delas antes." }, { type: "chaotic", message: "O canto de ninar evoluiu elas para mariposas que brilham neon!" }] },
  { id: "pancakes", title: "Panquecas Alquímicas", icon: "🥞", unlock: 70, friend: "pompom", text: "Pompompurin tentou a transmutação humana para reviver uma panqueca estragada.", choices: ["Fazer a troca equivalente", "Puxar ele pelo rabo", "Adicionar xarope de bordo estelar", "Gritar com sotaque de anime"], outcomes: [{ type: "good", message: "A troca foi perfeita, gerando um estoque de panquecas de ouro!" }, { type: "bad", message: "O tabu foi quebrado. O 'Portão da Verdade' levou suas gemas." }, { type: "neutral", message: "Ele percebeu a loucura e desistiu, mas ficou choramingando." }, { type: "chaotic", message: "A panqueca ganhou vida, pulou da janela e virou prefeita da cidade!" }] },
  { id: "balloon", title: "Up! Altas Aventuras Tóxicas", icon: "🎈", unlock: 75, friend: "cinnamoroll", text: "Cinnamoroll encheu os balões com gás do riso perigoso. A casa vai voar!", choices: ["Amarrar cordas de segurança", "Furar os balões", "Aspirar o gás", "Cantar 'Hakuna Matata'"], outcomes: [{ type: "good", message: "A casa subiu controlada até um cofre secreto no céu." }, { type: "bad", message: "A casa despencou violentamente. Prejuízos severos nos seus fundos." }, { type: "neutral", message: "Todo mundo riu por 4 horas seguidas sem motivo nenhum." }, { type: "chaotic", message: "A casa foi parar na lua e encontraram queijo alienígena." }] },
  { id: "pajamas", title: "Festa do Pijama Assombrada", icon: "🌙", unlock: 80, friend: "kitty", text: "Hello Kitty contou uma história de terror tão bem que invocou um demônio do sono.", choices: ["Exorcizar com travesseiros", "Gritar e se esconder", "Oferecer marshmallow ao demônio", "Apertar o nariz vermelho do demônio"], outcomes: [{ type: "good", message: "A batalha de travesseiros derrotou o mal e gerou muitos pontos!" }, { type: "bad", message: "Você foi possuído e o demônio deletou alguns dos seus itens no inventário." }, { type: "neutral", message: "O demônio adorou o doce, ficou com diabetes astral e sumiu." }, { type: "chaotic", message: "O nariz fez barulho de buzina de palhaço, quebrando toda a tensão!" }] },
  { id: "cake", title: "Bolo de Mentira (The Cake is a Lie)", icon: "🎂", unlock: 85, friend: "melody", text: "My Melody construiu um bolo que, na verdade, é uma simulação de I.A. maligna.", choices: ["Hackear o sistema com fofura", "Comer o servidor do bolo", "Chamar um exterminador do futuro", "Desligar da tomada"], outcomes: [{ type: "good", message: "O hack funcionou e o bolo dropou bitcoins em forma de gemas." }, { type: "bad", message: "Choque elétrico no estômago! Custos altos com reparos." }, { type: "neutral", message: "Arnold Schwarzenegger apareceu, olhou e disse 'I'll be back'." }, { type: "chaotic", message: "O bolo fez o barulho do Windows 95 desligando e virou pó." }] },
  { id: "hat", title: "O Chapéu Seletor", icon: "🎩", unlock: 90, friend: "pompom", text: "O chapéu perdido do Pompompurin agora fala e quer classificar todo mundo em casas mágicas.", choices: ["Conversar com o chapéu", "Rasgar o chapéu", "Pedir pra ir pra Grifinória", "Colocar o chapéu num cãozinho"], outcomes: [{ type: "good", message: "Você foi pra melhor casa e ganhou rios de recompensa mágica." }, { type: "bad", message: "O chapéu amaldiçoou você com azar puro. Menos corações pra você." }, { type: "neutral", message: "'SONSERINA!' gritou o chapéu. Ninguém ligou." }, { type: "chaotic", message: "O cãozinho virou um mago supremo de nível 99!" }] },
  { id: "sweetcloud", title: "Chuva de Açúcar Ácido", icon: "☁️", unlock: 95, friend: "cinnamoroll", text: "A nuvem de algodão doce do Cinnamoroll começou a chover calda hiper-corrosiva.", choices: ["Abrir o guarda-chuva de cristal", "Deixar chover em cima", "Fazer um escudo de energia", "Cantar 'Singing in the Rain'"], outcomes: [{ type: "good", message: "O escudo repeliu a calda para o solo, brotando plantas valiosas!" }, { type: "bad", message: "Ouch! A calda dissolveu parte do seu dinheiro e itens." }, { type: "neutral", message: "A música clássica não ajudou em nada, mas teve charme." }, { type: "chaotic", message: "A calda derreteu a realidade revelando o código-fonte do universo!" }] },
  { id: "telescope", title: "Invasão Alienígena Fofa", icon: "🔭", unlock: 100, friend: "chococat", text: "Pelo telescópio, Chococat viu naves espaciais em formato de gatinhos vindo em nossa direção.", choices: ["Preparar a diplomacia intergalática", "Atirar com lasers de glitter", "Montar um letreiro de boas-vindas", "Fingir de morto"], outcomes: [{ type: "good", message: "A diplomacia triunfou e eles deram tecnologia alienígena cheia de gemas." }, { type: "bad", message: "Fingir de morto fez eles acharem que podiam levar suas coisas. Roubados!" }, { type: "neutral", message: "Eles leram o letreiro, acharam cafona e deram meia-volta." }, { type: "chaotic", message: "Os aliens desceram, dançaram Macarena e foram embora confusos." }] },
  { id: "comet", title: "Cometa com Complexo de Deus", icon: "🌠", unlock: 105, friend: "twinstars", text: "O cometa que Kiki e Lala acharam começou a discursar sobre como vai destruir e recriar o universo.", choices: ["Purificar o cometa com amor", "Ignorar as ameaças do cometa", "Dar um petisco pra ele calar a boca", "Acionar a defesa planetária"], outcomes: [{ type: "good", message: "O amor purificou o cometa, que chorou meteoros de diamantes!" }, { type: "bad", message: "A defesa falhou e a colisão custou muito caro pra recuperar." }, { type: "neutral", message: "Ele mastigou o petisco e esqueceu que ia destruir o universo." }, { type: "chaotic", message: "O cometa percebeu que era só uma pedra e entrou em depressão." }] },
  { id: "boat", title: "Barcos do Apocalipse Viking", icon: "⛵", unlock: 110, friend: "keroppi", text: "Os barcos de lótus do Keroppi foram possuídos por almas nórdicas procurando Valhalla.", choices: ["Guiá-los bravamente", "Afundar os barcos", "Dar machados de brinquedo", "Cantar o tema de Skyrim"], outcomes: [{ type: "good", message: "Os deuses nórdicos fofinhos aprovaram e te banharam de riquezas." }, { type: "bad", message: "Afundá-los causou a fúria de Odin. Penalidade divina no seu inventário." }, { type: "neutral", message: "FUS RO DAH! O grito assustou até os passarinhos da árvore." }, { type: "chaotic", message: "Eles encontraram Valhalla, que na verdade era um buffet livre de pizza!" }] },
  { id: "potion", title: "A Poção da Verdade Absoluta", icon: "🧪", unlock: 115, friend: "kuromi", text: "Kuromi fez uma poção que revela a maior vergonha de quem beber.", choices: ["Tornar a poção em suco inofensivo", "Beber e confessar os pecados", "Dar pro carteiro beber", "Adicionar mais pimenta negra"], outcomes: [{ type: "good", message: "A confissão libertadora rendeu empatia e prêmios massivos!" }, { type: "bad", message: "O suco azedou e Kuromi cobrou uma multa pelo experimento arruinado." }, { type: "neutral", message: "O carteiro confessou que prefere cães do que gatos. Silêncio sepulcral." }, { type: "chaotic", message: "Você descobriu que todo mundo no universo é na verdade um holograma!" }] },
  { id: "fakemap", title: "O Mapa do Tesouro Reptiliano", icon: "📜", unlock: 120, friend: "badtz", text: "O mapa falso de Badtz-Maru na verdade levou a uma reunião secreta dos Illuminati.", choices: ["Fazer a saudação secreta", "Dedo do meio e correr", "Vender bolo pra eles", "Roubar a pirâmide de ouro"], outcomes: [{ type: "good", message: "Eles adoraram os bolos e financiaram seu império de corações!" }, { type: "bad", message: "A fuga deu errado e os reptilianos zeraram metade dos seus itens." }, { type: "neutral", message: "Eles perceberam que você não era um lagarto e te expulsaram sutilmente." }, { type: "chaotic", message: "Você usurpou o líder e agora é o novo mestre do mundo oculto!" }] },
  { id: "poem", title: "Poesia Cibernética", icon: "💌", unlock: 125, friend: "daniel", text: "Dear Daniel tentou usar o ChatGPT para escrever um poema e invocou um vírus digital.", choices: ["Escrever poema à mão", "Batalha de rima com o Vírus", "Jogar o computador longe", "Dar 'Control+Alt+Del'"], outcomes: [{ type: "good", message: "O poema orgânico encantou o vírus que se converteu em gemas pra você." }, { type: "bad", message: "O PC quebrou feio. Você teve de arcar com os reparos astronômicos." }, { type: "neutral", message: "O vírus respondeu 'Desculpe, sou um modelo de linguagem IA' e travou." }, { type: "chaotic", message: "A batalha de rimas durou 8 anos e virou um musical da Broadway." }] },
  { id: "jump", title: "Pular Corda no Vácuo", icon: "🧶", unlock: 130, friend: "pochacco", text: "Pochacco rodou a corda tão rápido que criou um portal para a 4ª dimensão.", choices: ["Pular com precisão quântica", "Ser sugado pelo portal", "Amarrar a corda numa árvore", "Desfazer a gravidade"], outcomes: [{ type: "good", message: "Pulo perfeito! Seres quadridimensionais te deram presentes épicos." }, { type: "bad", message: "Foi engolido pelo portal e o pedágio pra voltar custou caro na sua carteira." }, { type: "neutral", message: "A árvore flutuou uns 3 centímetros e todo mundo coçou a cabeça." }, { type: "chaotic", message: "A gravidade inverteu e vocês passaram a morar no teto pelo resto do dia." }] },
  { id: "shadows", title: "Sombras Autoconscientes", icon: "🎭", unlock: 135, friend: "pekkle", text: "As sombras do teatro do Pekkle ganharam vida e exigiram aumento de salário.", choices: ["Negociar um contrato justo", "Acender uma luz fortíssima", "Fazer greve junto com as sombras", "Dar café pras sombras"], outcomes: [{ type: "good", message: "O acordo gerou a melhor peça teatral da história. Lucro puro!" }, { type: "bad", message: "A luz forte queimou o teatro, você perdeu corações na reconstrução." }, { type: "neutral", message: "O café passou direto pelas sombras e sujou todo o tapete branco." }, { type: "chaotic", message: "As sombras fundaram um sindicato e declararam guerra ao Sol!" }] },
  { id: "winter", title: "Guerra de Fogo e Gelo", icon: "❄️", unlock: 140, friend: "kitty", text: "A neve virou gelo indestrutível. Bonecos de neve começaram a marchar como 'White Walkers'.", choices: ["Criar dragões de fogo", "Oferecer sopa quente", "Atirar vidro de dragão neles", "Falar 'Winter is coming'"], outcomes: [{ type: "good", message: "Os dragões protegeram a cidade e droparam riquezas infinitas!" }, { type: "bad", message: "Eles não quiseram a sopa e congelaram metade do seu inventário." }, { type: "neutral", message: "Jon Snow ficaria orgulhoso da referência, mas eles não ligaram." }, { type: "chaotic", message: "Os bonecos de neve sentaram, derreteram e viraram uma grande jacuzzi!" }] },
  { id: "lullaby", title: "Canção de Ninar Tenebrosa", icon: "🎶", unlock: 145, friend: "melody", text: "A melodia de My Melody sem querer acorda os deuses antigos de Cthulhu.", choices: ["Mudar o tom para Maior", "Parar de tocar imediatamente", "Gritar 'Ph'nglui mglw'nafh Cthulhu'", "Tocar Heavy Metal"], outcomes: [{ type: "good", message: "O acorde perfeito acalmou o monstro que presenteou o jardim." }, { type: "bad", message: "A sanidade de todos caiu a zero. Penalidade massiva em corações." }, { type: "neutral", message: "Sua pronúncia da língua cósmica foi péssima. Cthulhu riu e dormiu de novo." }, { type: "chaotic", message: "Cthulhu fez um mosh-pit no jardim, quebrando o chão, mas a vibe foi boa!" }] },
  { id: "shoes", title: "Sapatos de Cimento", icon: "👟", unlock: 150, friend: "pompom", text: "Pompompurin calçou sapatos de mafioso italiano na coleção e está afundando na grama.", choices: ["Puxar ele com guindaste", "Cobrar as dívidas do Pompom", "Fazer cosplay de O Poderoso Chefão", "Chamar a polícia canina"], outcomes: [{ type: "good", message: "O resgate rendeu recompensas de agradecimento imensas!" }, { type: "bad", message: "Tentar ser o mafioso deu errado, a polícia pegou suas gemas como suborno." }, { type: "neutral", message: "Você fez uma oferta irrecusável. Ninguém riu da piada." }, { type: "chaotic", message: "A grama engoliu ele e ele virou o Rei Toupeira Subterrâneo!" }] },
  { id: "rainbow", title: "Arco-íris Monocromático", icon: "🌈", unlock: 155, friend: "cinnamoroll", text: "O arco-íris está sugando a cor do mundo. Tudo está ficando preto e branco.", choices: ["Atirar tintas coloridas", "Fugir para o cinema antigo", "Cantar 'Over the Rainbow'", "Comer cogumelos estranhos"], outcomes: [{ type: "good", message: "A tinta revitalizou o arco-íris e choveu presentes coloridos." }, { type: "bad", message: "Você fugiu, o mundo ficou cinza e o seu progresso perdeu o brilho." }, { type: "neutral", message: "Os cogumelos não fizeram nada, você só achou eles bonitos mesmo." }, { type: "chaotic", message: "O mundo virou um filme cult dos anos 20, com piano de fundo e legendas mudas." }] },
  { id: "invention", title: "Máquina do Juízo Final", icon: "⚙️", unlock: 160, friend: "chococat", text: "A máquina de frutas de Chococat acidentalmente ativou um protocolo de lançamento nuclear.", choices: ["Desativar o fio vermelho", "Desativar o fio azul", "Bater na máquina com força", "Pedir ajuda a Siri"], outcomes: [{ type: "good", message: "O fio certo cortado desativou tudo e droparam gemas de brinde." }, { type: "bad", message: "FIO ERRADO! BUM! Um rombo fenomenal no seu estoque." }, { type: "neutral", message: "A Siri respondeu 'Não encontrei resultados para juízo final'." }, { type: "chaotic", message: "A pancada fez a máquina atirar bananas radioativas na lua!" }] },
  { id: "planet", title: "Colisão de Júpiter", icon: "🪐", unlock: 165, friend: "twinstars", text: "Os anéis dos planetas perderam a gravidade e estão vindo esmagar o jardim.", choices: ["Fazer a dança da fusão", "Jogar buracos negros", "Gritar que a Terra é plana", "Levantar os braços para a Genki Dama"], outcomes: [{ type: "good", message: "A Genki Dama empurrou os planetas e te cobriu de energia positiva." }, { type: "bad", message: "Dizer que a Terra é plana enfureceu a ciência cósmica. Perda absurda de status." }, { type: "neutral", message: "Vocês erraram os dedos na dança da fusão e viraram um gordinho fofo temporário." }, { type: "chaotic", message: "O buraco negro sugou tudo e fomos parar no Skyrim. 'Hey, you're finally awake'." }] },
  { id: "bigjump", title: "Salto de Fé Assassino", icon: "🦘", unlock: 170, friend: "keroppi", text: "Keroppi construiu uma rampa e quer pular um poço cheio de piranhas robóticas e ácido.", choices: ["Melhorar o motor da rampa", "Empurrar Keroppi para a morte", "Colocar colchões no fundo", "Fazer o salto vestido de Assassin's Creed"], outcomes: [{ type: "good", message: "A melhoria gerou um voo perfeito, recompensas extremas na aterrisagem!" }, { type: "bad", message: "Que crueldade! O carma atuou imediatamente obliterando seus itens." }, { type: "neutral", message: "O barulho de águia do Assassin's Creed assustou as piranhas." }, { type: "chaotic", message: "As piranhas construíram uma ponte e cobraram pedágio absurdo!" }] },
  { id: "festival", title: "A Noite da Purificação", icon: "🦇", unlock: 175, friend: "kuromi", text: "Kuromi instalou o 'The Purge' fofo. Durante 12 horas, todos os crimes contra doces são permitidos.", choices: ["Fazer uma barricada de balas", "Roubar a confeitaria do Pompom", "Esconder debaixo do edredom", "Chamar o Batman"], outcomes: [{ type: "good", message: "A barricada te protegeu e rendeu um acúmulo insano de tesouros." }, { type: "bad", message: "Roubar deu ruim. A polícia fofa confiscou praticamente tudo que você tinha." }, { type: "neutral", message: "O Batman chegou, disse 'I am Vengeance' e caiu de um degrau." }, { type: "chaotic", message: "O edredom era um portal para a Terra do Nunca onde Peter Pan vende cookies." }] },

  // 37-66: NOVAS MISSÕES DA CULTURA POP (CAOS TOTAL)
  { id: "anime_eva", title: "Entre no Robô, Kitty!", icon: "🤖", unlock: 180, friend: "kitty", text: "Um Anjo gigante ataca Tokyo-3. Gendo Ikari exige que Hello Kitty pilote o EVA 01.", choices: ["Entrar no maldito robô", "Chorar no canto (como o Shinji)", "Usar a Lança de Longinus", "Oferecer chá para o Anjo"], outcomes: [{ type: "good", message: "Você entrou no robô, esmagou o Anjo e salvou a humanidade recebendo bilhões!" }, { type: "bad", message: "Sua covardia causou o Terceiro Impacto. Metade da sua riqueza virou Tang laranja." }, { type: "neutral", message: "A lança de Longinus errou feio e acertou a lua." }, { type: "chaotic", message: "O Anjo adorou o chá e vocês viraram melhores amigos de fofoca." }] },
  { id: "anime_jojo", title: "Stardust Crusaders", icon: "⭐", unlock: 185, friend: "badtz", text: "Badtz-Maru apontou pra você e gritou: 'VOCÊ PENSOU QUE ERA A KITTY, MAS SOU EU, DIO!'", choices: ["Aproximar-se em vez de fugir", "Gritar 'MUDAMUDAMUDA'", "Jogar um rolo compressor", "Ignorar e voltar a dormir"], outcomes: [{ type: "good", message: "Aproximar-se quebrou o poder dele. Você absorveu a energia Stand e lucrou." }, { type: "bad", message: "Ser ignorante rendeu punição divina do tempo paralisado. Penalidade cruel!" }, { type: "neutral", message: "MUDAMUDAMUDA ORAORAORAORA. Foi barulhento mas inútil." }, { type: "chaotic", message: "O rolo compressor caiu na cabeça do Dio e agora ele trabalha de pedreiro." }] },
  { id: "anime_naruto", title: "O 7º Hokage", icon: "🍜", unlock: 190, friend: "pochacco", text: "Pochacco quer se tornar Hokage, mas não sabe fazer nem o Jutsu Clone das Sombras.", choices: ["Ensinar Rasengan pra ele", "Dar lámen sabor porco", "Extrair a Kyuubi", "Usar Genjutsu nele"], outcomes: [{ type: "good", message: "O Rasengan abriu caminho, gerando prosperidade e paz para as vilas ninjas!" }, { type: "bad", message: "O Genjutsu fritou a mente dele. Danos imensos pra recuperar o tratamento." }, { type: "neutral", message: "O lámen estava ótimo. 'Dattebayo!', disse Pochacco, feliz e inútil." }, { type: "chaotic", message: "A Kyuubi era na verdade um Pinscher raivoso!" }] },
  { id: "anime_dbz", title: "O Torneio do Poder", icon: "🐉", unlock: 195, friend: "daniel", text: "Dear Daniel se transformou em Super Saiyajin 3 e desafiou Jiren para salvar o universo.", choices: ["Levantar a mão para a Genki Dama", "Comer Semente dos Deuses", "Gritar por 3 episódios seguidos", "Ligar pro Zen-Oh"], outcomes: [{ type: "good", message: "O instinto superior ativou! Daniel venceu e te encheu de presentes divinos." }, { type: "bad", message: "Vocês gritaram tanto que o tempo acabou. Universo apagado e itens sumiram." }, { type: "neutral", message: "A semente estava vencida, deu azia e dor de barriga." }, { type: "chaotic", message: "Zen-Oh apagou o vilão, apagou você, apagou o código fonte, tela azul!" }] },
  { id: "anime_pokemon", title: "Quem é esse Pokémon?", icon: "⚡", unlock: 200, friend: "melody", text: "Um Pikachu gigante selvagem apareceu. Ele parece zangado e cheio de eletricidade estática.", choices: ["Jogar a Master Ball", "Usar ataque de Água", "Cantar o tema de abertura", "Acariciar no queixo"], outcomes: [{ type: "good", message: "A Master Ball capturou o bicho! Ele te forneceu energia infinita e corações." }, { type: "bad", message: "Usou água contra raio?! Você tomou Choque do Trovão crítico e queimou seus itens." }, { type: "neutral", message: "'Temos que pegar!' - A música empolgou a todos, mas o bicho fugiu." }, { type: "chaotic", message: "Ele ronronou e revelou que era só um ator fantasiado ganhando salário mínimo." }] },
  { id: "anime_sailor", title: "Pelo Poder do Prisma Lunar", icon: "🌙", unlock: 205, friend: "kuromi", text: "Kuromi achou um broche mágico e quer punir os vilões em nome da lua.", choices: ["Fazer a pose de transformação", "Lançar a Tiara Lunar", "Tirar sarro da roupinha dela", "Chamar o Tuxedo Mask"], outcomes: [{ type: "good", message: "A transformação foi um sucesso brilhante. Riquezas místicas para você!" }, { type: "bad", message: "Tirar sarro quebrou o feitiço. A lua puniu você e evaporou suas gemas." }, { type: "neutral", message: "Tuxedo Mask jogou uma rosa, disse que seu trabalho estava feito (sem fazer nada) e saiu." }, { type: "chaotic", message: "A transformação durou 40 minutos e todos dormiram no meio." }] },
  { id: "anime_deathnote", title: "O Caderno da Morte", icon: "📓", unlock: 210, friend: "chococat", text: "Chococat encontrou um caderno preto onde 'quem tem o nome escrito sofre cócegas mortais'.", choices: ["Escrever o nome do rival", "Comer uma batatinha", "Dar pro Shinigami", "Tacar fogo"], outcomes: [{ type: "good", message: "Fogo no caderno! A paz reina e os anjos da luz te deram recompensas imensas." }, { type: "bad", message: "Você esqueceu as regras do caderno e apagou seu próprio inventário por acidente!" }, { type: "neutral", message: "'Eu pego a batatinha e EU COMO!'. Uma cena épica, mas irrelevante." }, { type: "chaotic", message: "O Shinigami Ryuk adorou maçãs, virou vegano e abriu uma quitanda." }] },
  { id: "meme_shrek", title: "O Pântano da Ogra", icon: "🧅", unlock: 215, friend: "pompom", text: "Pompompurin montou uma placa: 'CUIDADO COM O OGRO'. Ele diz que cebolas têm camadas.", choices: ["Gritar 'WHAT ARE YOU DOING IN MY SWAMP'", "Cantar All Star", "Montar no Burro falante", "Oferecer Waffles"], outcomes: [{ type: "good", message: "A trilha de Smash Mouth tocou, a grana entrou pesada. Pântano feliz!" }, { type: "bad", message: "Invadir o pântano sem permissão causou uma surra homérica. Seus bolsos esvaziaram." }, { type: "neutral", message: "No fim das contas, todo mundo só sentou e comeu cebola crua." }, { type: "chaotic", message: "O Burro voou e se casou com um dragão gigante rosa na sua frente." }] },
  { id: "meme_matrix", title: "A Pílula Vermelha", icon: "💊", unlock: 220, friend: "cinnamoroll", text: "Cinnamoroll usa óculos escuros e oferece duas pílulas de bala Juquinha.", choices: ["Pegar a Azul", "Pegar a Vermelha", "Desviar de balas em slow-motion", "Comer as duas de uma vez"], outcomes: [{ type: "good", message: "Você descobriu a Matrix e hackeou a realidade pra ganhar itens absurdos!" }, { type: "bad", message: "A pílula errada te desconectou. Perdeu contato com o servidor e parte do save." }, { type: "neutral", message: "Você dobrou a colher com a mente, mas ninguém se importou." }, { type: "chaotic", message: "Comer as duas misturou tudo. Morpheus virou um Teletubbie dançante." }] },
  { id: "anime_attack", title: "O Rugido da Terra", icon: "🧱", unlock: 225, friend: "pekkle", text: "As muralhas do jardim caíram. O Rumbling de Titãs Colossais de marshmallow está começando.", choices: ["Usar a Coordenada", "Chorar no bar", "Gritar TATAKAE", "Cortar a nuca deles"], outcomes: [{ type: "good", message: "O sacrifício foi louvável. A paz voltou a Eldia e você herdou riquezas eternas!" }, { type: "bad", message: "O Rumbling esmagou seu inventário. Destruição quase total de recursos." }, { type: "neutral", message: "Você olhou pro oceano e apontou o dedo, parecendo muito dramático e depressivo." }, { type: "chaotic", message: "Você percebeu que tudo era só uma maquete do arquiteto da cidade." }] },
  { id: "meme_rickroll", title: "Nunca Vou Desistir de Você", icon: "🎤", unlock: 230, friend: "kitty", text: "Kitty manda um link misterioso dizendo que é um vídeo fofo de gatinhos.", choices: ["Clicar no link", "Fechar o navegador", "Decorar a URL e evitar", "Re-enviar o link de volta"], outcomes: [{ type: "good", message: "A música épica levantou a moral de todos. Dinheiro e corações subiram muito!" }, { type: "bad", message: "Foi um vírus maldoso. O RickRoll drenou 30% da sua felicidade e gemas." }, { type: "neutral", message: "'Never gonna give you up...'. Você cantarolou e seguiu a vida." }, { type: "chaotic", message: "Rick Astley em pessoa saiu da tela e exigiu os direitos autorais." }] },
  { id: "anime_fullmetal", title: "A Quimera Assustadora", icon: "🐶", unlock: 235, friend: "daniel", text: "Shou Tucker fundiu a My Melody com um cachorro e ela sussurra 'Ed... ward...'", choices: ["Desfazer a transmutação com a Pedra Filosofal", "Choradeira profunda", "Bater no cientista louco", "Desenhar alquimia no chão"], outcomes: [{ type: "good", message: "Você consertou a quimera. A alquimia te recompensou com bônus perfeitos!" }, { type: "bad", message: "Tentar curar com o braço machucado fez você perder membros virtuais e itens." }, { type: "neutral", message: "Isso foi pesado demais até para o jogo. Todo mundo ficou em silêncio constrangedor." }, { type: "chaotic", message: "A quimera pegou um shape malhado e virou instrutora de academia." }] },
  { id: "anime_onepunch", title: "O Treinamento Careca", icon: "👊", unlock: 240, friend: "pochacco", text: "Pochacco treinou tanto que perdeu todo o pelo da cabeça. Ele derruba meteoros com um soco.", choices: ["Fazer 100 flexões, 100 abdominais e correr 10km", "Desafiar para uma luta", "Comprar no supermercado em promoção", "Zombar da careca"], outcomes: [{ type: "good", message: "Promoção no supermercado de sábado! Economizou gemas e ganhou lucros!" }, { type: "bad", message: "Você apanhou de um soco só. Foi obliterado, esvaziou a carteira de vergonha." }, { type: "neutral", message: "Apenas um homem caminhando com um saco plástico balançando ao vento." }, { type: "chaotic", message: "Um mosquito irritante desviou do soco dele e dominou o mundo." }] },
  { id: "meme_gandalf", title: "Você Não Passará", icon: "🧙", unlock: 245, friend: "chococat", text: "Chococat botou barba branca e um cajado no meio de uma ponte de pinguela, bloqueando um Balrog.", choices: ["Bater o cajado e gritar 'YOU SHALL NOT PASS'", "Chamar as águias logo", "Dar um abraço no Balrog", "Pedir ajuda pro Gollum"], outcomes: [{ type: "good", message: "O demônio caiu! Glória à Terra Média e saque aos baús de tesouro!" }, { type: "bad", message: "As águias demoraram. O Balrog roubou seus itens mais preciosos como punição." }, { type: "neutral", message: "O Gollum pulou na lava atrás do anel de cebola, ignorando você." }, { type: "chaotic", message: "O Balrog pediu desculpas pela intrusão e foi lavar a louça de todo mundo." }] },
  { id: "anime_hunter", title: "Exame Hunter Cruel", icon: "🎣", unlock: 250, friend: "keroppi", text: "O sapinho está carregando uma vara de pescar gigante e precisa roubar o crachá do Hisoka.", choices: ["Usar a furtividade suprema", "Oferecer chiclete de bungee", "Lutar com Nen", "Fugir e voltar pra ilha da baleia"], outcomes: [{ type: "good", message: "O roubo furtivo do crachá te garantiu a licença e recompensas bilionárias!" }, { type: "bad", message: "Hisoka te achou fascinante. Assustador! Custos em corações foram gigantescos." }, { type: "neutral", message: "A propriedade do Bungee Gum possui as características de borracha e chiclete." }, { type: "chaotic", message: "Keroppi fisgou um peixe dourado lendário que concedeu três desejos inúteis." }] },
  { id: "meme_obiwan", title: "Hello There!", icon: "⚔️", unlock: 255, friend: "badtz", text: "Badtz-Maru pulou de um local alto com um sabre de luz brilhante e disse 'Hello there!'", choices: ["Responder 'General Kenobi!'", "Sacar quatro sabres de luz rodando", "Chamar Darth Vader", "Atirar com um Blaster"], outcomes: [{ type: "good", message: "O High Ground é imbatível. A força está com você gerando lucro astronômico!" }, { type: "bad", message: "Subestimar o poder dele levou seus corações pro lado negro da Força." }, { type: "neutral", message: "*Tosse robótica incessante*. 'Seu sabre dará uma bela adição à minha coleção'." }, { type: "chaotic", message: "A Força despertou num coelhinho e ele dominou o senado galáctico." }] },
  { id: "anime_ghoul", title: "O Caolho Trágico", icon: "☕", unlock: 260, friend: "kuromi", text: "Kuromi estalou o dedo indicador chorando enquanto tenta beber um café sem gosto de cinzas.", choices: ["Cantar 'Oshiete, oshiete yo'", "Dar carne humana (de mentirinha)", "Pintar o cabelo dela de branco", "Virar dono de cafeteria"], outcomes: [{ type: "good", message: "A cafeteria ficou famosa entre as espécies e seu lucro bateu a lua!" }, { type: "bad", message: "O estalo do dedo sinalizou tortura. Você sofreu grave decréscimo econômico." }, { type: "neutral", message: "A música da abertura é tão triste que todos choraram 15 minutos abraçados." }, { type: "chaotic", message: "O café, na verdade, era descafeinado. Nenhuma tragédia ocorreu." }] },
  { id: "meme_doge", title: "Muito Stonks", icon: "🐕", unlock: 265, friend: "pompom", text: "Um cachorro da raça Shiba Inu apareceu analisando gráficos financeiros. Much wow.", choices: ["Comprar Dogecoin", "Fazer cara de 'Stonks'", "Vender tudo e chorar", "Chamar o Elon Musk"], outcomes: [{ type: "good", message: "A ação valorizou 5000% no dia e você ficou virtualmente bilionário no jogo!" }, { type: "bad", message: "NOT STONKS. O mercado crashou e as suas gemas viraram poeira inflacionária." }, { type: "neutral", message: "Much coin. Very rich. Wow." }, { type: "chaotic", message: "O cachorro decolou num foguete desenhado a lápis para Marte." }] },
  { id: "anime_goku", title: "Empresta Tua Força", icon: "🤲", unlock: 270, friend: "melody", text: "My Melody pede para todas as plantas do jardim erguerem as mãos.", choices: ["Levantar as duas mãos", "Levantar só uma mão", "Sentar de braços cruzados como Vegeta", "Jogar energia ruim"], outcomes: [{ type: "good", message: "A energia ajudou a derrotar Majin Boo e a Terra prosperou absurdamente." }, { type: "bad", message: "Sua birra enfraqueceu o planeta e vocês sofreram com penalidades destrutivas." }, { type: "neutral", message: "Hmph. Inseto. (Você resmungou e continuou de braços cruzados)." }, { type: "chaotic", message: "A Genki Dama foi usada só para acender a fogueira do acampamento." }] },
  { id: "meme_sponge", title: "O Siri Cascudo", icon: "🍔", unlock: 275, friend: "keroppi", text: "Keroppi diz que guardou a fórmula secreta de um hambúrguer debaixo do colchão.", choices: ["Proteger a fórmula", "Roubar a fórmula e dar pro Plankton", "Fritar os hambúrgueres felizes", "Gritar 'MEU PERNAAA'"], outcomes: [{ type: "good", message: "O restaurante lucrou horrores e você levou uma generosa comissão!" }, { type: "bad", message: "Plankton te traiu e processou o jogo. Parte das suas finanças sumiu." }, { type: "neutral", message: "Bob Esponja apertou os sapatos com aquele barulho agoniante de borracha molhada." }, { type: "chaotic", message: "Lula Molusco tocou clarinete tão mal que as nuvens do céu derreteram." }] },
  { id: "anime_titan", title: "Sasha da Batata", icon: "🥔", unlock: 280, friend: "cinnamoroll", text: "No meio do treinamento brutal de guerra militar, Cinnamoroll tira uma batata assada e come.", choices: ["Dividir a batata no meio para o instrutor", "Gritar com ele", "Ignorar a quebra militar", "Fazer um purê tático"], outcomes: [{ type: "good", message: "A batata era mágica. O comandante chorou de alegria e te nomeou herói." }, { type: "bad", message: "Você roubou a batata da menina e o karma retirou suas pedras preciosas!" }, { type: "neutral", message: "'Eu dividi, te dei uma metade inteira'. A matemática falhou brutalmente." }, { type: "chaotic", message: "O purê tático foi usado como argamassa para tapar o buraco da muralha." }] },
  { id: "anime_sword", title: "O Espadachim Negro", icon: "⚔️", unlock: 285, friend: "daniel", text: "Presos num jogo de realidade virtual, Daniel gritou 'LINK START!' e virou Kirito.", choices: ["Empunhar duas espadas (Dual Wield)", "Namorar no jogo enquanto as pessoas morrem", "Bater no desenvolvedor Kayaba", "Deslogar de força"], outcomes: [{ type: "good", message: "O Starburst Stream destruiu o chefe do andar 74! Drop épico garantido!" }, { type: "bad", message: "Você morreu no jogo e perdeu status absurdos do inventário." }, { type: "neutral", message: "A interface sumiu. Você só ficou parado olhando pra parede invisível." }, { type: "chaotic", message: "O Kayaba tropeçou no fio do servidor, desligou o jogo e todos voltaram pra casa cedo." }] },
  { id: "meme_sadkeanu", title: "Keanu Triste no Banco", icon: "🥪", unlock: 290, friend: "pochacco", text: "Pochacco sentou num banco da praça, olhando pro chão com um sanduíche meio mastigado, super contemplativo.", choices: ["Sentar ao lado e fazer carinho", "Rir da desgraça", "Postar foto no Reddit", "Oferecer lápis pra matar três caras"], outcomes: [{ type: "good", message: "A empatia pura acalmou o coração de Pochacco, que agradeceu de forma abundante." }, { type: "bad", message: "Você mexeu com o cachorro do John Wick. Sua barra de corações foi dizimada." }, { type: "neutral", message: "Você postou no Reddit e ganhou pontos virtuais inúteis de karma." }, { type: "chaotic", message: "Ele pegou o lápis, desenhou um coelho e brincou o dia todo." }] },
  { id: "anime_alchemist", title: "A Verdade Alquímica", icon: "👁️", unlock: 295, friend: "kitty", text: "Aquele portão branco gigante com um olho apareceu. A 'Verdade' quer o seu braço em troca de conhecimento.", choices: ["Bater palmas pra fazer transmutação", "Dar a perna invés do braço", "Chamar a Winry pra fazer um automail", "Mandar a Verdade pastar"], outcomes: [{ type: "good", message: "Você quebrou o sistema sem pagar pedágio e reteve glória imensurável." }, { type: "bad", message: "Pagou caro! Seu braço levou metade do inventário junto. Sacrifício doloroso." }, { type: "neutral", message: "Winry jogou uma chave de fenda gigante na sua cabeça por você ser idiota." }, { type: "chaotic", message: "A Verdade fechou a porta na sua cara porque você estava devendo Serasa." }] },
  { id: "anime_fate", title: "Guerra do Santo Graal", icon: "🏆", unlock: 300, friend: "badtz", text: "Badtz-Maru invocou o Rei Arthur na versão feminina gritando 'Você é meu mestre?'.", choices: ["Usar um Selo de Comando", "Dar comida para a Saber", "Citar que a classe Archer é feita de arqueiros", "Desistir da guerra mágica"], outcomes: [{ type: "good", message: "A Saber varreu o campo de batalha e conquistou o cálice divino para você!" }, { type: "bad", message: "O cálice estava corrompido, roubando fortunas e drenando suas gemas." }, { type: "neutral", message: "Pessoas morrem quando são mortas, assim como a água é molhada." }, { type: "chaotic", message: "A Saber devorou 40 pratos de comida e arruinou a economia do Japão." }] },
  { id: "anime_mob", title: "100% de Tensão", icon: "💯", unlock: 305, friend: "chococat", text: "O contador de emoção do Chococat está em 99%. A cidade vai flutuar com o poder psíquico.", choices: ["Explosão de Tristeza", "Acalmar ele com um Clube do Fomento Corporal", "Chamar o Mestre Reigen", "Jogar sal fantasma"], outcomes: [{ type: "good", message: "Reigen usou uma massagem de 300 ienes e resolveu tudo. Vitória psíquica!" }, { type: "bad", message: "Atingiu 100% DE IRA! A destruição telecinética arrasou seus pertences em massa." }, { type: "neutral", message: "O sal de cozinha não espantou maldições, apenas temperou o chão." }, { type: "chaotic", message: "O clube de marombeiros começou a fazer agachamento no meio do caos." }] },
  { id: "meme_cat", title: "Gato na Mesa com Mulher Gritando", icon: "😾", unlock: 310, friend: "kitty", text: "Uma garota de um reality show tá gritando aos prantos apontando pro gato Smudge sentado na mesa de jantar.", choices: ["Defender o gato", "Chorar junto com a moça", "Servir mais salada pro gato", "Gritar de volta confuso"], outcomes: [{ type: "good", message: "O gato se sentiu acolhido e ronronou corações de gratidão para sua carteira!" }, { type: "bad", message: "Você ofendeu o gato meme. O cancelamento na internet reduziu 30% da sua popularidade (corações)." }, { type: "neutral", message: "Você gritou. Ela gritou. O gato ignorou. Fim da cena." }, { type: "chaotic", message: "O gato puxou um discurso do Karl Marx e assumiu os meios de produção." }] },
  { id: "anime_hero", title: "Meu Academia Heroica", icon: "🦸", unlock: 315, friend: "pekkle", text: "Pekkle comeu um fio de cabelo misterioso dizendo 'COMA ISSO' para herdar a individualidade número 1.", choices: ["Fazer a pose do All Might", "Gritar PLUS ULTRA!", "Quebrar os braços na emoção", "Lavar o cabelo antes"], outcomes: [{ type: "good", message: "O poder despertou perfeitamente e o Smash varreu os vilões com lucro total!" }, { type: "bad", message: "Seus ossos quebraram 14 vezes. Os custos com hospitais faliram seu inventário." }, { type: "neutral", message: "'Eu estou aqui!'. Mas ninguém precisava de ajuda." }, { type: "chaotic", message: "O poder virou fazer bolo de cenoura super rápido. A paz foi mantida." }] },
  { id: "anime_slime", title: "Reencarnei como um Slime", icon: "💧", unlock: 320, friend: "kuromi", text: "Kuromi foi atropelada por um caminhão (isekai) e reencarnou como uma gosma azul super poderosa.", choices: ["Construir uma vila monstro", "Devorar um dragão", "Ficar quicando no chão", "Ser o rei demônio"], outcomes: [{ type: "good", message: "A vila gerou uma economia próspera, enchendo você de riquezas diárias." }, { type: "bad", message: "Ser prepotente enfureceu os cavaleiros sagrados que saquearam sua vila impiedosamente." }, { type: "neutral", message: "Quic, quic, quic... era macio, mas irrelevante." }, { type: "chaotic", message: "A gosma descobriu os impostos da nova vida e pediu para morrer de novo." }] },

  // A MISSÃO ÉPICA DA FÃ OBSESSIVA (Penalidade/Recompensa Extrema)
  { id: "obsessivefan", title: "A Colecionadora Maníaca", icon: "👁️‍🗨️", unlock: 500, friend: "kitty", text: "Uma fã milionária aparece com os olhos arregalados. Ela diz: 'EU SOU A MAIOR COLECIONADORA E TENHO TODAS AS HELLO KITTYS DO MUNDO! Aparece na sua frente, o que você vai fazer?'", choices: ["Recusar entregar seus itens bravamente", "Oferecer metade da sua alma a ela", "Tirar uma selfie e mandar pro Twitter dela", "Tentar roubar a coleção gigantesca dela"], outcomes: [{ type: "boss_fight", message: "Prepare-se para a Batalha Final!" }, { type: "bad", message: "ERRADO! ELA SURTOU! 'Sua coleção é inútil', ela esbraveja. Seu inventário foi dizimado, perdas astronômicas e catastróficas!" }, { type: "neutral", message: "Ela achou você 'cringe', bloqueou você nas redes e ignorou sua existência para sempre." }, { type: "chaotic", message: "Vocês trocaram socos por 20 minutos, empataram, e agora abrem cartas de TCG juntos." }] }
];