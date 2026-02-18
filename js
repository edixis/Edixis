/* ════════════════════════════════════════════════
   EDUXIS · app.js  v2
   - Renommé Eduxis
   - Profile menu (thème, notifications, stats, paramètres, déconnexion)
   - Thème sombre / clair persistant
   - Modal paramètres profil
   - Allemand, Italien, Chinois ajoutés
════════════════════════════════════════════════ */

// ─────────────────────────────────────────────
// SUBJECTS (13 + 3 nouvelles langues = 16)
// ─────────────────────────────────────────────
const POLES = {
  sci:  { label: 'Scientifique',    ids: ['math','pc','svt','tech'] },
  lit:  { label: 'Littéraire',      ids: ['fr','hist','emc'] },
  lang: { label: 'Langues & Arts',  ids: ['en','es','de','it','zh','arts'] },
};

const SUBJECTS = {
  // ── SCIENTIFIQUE ──────────────────────────────
  math: {
    id:'math', name:'Mathématiques', icon:'🔢', pole:'sci',
    chapters: [
      { id:'fractions', name:'Fractions', difficulty:'medium', xp:25,
        lesson: { tag:'Arithmétique', title:'Les fractions',
          body:`<h3>Simplifier une fraction</h3><p>On divise par le PGCD du numérateur et du dénominateur.</p><div class="formula">6/8 → PGCD=2 → 3/4</div><h3>Additionner</h3><div class="formula">1/2 + 1/3 = 3/6 + 2/6 = 5/6</div><div class="tip">Pour simplifier, cherche le plus grand nombre qui divise les deux termes.</div>` },
        exercises: [
          { type:'mcq', q:'Forme simplifiée de 6/8 ?', opts:['2/3','3/4','4/6','1/2'], ans:1, correction:'PGCD(6,8)=2 → 3/4.' },
          { type:'mcq', q:'Combien font 1/2 + 1/3 ?', opts:['2/5','5/6','3/5','2/6'], ans:1, correction:'3/6+2/6=5/6.' },
          { type:'calc', q:'3/4 × 8 =', ans:6, unit:'', correction:'24/4=6.' },
          { type:'mcq', q:'Fraction équivalente à 2/5 ?', opts:['4/15','6/15','4/10','3/10'], ans:2, correction:'2/5=4/10 (×2).' },
          { type:'mcq', q:'Simplifie 15/25.', opts:['3/4','3/5','5/7','2/3'], ans:1, correction:'PGCD=5 → 3/5.' },
        ]
      },
      { id:'geometrie', name:'Géométrie — Aires et périmètres', difficulty:'medium', xp:25,
        lesson: { tag:'Géométrie', title:'Aires et périmètres',
          body:`<h3>Périmètre rectangle</h3><div class="formula">P = 2 × (L + l)</div><h3>Aire rectangle</h3><div class="formula">A = L × l</div><h3>Aire triangle</h3><div class="formula">A = (base × hauteur) ÷ 2</div><div class="tip">Périmètre → cm, Aire → cm²</div>` },
        exercises: [
          { type:'calc', q:'Périmètre rectangle L=12, l=7 cm ?', ans:38, unit:'cm', correction:'2×(12+7)=38 cm.' },
          { type:'calc', q:'Aire rectangle L=5, l=3 cm ?', ans:15, unit:'cm²', correction:'5×3=15 cm².' },
          { type:'calc', q:'Périmètre carré de côté 6 cm ?', ans:24, unit:'cm', correction:'4×6=24 cm.' },
          { type:'calc', q:'Aire triangle base=8, hauteur=5 cm ?', ans:20, unit:'cm²', correction:'(8×5)÷2=20 cm².' },
          { type:'mcq', q:'Rectangle P=30, l=5 cm. Longueur ?', opts:['10 cm','12 cm','15 cm','20 cm'], ans:0, correction:'2×(L+5)=30 → L=10 cm.' },
        ]
      },
    ]
  },
  pc: {
    id:'pc', name:'Physique-Chimie', icon:'⚗️', pole:'sci',
    chapters: [
      { id:'etats', name:'Les états de la matière', difficulty:'easy', xp:10,
        lesson: { tag:'Physique', title:'Les 3 états de la matière',
          body:`<p>Solide, Liquide, Gazeux.</p><div class="formula">Fusion: solide→liquide | Vaporisation: liquide→gaz</div><div class="tip">L'eau bout à 100°C et gèle à 0°C.</div>` },
        exercises: [
          { type:'mcq', q:'État de l\'eau à 20°C ?', opts:['Solide','Liquide','Gazeux','Plasma'], ans:1, correction:'Liquide entre 0°C et 100°C.' },
          { type:'mcq', q:'Passage solide → liquide ?', opts:['Vaporisation','Condensation','Fusion','Solidification'], ans:2, correction:'Fusion.' },
          { type:'mcq', q:'Température d\'ébullition de l\'eau ?', opts:['0°C','50°C','100°C','200°C'], ans:2, correction:'100°C à pression normale.' },
          { type:'fill', q:'Complète :',
            sentence:['La glace est à l\'état','___','. En chauffant, elle','___','et devient liquide.'],
            words:['solide','liquide','gazeux','fond','gèle','bout'], answers:['solide','fond'],
            correction:'La glace est solide et fond en chauffant.' },
          { type:'mcq', q:'Quel changement produit de la vapeur ?', opts:['Fusion','Solidification','Condensation','Vaporisation'], ans:3, correction:'Vaporisation.' },
        ]
      },
    ]
  },
  svt: {
    id:'svt', name:'SVT', icon:'🌿', pole:'sci',
    chapters: [
      { id:'photo', name:'La photosynthèse', difficulty:'medium', xp:25,
        lesson: { tag:'Biologie', title:'La photosynthèse',
          body:`<p>Les plantes fabriquent leur nourriture grâce à la lumière.</p><div class="formula">CO₂ + H₂O + lumière → Glucose + O₂</div><div class="tip">La photosynthèse produit l'O₂ que nous respirons !</div>` },
        exercises: [
          { type:'fill', q:'Complète :',
            sentence:['Les plantes utilisent la','___','du soleil, le','___','et l\'eau pour produire du glucose.'],
            words:['lumière','oxygène','CO2','azote','chaleur'], answers:['lumière','CO2'],
            correction:'Lumière + CO₂ → Glucose + O₂.' },
          { type:'mcq', q:'Où se déroule la photosynthèse ?', opts:['Noyau','Mitochondrie','Chloroplaste','Vacuole'], ans:2, correction:'Dans les chloroplastes.' },
          { type:'mcq', q:'Gaz produit par la photosynthèse ?', opts:['CO₂','N₂','O₂','H₂'], ans:2, correction:'O₂.' },
          { type:'mcq', q:'Pigment capte la lumière ?', opts:['Mélanine','Chlorophylle','Hémoglobine','Carotène'], ans:1, correction:'Chlorophylle.' },
          { type:'mcq', q:'La nuit, photosynthèse possible ?', opts:['Oui','Non, faut lumière','Seulement en été','Seulement sous l\'eau'], ans:1, correction:'Non, la lumière est indispensable.' },
        ]
      },
    ]
  },
  tech: {
    id:'tech', name:'Technologie', icon:'⚙️', pole:'sci',
    chapters: [
      { id:'objets', name:'Les objets techniques', difficulty:'easy', xp:10,
        lesson: { tag:'Technologie', title:'Objet technique et besoin',
          body:`<p>Un objet technique est fabriqué par l'Homme pour répondre à un besoin.</p><div class="formula">Besoin → Fonction d'usage → Objet technique</div><div class="tip">Un stylo répond au besoin d'écrire.</div>` },
        exercises: [
          { type:'mcq', q:'Qu\'est-ce qu\'un objet technique ?', opts:['Un objet naturel','Fabriqué par l\'Homme','Très petit','Très cher'], ans:1, correction:'Fabriqué par l\'Homme pour répondre à un besoin.' },
          { type:'mcq', q:'Fonction d\'un réfrigérateur ?', opts:['Chauffer','Conserver au froid','Laver','Cuire'], ans:1, correction:'Conserver les aliments au froid.' },
          { type:'mcq', q:'Matériau léger pour l\'aéronautique ?', opts:['Acier','Bois','Aluminium','Verre'], ans:2, correction:'L\'aluminium est léger et résistant.' },
          { type:'mcq', q:'Un prototype sert à ?', opts:['Vendre','Tester un concept','Recycler','Décorer'], ans:1, correction:'Tester avant la production en série.' },
          { type:'mcq', q:'Éco-conception = ?', opts:['Pour la vitesse','Minimiser impact env.','Objet naturel','Pour le luxe'], ans:1, correction:'Intègre les préoccupations environnementales dès la conception.' },
        ]
      },
    ]
  },

  // ── LITTÉRAIRE ────────────────────────────────
  fr: {
    id:'fr', name:'Français', icon:'✍️', pole:'lit',
    chapters: [
      { id:'conjugaison', name:'Conjugaison — Présent', difficulty:'easy', xp:10,
        lesson: { tag:'Grammaire', title:'Le présent de l\'indicatif',
          body:`<h3>1er groupe (-ER)</h3><div class="formula">je -e · tu -es · il -e · nous -ons · vous -ez · ils -ent</div><div class="tip">Attention : nous mangeons (E intercalaire pour garder le son [ʒ]).</div>` },
        exercises: [
          { type:'fill', q:'Complète :',
            sentence:['Les enfants','___','dans la cour et','___','très fort.'],
            words:['jouent','mangent','crient','dormit','sautent'], answers:['jouent','crient'],
            correction:'Jouent (jouer, 3e pl.) · Crient (crier, 3e pl.).' },
          { type:'mcq', q:'MANGER, 1ère pers. pluriel ?', opts:['Nous mangons','Nous mangeons','Nous mangeont','Nous mangont'], ans:1, correction:'Nous mangeons (E intercalaire).' },
          { type:'match', q:'Relie pronom → terminaison de PARLER :',
            left:['Je','Nous','Vous','Ils'], right:['-ez','-e','-ons','-ent'], answers:[1,2,0,3],
            correction:'Je parle, nous parlons, vous parlez, ils parlent.' },
          { type:'mcq', q:'FINIR est du ?', opts:['1er groupe','2e groupe','3e groupe','4e groupe'], ans:1, correction:'2e groupe (nous finissons).' },
          { type:'mcq', q:'Ils _____ très tôt. (SE LEVER)', opts:['se lèves','se lève','se lèvent','se levons'], ans:2, correction:'Ils se lèvent (-ent, 3e pl.).' },
        ]
      },
      { id:'nature', name:'Nature des mots', difficulty:'medium', xp:25,
        lesson: { tag:'Grammaire', title:'La nature des mots',
          body:`<p><strong>Nom</strong> : maison, chien<br><strong>Verbe</strong> : courir, être<br><strong>Adjectif</strong> : beau, grand<br><strong>Adverbe</strong> : rapidement, très</p><div class="tip">Adverbe = adjectif + -ment (rapide → rapidement).</div>` },
        exercises: [
          { type:'match', q:'Relie mot → nature :',
            left:['rapidement','courir','beau','maison'],
            right:['Nom commun','Adjectif','Verbe','Adverbe'], answers:[3,2,1,0],
            correction:'rapidement=adverbe, courir=verbe, beau=adjectif, maison=nom.' },
          { type:'mcq', q:'"rouge" dans "la voiture rouge roule vite" ?', opts:['Nom','Adverbe','Adjectif','Verbe'], ans:2, correction:'Adjectif qualificatif.' },
          { type:'mcq', q:'Quel mot est un adverbe ?', opts:['Lentement','Lent','Lenteur','Alentir'], ans:0, correction:'Lentement = adverbe.' },
          { type:'fill', q:'Complète :',
            sentence:['Le mot "chien" est un','___','. Le mot "aboyer" est un','___','.'],
            words:['nom','verbe','adjectif','adverbe'], answers:['nom','verbe'],
            correction:'"Chien" = nom, "aboyer" = verbe.' },
          { type:'mcq', q:'"magnifiquement" dans "elle chante magnifiquement" ?', opts:['Nom','Adjectif','Adverbe','Verbe'], ans:2, correction:'Adverbe (modifie le verbe).' },
        ]
      },
    ]
  },
  hist: {
    id:'hist', name:'Histoire-Géographie', icon:'🌍', pole:'lit',
    chapters: [
      { id:'revolution', name:'La Révolution Française', difficulty:'medium', xp:25,
        lesson: { tag:'Histoire', title:'La Révolution Française (1789)',
          body:`<h3>Dates clés</h3><p>• <strong>5 mai 1789</strong> : États Généraux<br>• <strong>14 juillet 1789</strong> : Prise de la Bastille<br>• <strong>26 août 1789</strong> : DDHC</p><div class="tip">La Bastille = symbole du pouvoir absolu.</div>` },
        exercises: [
          { type:'mcq', q:'Année de la Révolution Française ?', opts:['1776','1789','1799','1804'], ans:1, correction:'1789.' },
          { type:'mcq', q:'La Bastille symbolisait ?', opts:['Richesse','Pouvoir absolu','Liberté','Noblesse'], ans:1, correction:'Prison royale = symbole de l\'arbitraire.' },
          { type:'mcq', q:'DDHC rédigée en ?', opts:['1787','1788','1789','1793'], ans:2, correction:'26 août 1789.' },
          { type:'match', q:'Date → Événement :',
            left:['14 juillet 1789','26 août 1789','5 mai 1789','21 janvier 1793'],
            right:['Exécution Louis XVI','États Généraux','Prise Bastille','DDHC'],
            answers:[2,3,1,0], correction:'14/07: Bastille, 26/08: DDHC, 05/05: États Généraux, 21/01/1793: Louis XVI.' },
          { type:'mcq', q:'Roi de France en 1789 ?', opts:['Louis XIV','Louis XV','Louis XVI','Napoléon'], ans:2, correction:'Louis XVI, guillotiné en 1793.' },
        ]
      },
    ]
  },
  emc: {
    id:'emc', name:'EMC (Civique)', icon:'⚖️', pole:'lit',
    chapters: [
      { id:'democratie', name:'La démocratie', difficulty:'easy', xp:10,
        lesson: { tag:'Civique', title:'Les principes de la démocratie',
          body:`<p>Pouvoir du peuple.</p><div class="formula">Liberté · Égalité · Fraternité</div><div class="tip">Suffrage universel dès 18 ans en France.</div>` },
        exercises: [
          { type:'mcq', q:'"Démocratie" étymologie ?', opts:['Pouvoir nobles','Pouvoir peuple','Pouvoir roi','Pouvoir militaires'], ans:1, correction:'Demos (peuple) + kratos (pouvoir).' },
          { type:'mcq', q:'Âge minimum pour voter en France ?', opts:['16 ans','18 ans','21 ans','25 ans'], ans:1, correction:'18 ans depuis 1974.' },
          { type:'mcq', q:'Devise de la République ?', opts:['Honneur Patrie','Liberté Égalité Fraternité','Travail Famille Patrie','Force Honneur'], ans:1, correction:'Liberté, Égalité, Fraternité.' },
          { type:'mcq', q:'Les lois sont votées par ?', opts:['Le roi','L\'armée','Les représentants élus','Les juges'], ans:2, correction:'Le Parlement (Assemblée + Sénat).' },
          { type:'mcq', q:'Suffrage universel signifie ?', opts:['Seuls riches votent','Seuls hommes','Tous citoyens majeurs','Scientifiques votent 2x'], ans:2, correction:'Tous les citoyens majeurs.' },
        ]
      },
    ]
  },

  // ── LANGUES & ARTS ────────────────────────────
  en: {
    id:'en', name:'Anglais (LV1)', icon:'🇬🇧', pole:'lang',
    chapters: [
      { id:'present', name:'Simple Present vs Present Continuous', difficulty:'medium', xp:25,
        lesson: { tag:'Grammar', title:'Simple Present vs Present Continuous',
          body:`<h3>Simple Present</h3><p>Habitudes → <em>She plays every day.</em></p><div class="formula">Subject + V(s)</div><h3>Present Continuous</h3><p>Action en cours → <em>She is playing now.</em></p><div class="formula">Subject + am/is/are + V-ing</div><div class="tip">Mots-clés: now, right now, at the moment, currently.</div>` },
        exercises: [
          { type:'mcq', q:'She ___ tennis every Saturday. (PLAY)', opts:['is playing','plays','play','are playing'], ans:1, correction:'Every Saturday = habitude → plays.' },
          { type:'mcq', q:'They ___ TV right now. (WATCH)', opts:['watch','watches','are watching','is watching'], ans:2, correction:'Right now = en cours → are watching.' },
          { type:'mcq', q:'I ___ to school every day. (GO)', opts:['am going','goes','go','is going'], ans:2, correction:'Every day = habitude → go.' },
          { type:'mcq', q:'Look! It ___ outside. (RAIN)', opts:['rains','rain','is raining','are raining'], ans:2, correction:'Look! = en cours → is raining.' },
          { type:'fill', q:'Complete:',
            sentence:['She','___','(read) now, but usually she','___','(watch) TV.'],
            words:['is reading','reads','are reading','read'], answers:['is reading','reads'],
            correction:'En cours = is reading. Habitude = reads.' },
        ]
      },
    ]
  },
  es: {
    id:'es', name:'Espagnol (LV2)', icon:'🇪🇸', pole:'lang',
    chapters: [
      { id:'presente', name:'Présent de l\'indicatif en espagnol', difficulty:'easy', xp:10,
        lesson: { tag:'Gramática', title:'El presente de indicativo',
          body:`<h3>Verbes -AR (hablar)</h3><div class="formula">hablo · hablas · habla · hablamos · habláis · hablan</div><h3>Verbes -ER (comer)</h3><div class="formula">como · comes · come · comemos · coméis · comen</div><div class="tip">TENER irrégulier : tengo, tienes, tiene…</div>` },
        exercises: [
          { type:'mcq', q:'HABLAR avec "yo" ?', opts:['hablas','hablo','habla','hablamos'], ans:1, correction:'Yo hablo (-o pour -AR).' },
          { type:'mcq', q:'"Nous mangeons" en espagnol ?', opts:['comemos','coméis','comen','comimos'], ans:0, correction:'Nosotros comemos.' },
          { type:'fill', q:'Complète avec HABLAR :',
            sentence:['Tú','___','español et ellos aussi','___','español.'],
            words:['hablas','hablan','hablo','habláis'], answers:['hablas','hablan'],
            correction:'Tú hablas · Ellos hablan.' },
          { type:'mcq', q:'TENER, yo ?', opts:['tiene','tienes','tengo','tenemos'], ans:2, correction:'Yo tengo (irrégulier).' },
          { type:'mcq', q:'"Vous parlez" (vosotros) ?', opts:['habláis','hablan','hablamos','hablas'], ans:0, correction:'Vosotros habláis.' },
        ]
      },
    ]
  },

  // ── ALLEMAND (nouveau) ────────────────────────
  de: {
    id:'de', name:'Allemand (LV2)', icon:'🇩🇪', pole:'lang',
    chapters: [
      { id:'sein', name:'Le présent — verbes SEIN et HABEN', difficulty:'easy', xp:10,
        lesson: { tag:'Grammatik', title:'SEIN (être) & HABEN (avoir) au présent',
          body:`<h3>SEIN — être</h3><div class="formula">ich bin · du bist · er/sie ist · wir sind · ihr seid · sie sind</div><h3>HABEN — avoir</h3><div class="formula">ich habe · du hast · er/sie hat · wir haben · ihr habt · sie haben</div><div class="tip">Ces deux verbes sont irréguliers et indispensables — à mémoriser !</div>` },
        exercises: [
          { type:'mcq', q:'SEIN avec "ich" ?', opts:['bin','bist','ist','sind'], ans:0, correction:'Ich bin (je suis).' },
          { type:'mcq', q:'HABEN avec "du" ?', opts:['habe','hast','hat','habt'], ans:1, correction:'Du hast (tu as).' },
          { type:'mcq', q:'"Nous sommes" en allemand ?', opts:['wir sein','wir seid','wir sind','wir bist'], ans:2, correction:'Wir sind.' },
          { type:'fill', q:'Complète avec HABEN :',
            sentence:['Er','___','ein Buch und wir','___','zwei Bücher.'],
            words:['hat','haben','hast','habt'], answers:['hat','haben'],
            correction:'Er hat (il a) · Wir haben (nous avons).' },
          { type:'mcq', q:'"Sie sind" se traduit par ?', opts:['Il est','Tu es','Vous êtes / Ils sont','Je suis'], ans:2, correction:'Sie = ils/elles ou vous (politesse) → sie sind = ils sont / vous êtes.' },
        ]
      },
      { id:'zahlen', name:'Les chiffres et nombres', difficulty:'easy', xp:10,
        lesson: { tag:'Wortschatz', title:'Die Zahlen — Les nombres',
          body:`<div class="formula">1 ein · 2 zwei · 3 drei · 4 vier · 5 fünf<br>6 sechs · 7 sieben · 8 acht · 9 neun · 10 zehn</div><h3>Dizaines</h3><div class="formula">20 zwanzig · 30 dreißig · 100 hundert</div><div class="tip">En allemand, on dit 21 "einundzwanzig" (un-et-vingt).</div>` },
        exercises: [
          { type:'mcq', q:'Comment dit-on "5" en allemand ?', opts:['vier','fünf','sechs','sieben'], ans:1, correction:'Fünf = 5.' },
          { type:'mcq', q:'"Zehn" correspond à ?', opts:['6','8','10','12'], ans:2, correction:'Zehn = 10.' },
          { type:'match', q:'Relie chiffre → mot allemand :',
            left:['3','7','9','2'],
            right:['zwei','neun','drei','sieben'], answers:[2,3,1,0],
            correction:'3=drei, 7=sieben, 9=neun, 2=zwei.' },
          { type:'mcq', q:'"Zwanzig" correspond à ?', opts:['12','20','22','200'], ans:1, correction:'Zwanzig = 20.' },
          { type:'calc', q:'Drei + Sieben = ? (en chiffre)', ans:10, unit:'', correction:'3+7=10 (zehn).' },
        ]
      },
    ]
  },

  // ── ITALIEN (nouveau) ─────────────────────────
  it: {
    id:'it', name:'Italien (LV2)', icon:'🇮🇹', pole:'lang',
    chapters: [
      { id:'essere', name:'ESSERE et AVERE au présent', difficulty:'easy', xp:10,
        lesson: { tag:'Grammatica', title:'ESSERE (être) & AVERE (avoir)',
          body:`<h3>ESSERE</h3><div class="formula">io sono · tu sei · lui/lei è · noi siamo · voi siete · loro sono</div><h3>AVERE</h3><div class="formula">io ho · tu hai · lui/lei ha · noi abbiamo · voi avete · loro hanno</div><div class="tip">Attention : "io ho" s'écrit avec un H muet !</div>` },
        exercises: [
          { type:'mcq', q:'ESSERE avec "io" ?', opts:['sei','sono','è','siamo'], ans:1, correction:'Io sono (je suis).' },
          { type:'mcq', q:'AVERE avec "tu" ?', opts:['ho','hai','ha','hanno'], ans:1, correction:'Tu hai (tu as).' },
          { type:'mcq', q:'"Nous sommes" en italien ?', opts:['noi sono','noi siete','noi siamo','noi sei'], ans:2, correction:'Noi siamo.' },
          { type:'fill', q:'Complète avec AVERE :',
            sentence:['Lei','___','un libro e noi','___','due libri.'],
            words:['ha','abbiamo','hai','avete'], answers:['ha','abbiamo'],
            correction:'Lei ha (elle a) · Noi abbiamo (nous avons).' },
          { type:'mcq', q:'"Loro sono" se traduit par ?', opts:['Je suis','Tu es','Il est','Ils sont'], ans:3, correction:'Loro sono = ils/elles sont.' },
        ]
      },
      { id:'saluti', name:'Salutations et présentations', difficulty:'easy', xp:10,
        lesson: { tag:'Lessico', title:'Salutations en italien',
          body:`<div class="formula">Ciao = Salut/Au revoir (informel)<br>Buongiorno = Bonjour (matin)<br>Buonasera = Bonsoir<br>Come stai? = Comment vas-tu ?<br>Mi chiamo… = Je m'appelle…</div><div class="tip">En Italie, "Ciao" s'utilise pour dire bonjour ET au revoir entre amis !</div>` },
        exercises: [
          { type:'mcq', q:'"Bonjour" le matin en italien ?', opts:['Ciao','Buonasera','Buongiorno','Arrivederci'], ans:2, correction:'Buongiorno = bonjour (le matin).' },
          { type:'mcq', q:'"Comment tu t\'appelles ?" en italien ?', opts:['Come stai?','Come ti chiami?','Dove sei?','Quanti anni hai?'], ans:1, correction:'Come ti chiami? = Comment tu t\'appelles ?' },
          { type:'match', q:'Relie expression → traduction :',
            left:['Ciao','Grazie','Prego','Scusa'],
            right:['Excuse-moi','De rien','Merci','Salut'], answers:[3,2,1,0],
            correction:'Ciao=Salut, Grazie=Merci, Prego=De rien, Scusa=Excuse-moi.' },
          { type:'mcq', q:'Pour dire "au revoir" formellement ?', opts:['Ciao','Buongiorno','Arrivederci','Come stai'], ans:2, correction:'Arrivederci = au revoir (formel).' },
          { type:'fill', q:'Complète la présentation :',
            sentence:['Mi','___','Luca. Ho','___','anni.'],
            words:['chiamo','ho','sono','chiami'], answers:['chiamo','15'],
            correction:'Mi chiamo Luca. Ho 15 anni. (Je m\'appelle Luca. J\'ai 15 ans.)' },
        ]
      },
    ]
  },

  // ── CHINOIS (nouveau) ─────────────────────────
  zh: {
    id:'zh', name:'Chinois (LV2)', icon:'🇨🇳', pole:'lang',
    chapters: [
      { id:'pinyin', name:'Pinyin et tons', difficulty:'medium', xp:25,
        lesson: { tag:'汉语', title:'Le pinyin et les 4 tons',
          body:`<h3>Le pinyin</h3><p>Le pinyin est le système de romanisation du chinois mandarin. Il aide à prononcer les caractères.</p><h3>Les 4 tons</h3><div class="formula">1er ton (—) : mā (mère) · 2e ton (/) : má (chanvre)<br>3e ton (∨) : mǎ (cheval) · 4e ton (\\) : mà (gronder)</div><div class="tip">En chinois, le même son avec un ton différent = un mot totalement différent !</div>` },
        exercises: [
          { type:'mcq', q:'Que signifie "mā" (1er ton) ?', opts:['Cheval','Chanvre','Gronder','Mère'], ans:3, correction:'Mā (ton plat) = mère (妈).' },
          { type:'mcq', q:'Combien de tons y a-t-il en mandarin ?', opts:['2','3','4','5'], ans:2, correction:'4 tons en mandarin standard (+ le ton neutre parfois).' },
          { type:'mcq', q:'Le 3e ton est représenté par :', opts:['—','/','\\ ','∨'], ans:3, correction:'Le 3e ton (ton bas-montant) est représenté par le signe ∨ (mǎ).' },
          { type:'match', q:'Relie ton → description :',
            left:['1er ton','2e ton','3e ton','4e ton'],
            right:['Descendant','Montant','Plat/Haut','Bas puis montant'], answers:[2,1,3,0],
            correction:'1er=plat, 2e=montant, 3e=bas+montant, 4e=descendant.' },
          { type:'mcq', q:'"Nǐ hǎo" (你好) signifie ?', opts:['Merci','Bonjour','Au revoir','Pardon'], ans:1, correction:'Nǐ hǎo = Bonjour (littéralement "toi bien").' },
        ]
      },
      { id:'chiffres_zh', name:'Les chiffres en chinois', difficulty:'easy', xp:10,
        lesson: { tag:'词汇', title:'Les chiffres de 1 à 10',
          body:`<div class="formula">1 一 yī · 2 二 èr · 3 三 sān · 4 四 sì · 5 五 wǔ<br>6 六 liù · 7 七 qī · 8 八 bā · 9 九 jiǔ · 10 十 shí</div><div class="tip">Le chiffre 8 (八 bā) est considéré comme porte-bonheur en Chine car il ressemble au mot "prospérité".</div>` },
        exercises: [
          { type:'mcq', q:'Comment dit-on "5" en chinois (pinyin) ?', opts:['sì','wǔ','liù','qī'], ans:1, correction:'5 = 五 wǔ.' },
          { type:'mcq', q:'Quel caractère représente le chiffre 3 ?', opts:['一','二','三','四'], ans:2, correction:'三 = 3 (sān).' },
          { type:'match', q:'Relie chiffre → pinyin :',
            left:['1','8','10','4'],
            right:['sì','shí','yī','bā'], answers:[2,3,1,0],
            correction:'1=yī, 8=bā, 10=shí, 4=sì.' },
          { type:'mcq', q:'"Qī" correspond à ?', opts:['6','7','8','9'], ans:1, correction:'七 qī = 7.' },
          { type:'mcq', q:'Quel chiffre est porte-bonheur en Chine ?', opts:['4','6','7','8'], ans:3, correction:'8 (八 bā) = prospérité en chinois.' },
        ]
      },
    ]
  },

  // ── ARTS PLASTIQUES ───────────────────────────
  arts: {
    id:'arts', name:'Arts Plastiques', icon:'🎨', pole:'lang',
    chapters: [
      { id:'couleurs', name:'Théorie des couleurs', difficulty:'easy', xp:10,
        lesson: { tag:'Arts visuels', title:'Théorie des couleurs',
          body:`<h3>Couleurs primaires (peinture)</h3><p>Rouge, Jaune, Bleu — ne s'obtiennent pas par mélange.</p><div class="formula">R+J=Orange · J+B=Vert · B+R=Violet</div><h3>Complémentaires</h3><p>Face à face sur le cercle chromatique.</p><div class="tip">Deux complémentaires mélangées → gris/brun.</div>` },
        exercises: [
          { type:'mcq', q:'3 couleurs primaires en peinture ?', opts:['Rouge Vert Bleu','Rouge Jaune Bleu','Cyan Magenta Jaune','Orange Violet Vert'], ans:1, correction:'Rouge, Jaune, Bleu (synthèse soustractive).' },
          { type:'mcq', q:'Jaune + Bleu = ?', opts:['Orange','Vert','Violet','Rouge'], ans:1, correction:'Jaune + Bleu = Vert.' },
          { type:'mcq', q:'Complémentaire du rouge ?', opts:['Orange','Violet','Vert','Bleu'], ans:2, correction:'Rouge ↔ Vert (face à face sur le cercle).' },
          { type:'match', q:'Relie mélange → couleur :',
            left:['R + J','J + B','B + R','R + Blanc'],
            right:['Rose','Orange','Vert','Violet'], answers:[1,2,3,0],
            correction:'R+J=Orange, J+B=Vert, B+R=Violet, R+Blanc=Rose.' },
          { type:'mcq', q:'Le cercle chromatique sert à ?', opts:['Mesurer lumière','Organiser couleurs','Peindre cercles','Choisir pinceaux'], ans:1, correction:'Montrer les relations entre les couleurs.' },
        ]
      },
    ]
  },
};

const ALL_SUBJECTS = Object.values(SUBJECTS);

// ─────────────────────────────────────────────
// FAKE LEADERBOARD
// ─────────────────────────────────────────────
const FAKE_LB = [
  { name:'MathWizard',  xp:1240, ex:52 },
  { name:'SuperSophie', xp:980,  ex:41 },
  { name:'CodeNinja',   xp:875,  ex:38 },
  { name:'GéoMaster',   xp:720,  ex:31 },
  { name:'ScienMax',    xp:610,  ex:27 },
  { name:'LectureKing', xp:540,  ex:23 },
  { name:'AlgebraCat',  xp:460,  ex:20 },
  { name:'HistoFan',    xp:350,  ex:15 },
  { name:'SprachProfi', xp:280,  ex:12 },
  { name:'NumberOne',   xp:190,  ex:8  },
];

const EVAL_POLES = [
  { id:'sci',  label:'Pôle Scientifique', icon:'🔬' },
  { id:'lit',  label:'Pôle Littéraire',   icon:'📖' },
  { id:'lang', label:'Langues & Arts',    icon:'🌐' },
];

const GOAL_SUBJECTS = [
  { id:'math', label:'Maths', icon:'🔢' },
  { id:'fr',   label:'Français', icon:'✍️' },
  { id:'hist', label:'Histoire-Géo', icon:'🌍' },
  { id:'pc',   label:'Physique-Chimie', icon:'⚗️' },
  { id:'svt',  label:'SVT', icon:'🌿' },
  { id:'en',   label:'Anglais', icon:'🇬🇧' },
  { id:'es',   label:'Espagnol', icon:'🇪🇸' },
  { id:'de',   label:'Allemand', icon:'🇩🇪' },
  { id:'it',   label:'Italien', icon:'🇮🇹' },
  { id:'zh',   label:'Chinois', icon:'🇨🇳' },
  { id:'emc',  label:'EMC', icon:'⚖️' },
  { id:'arts', label:'Arts', icon:'🎨' },
];

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
let users   = JSON.parse(localStorage.getItem('eduxis_users')   || '{}');
let session = JSON.parse(localStorage.getItem('eduxis_session') || 'null');
let curSubject = null, curChapter = null, curExIdx = 0, exResults = [];
let obData = { level: null, eval: {}, goals: [] };

// Theme
let currentTheme = localStorage.getItem('eduxis_theme') || 'dark';
let notifEnabled = true;

function saveUsers()   { localStorage.setItem('eduxis_users',   JSON.stringify(users)); }
function saveSession() { localStorage.setItem('eduxis_session', JSON.stringify(session)); }

// ─────────────────────────────────────────────
// XP / LEVELS
// ─────────────────────────────────────────────
function xpForLevel(lvl) { return Math.floor(100 * Math.pow(1.5, lvl - 1)); }
function getLevel(xp) {
  let lvl = 1, acc = 0;
  while (true) {
    const need = xpForLevel(lvl);
    if (acc + need > xp) return { level: lvl, current: xp - acc, needed: need };
    acc += need; lvl++;
  }
}
function lvlTitle(l) {
  if (l <= 2) return 'Débutant'; if (l <= 5) return 'Apprenti';
  if (l <= 9) return 'Intermédiaire'; if (l <= 14) return 'Avancé';
  return 'Expert';
}

// ─────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('eduxis_theme', theme);

  const icon  = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  const toggle = document.getElementById('pm-toggle-theme');
  const optD  = document.getElementById('theme-opt-dark');
  const optL  = document.getElementById('theme-opt-light');

  if (theme === 'light') {
    if (icon)  icon.textContent  = '🌙';
    if (label) label.textContent = 'Mode sombre';
    if (toggle) toggle.classList.add('active');
    if (optD) optD.classList.remove('selected');
    if (optL) optL.classList.add('selected');
  } else {
    if (icon)  icon.textContent  = '☀️';
    if (label) label.textContent = 'Mode clair';
    if (toggle) toggle.classList.remove('active');
    if (optD) optD.classList.add('selected');
    if (optL) optL.classList.remove('selected');
  }
}

function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}
function setTheme(t) { applyTheme(t); }

function toggleNotifs() {
  notifEnabled = !notifEnabled;
  const t = document.getElementById('pm-toggle-notif');
  if (t) t.classList.toggle('active', notifEnabled);
}

// ─────────────────────────────────────────────
// PROFILE MENU
// ─────────────────────────────────────────────
function toggleProfileMenu() {
  const menu = document.getElementById('profile-menu');
  const btn  = document.getElementById('profile-btn');
  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    menu.classList.remove('open');
    btn.classList.remove('open');
  } else {
    menu.classList.add('open');
    btn.classList.add('open');
    refreshProfileMenu();
  }
}

function closeProfileMenu() {
  document.getElementById('profile-menu').classList.remove('open');
  document.getElementById('profile-btn').classList.remove('open');
}

function refreshProfileMenu() {
  if (!session || !users[session]) return;
  const u  = users[session];
  const lv = getLevel(u.xp);
  const firstLetter = session[0].toUpperCase();

  const pmAv = document.getElementById('pm-avatar');
  if (pmAv) pmAv.textContent = firstLetter;
  const pmN = document.getElementById('pm-name');
  if (pmN)  pmN.textContent  = session;
  const pmE = document.getElementById('pm-email');
  if (pmE)  pmE.textContent  = u.email || '';
  const pmX = document.getElementById('pm-xp');
  if (pmX)  pmX.textContent  = u.xp;
  const pmL = document.getElementById('pm-level');
  if (pmL)  pmL.textContent  = lv.level;
  const pmD = document.getElementById('pm-done');
  if (pmD)  pmD.textContent  = Object.keys(u.completed).length;
}

// ─────────────────────────────────────────────
// SETTINGS MODAL
// ─────────────────────────────────────────────
function openSettings() {
  closeProfileMenu();
  const u = users[session];
  const pseudo = document.getElementById('set-pseudo');
  const email  = document.getElementById('set-email');
  const cls    = document.getElementById('set-class');
  if (pseudo) pseudo.value = session;
  if (email)  email.value  = u.email || '';
  if (cls)    cls.value    = u.level || '5eme';
  applyTheme(currentTheme); // sync selectors
  document.getElementById('settings-modal').classList.add('open');
}

function closeSettings() {
  document.getElementById('settings-modal').classList.remove('open');
}

function saveSettings() {
  const u = users[session];
  const email = document.getElementById('set-email').value.trim();
  const cls   = document.getElementById('set-class').value;
  if (email) u.email = email;
  if (cls)   u.level = cls;
  saveUsers();
  updateTopBar();
  updateSidebarProfile();
  closeSettings();
}

// ─────────────────────────────────────────────
// PAGES / PANELS
// ─────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function setActivePanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('p-' + id);
  if (el) el.classList.add('active');
}

function switchPanel(id, menuEl) {
  setActivePanel(id);
  document.querySelectorAll('.snav-item').forEach(m => m.classList.remove('active'));
  if (menuEl) menuEl.classList.add('active');
  const titles = { dashboard:'Tableau de bord', catalog:'Catalogue', leaderboard:'Classement' };
  document.getElementById('app-title').textContent = titles[id] || '';
  document.getElementById('app-crumb').textContent = '';
  if (id === 'dashboard')   renderDashboard();
  if (id === 'catalog')     renderCatalog();
  if (id === 'leaderboard') renderLeaderboard();
  closeProfileMenu();
}

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────
function setAuthMode(mode) {
  document.getElementById('form-login').style.display    = mode === 'login'    ? 'block' : 'none';
  document.getElementById('form-register').style.display = mode === 'register' ? 'block' : 'none';
  document.getElementById('auth-alert').style.display    = 'none';
}
function authAlert(msg, type='error') {
  const el = document.getElementById('auth-alert');
  el.className = 'auth-alert alert-' + type;
  el.textContent = msg; el.style.display = 'block';
}
function doRegister() {
  const user  = document.getElementById('re-user').value.trim();
  const email = document.getElementById('re-email').value.trim();
  const pass  = document.getElementById('re-pass').value;
  if (!user || !email || !pass) return authAlert('Remplis tous les champs.');
  if (user.length < 3)          return authAlert('Pseudo trop court (min 3 caractères).');
  if (users[user])              return authAlert('Ce pseudo est déjà pris.');
  const now = new Date().toLocaleDateString('fr-FR');
  users[user] = { pass, email, xp:0, completed:{}, joined:now, lastLogin:now, level:null, eval:{}, goals:[], onboardingDone:false };
  saveUsers(); session = user; saveSession(); startOnboarding();
}
function doLogin() {
  const user = document.getElementById('li-user').value.trim();
  const pass = document.getElementById('li-pass').value;
  if (!user || !pass)                            return authAlert('Remplis tous les champs.');
  if (!users[user] || users[user].pass !== pass) return authAlert('Identifiants incorrects.');
  users[user].lastLogin = new Date().toLocaleDateString('fr-FR');
  saveUsers(); session = user; saveSession();
  if (!users[session].onboardingDone) startOnboarding(); else enterApp();
}
function doLogout() {
  session = null; localStorage.removeItem('eduxis_session'); showPage('landing');
}

// ─────────────────────────────────────────────
// ONBOARDING
// ─────────────────────────────────────────────
function startOnboarding() {
  obData = { level: null, eval: {}, goals: [] };
  showPage('onboarding');
  buildSelfEval(); buildGoals(); goObStep(0);
}
function buildSelfEval() {
  document.getElementById('self-eval').innerHTML = EVAL_POLES.map(p => `
    <div class="se-row">
      <div class="se-label">${p.icon} ${p.label}</div>
      <div class="se-options" id="se-${p.id}">
        ${['Débutant','Intermédiaire','Expert'].map(l =>
          `<span class="se-opt" onclick="selectEval('${p.id}','${l}',this)">${l}</span>`
        ).join('')}
      </div>
    </div>`).join('');
}
function buildGoals() {
  document.getElementById('ob-goals').innerHTML = GOAL_SUBJECTS.map(s =>
    `<div class="ob-goal" onclick="toggleGoal('${s.id}',this)">${s.icon} ${s.label}</div>`
  ).join('');
}
function selectObChoice(el, key) {
  el.parentElement.querySelectorAll('.ob-choice').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected'); obData[key] = el.dataset.val;
  const btn = document.getElementById('ob-btn-0'); if (btn) btn.disabled = false;
}
function selectEval(pid, level, el) {
  document.getElementById('se-' + pid).querySelectorAll('.se-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active'); obData.eval[pid] = level;
}
function toggleGoal(id, el) {
  if (el.classList.contains('selected')) {
    el.classList.remove('selected'); obData.goals = obData.goals.filter(g => g !== id);
  } else {
    if (obData.goals.length >= 3) return;
    el.classList.add('selected'); obData.goals.push(id);
  }
}
function goObStep(step) {
  document.querySelectorAll('.ob-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('op-' + step).classList.add('active');
  document.querySelectorAll('.ob-step').forEach((s, i) => {
    s.classList.remove('active','done');
    if (i < step) s.classList.add('done'); if (i === step) s.classList.add('active');
  });
  const labels = ['Niveau scolaire','Auto-évaluation','Mes objectifs'];
  const lbl = document.getElementById('ob-step-label'); if (lbl) lbl.textContent = labels[step];
}
function finishOnboarding() {
  const u = users[session];
  u.level = obData.level || '5eme'; u.eval = obData.eval;
  u.goals = obData.goals; u.onboardingDone = true;
  saveUsers(); enterApp();
}

// ─────────────────────────────────────────────
// ENTER APP
// ─────────────────────────────────────────────
function enterApp() {
  showPage('app');
  applyTheme(currentTheme);
  updateTopBar(); updateSidebarProfile(); renderCatalog(); renderDashboard();
  setActivePanel('dashboard');
}

function updateTopBar() {
  const u  = users[session];
  const lv = getLevel(u.xp);
  document.getElementById('top-xp').textContent    = u.xp;
  document.getElementById('top-level').textContent = lv.level;
  const cc = document.getElementById('top-class');
  if (cc) cc.textContent = u.level || '';
}

function updateSidebarProfile() {
  const u  = users[session];
  const lv = getLevel(u.xp);
  const fl = session[0].toUpperCase();

  const av = document.getElementById('profile-avatar'); if (av) av.textContent = fl;
  const pn = document.getElementById('profile-name');   if (pn) pn.textContent = session;
  const ps = document.getElementById('profile-sub');    if (ps) ps.textContent = `⚡ ${u.xp} XP · Niv.${lv.level}`;
}

// ─────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────
function renderDashboard() {
  const u  = users[session];
  const lv = getLevel(u.xp);
  const totalEx = Object.keys(u.completed).length;

  document.getElementById('dash-stats').innerHTML = `
    <div class="stat-card amber"><div class="sc-icon">⚡</div><div class="sc-val">${u.xp}</div><div class="sc-label">XP Total</div></div>
    <div class="stat-card teal"><div class="sc-icon">⭐</div><div class="sc-val">${lv.level}</div><div class="sc-label">${lvlTitle(lv.level)}</div></div>
    <div class="stat-card purple"><div class="sc-icon">✅</div><div class="sc-val">${totalEx}</div><div class="sc-label">Exercices terminés</div></div>
    <div class="stat-card rose"><div class="sc-icon">📅</div><div class="sc-val" style="font-size:1.1rem;padding-top:.4rem">${u.joined}</div><div class="sc-label">Membre depuis</div></div>
  `;
  drawSpider(u);
  renderRecommendations(u);

  document.getElementById('subj-prog-grid').innerHTML = ALL_SUBJECTS.map(s => {
    const total = s.chapters.reduce((a,c) => a + c.exercises.length, 0);
    const done  = s.chapters.reduce((a,c) => a + c.exercises.filter((_,i) => u.completed[s.id+':'+c.id+':'+i]).length, 0);
    const pct   = total ? Math.round(done/total*100) : 0;
    return `<div class="spg-item">
      <div class="spg-row"><span>${s.icon} ${s.name}</span><span class="spg-pct">${pct}%</span></div>
      <div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

function subjectScore(s, completed) {
  const total = s.chapters.reduce((a,c) => a + c.exercises.length, 0);
  if (!total) return 0;
  const done = s.chapters.reduce((a,c) => a + c.exercises.filter((_,i) => completed[s.id+':'+c.id+':'+i]).length, 0);
  return Math.round(done/total*100);
}

function drawSpider(u) {
  const canvas = document.getElementById('spider-chart'); if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, cx = W/2, cy = H/2, R = Math.min(W,H)/2 - 36;
  const axes = [
    {label:'Maths',id:'math'},{label:'Français',id:'fr'},{label:'Histoire',id:'hist'},
    {label:'Physique',id:'pc'},{label:'Anglais',id:'en'},{label:'Chinois',id:'zh'},
  ];
  const n = axes.length;
  const vals = axes.map(a => (subjectScore(SUBJECTS[a.id], u.completed)/100)||0);
  ctx.clearRect(0,0,W,H);
  [.25,.5,.75,1].forEach(r => {
    ctx.beginPath();
    for (let i=0;i<=n;i++) {
      const a=(Math.PI*2*i)/n-Math.PI/2;
      const x=cx+R*r*Math.cos(a), y=cy+R*r*Math.sin(a);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.closePath(); ctx.strokeStyle='rgba(255,255,255,0.06)'; ctx.lineWidth=1; ctx.stroke();
  });
  for (let i=0;i<n;i++) {
    const a=(Math.PI*2*i)/n-Math.PI/2;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));
    ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=1; ctx.stroke();
  }
  ctx.beginPath();
  for (let i=0;i<n;i++) {
    const a=(Math.PI*2*i)/n-Math.PI/2, v=vals[i];
    const x=cx+R*v*Math.cos(a), y=cy+R*v*Math.sin(a);
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  }
  ctx.closePath();
  const grad=ctx.createRadialGradient(cx,cy,0,cx,cy,R);
  grad.addColorStop(0,'rgba(245,158,11,0.35)'); grad.addColorStop(1,'rgba(20,184,166,0.15)');
  ctx.fillStyle=grad; ctx.fill(); ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=2; ctx.stroke();
  for (let i=0;i<n;i++) {
    const a=(Math.PI*2*i)/n-Math.PI/2, v=vals[i];
    const dx=cx+R*v*Math.cos(a), dy=cy+R*v*Math.sin(a);
    ctx.beginPath(); ctx.arc(dx,dy,4,0,Math.PI*2); ctx.fillStyle='#f59e0b'; ctx.fill();
    const lx=cx+(R+22)*Math.cos(a), ly=cy+(R+22)*Math.sin(a);
    ctx.fillStyle='rgba(160,160,192,0.9)'; ctx.font='11px Instrument Sans,sans-serif';
    ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(axes[i].label,lx,ly);
  }
}

function renderRecommendations(u) {
  const recs = [];
  ALL_SUBJECTS.forEach(s => s.chapters.forEach(ch => {
    const done = ch.exercises.filter((_,i) => u.completed[s.id+':'+ch.id+':'+i]).length;
    const pct  = Math.round(done/ch.exercises.length*100);
    if (pct < 50) recs.push({s,ch,pct});
  }));
  if (u.goals?.length) recs.sort((a,b) => (u.goals.includes(a.s.id)?0:1)-(u.goals.includes(b.s.id)?0:1) || a.pct-b.pct);
  else recs.sort((a,b) => a.pct-b.pct);
  const top = recs.slice(0,3);
  document.getElementById('recommendations').innerHTML = !top.length
    ? `<div class="rec-item"><div class="rec-icon">🎉</div><div class="rec-text">Bravo ! Tu as terminé tous les exercices !</div></div>`
    : top.map(({s,ch,pct}) => `
      <div class="rec-item">
        <div class="rec-icon">${s.icon}</div>
        <div class="rec-text">
          <strong>${s.name} — ${ch.name}</strong><br>
          ${pct===0?'Pas encore commencé !':'Complété à '+pct+'% — continue !'}
          <span class="rec-btn" onclick="openChapterDirect('${s.id}','${ch.id}')">Commencer →</span>
        </div>
      </div>`).join('');
}

function openChapterDirect(sid, chid) {
  curSubject = SUBJECTS[sid];
  curChapter = curSubject.chapters.find(c => c.id === chid);
  openLesson();
}

// ─────────────────────────────────────────────
// CATALOG
// ─────────────────────────────────────────────
function renderCatalog() {
  const u = users[session];
  const renderGrid = (ids) => ids.map(id => {
    const s = SUBJECTS[id]; if (!s) return '';
    const total = s.chapters.reduce((a,c) => a+c.exercises.length, 0);
    const done  = s.chapters.reduce((a,c) => a+c.exercises.filter((_,i) => u.completed[s.id+':'+c.id+':'+i]).length, 0);
    const pct   = total ? Math.round(done/total*100) : 0;
    return `<div class="cat-card" onclick="openSubjectById('${id}')">
      <div class="cat-icon">${s.icon}</div>
      <div class="cat-name">${s.name}</div>
      <div class="cat-chapters">${s.chapters.length} chapitre(s) · ${total} exercices</div>
      <div class="cat-pct">${pct}% terminé</div>
      <div class="cat-bar"><div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div></div>
    </div>`;
  }).join('');
  document.getElementById('cg-sci').innerHTML  = renderGrid(POLES.sci.ids);
  document.getElementById('cg-lit').innerHTML  = renderGrid(POLES.lit.ids);
  document.getElementById('cg-lang').innerHTML = renderGrid(POLES.lang.ids);
}

// ─────────────────────────────────────────────
// SUBJECT
// ─────────────────────────────────────────────
function openSubjectById(id, menuEl) {
  curSubject = SUBJECTS[id]; if (!curSubject) return;
  if (menuEl) { document.querySelectorAll('.snav-item').forEach(m => m.classList.remove('active')); menuEl.classList.add('active'); }
  document.getElementById('app-title').textContent = curSubject.name;
  document.getElementById('app-crumb').textContent = '';
  setActivePanel('subject');
  const u = users[session];
  const totalEx = curSubject.chapters.reduce((a,c) => a+c.exercises.length, 0);
  const doneEx  = curSubject.chapters.reduce((a,c) => a+c.exercises.filter((_,i) => u.completed[curSubject.id+':'+c.id+':'+i]).length, 0);
  document.getElementById('subject-hero').innerHTML = `
    <div class="sh-icon">${curSubject.icon}</div>
    <div class="sh-info">
      <h2>${curSubject.name}</h2>
      <p>${curSubject.chapters.length} chapitre(s) · ${totalEx} exercices progressifs</p>
      <div class="sh-stats">
        <div class="sh-stat"><strong>${doneEx}</strong>Terminés</div>
        <div class="sh-stat"><strong>${totalEx-doneEx}</strong>Restants</div>
        <div class="sh-stat"><strong>${totalEx?Math.round(doneEx/totalEx*100):0}%</strong>Complétion</div>
      </div>
    </div>`;
  const diffMap = {easy:'Facile',medium:'Moyen',hard:'Difficile'};
  document.getElementById('chapter-cards').innerHTML = curSubject.chapters.map((ch,i) => {
    const done = ch.exercises.filter((_,ei) => u.completed[curSubject.id+':'+ch.id+':'+ei]).length;
    const pct  = Math.round(done/ch.exercises.length*100);
    const all  = done === ch.exercises.length;
    return `<div class="chap-card" onclick="openChapter(${i})">
      <div class="chap-num ${all?'done':''}">${all?'✓':i+1}</div>
      <div class="chap-info">
        <div class="chap-name">${ch.name}</div>
        <div class="chap-meta">${ch.exercises.length} exercices · ${done}/${ch.exercises.length} terminés</div>
        <div style="margin-top:.5rem"><div class="prog-bar" style="height:4px"><div class="prog-fill" style="width:${pct}%"></div></div></div>
      </div>
      <div class="chap-right">
        <span class="diff-tag diff-${ch.difficulty}">${diffMap[ch.difficulty]}</span>
        <span class="xp-tag">+${ch.xp} XP</span>
      </div>
    </div>`;
  }).join('');
  closeProfileMenu();
}

function openChapter(idx) { curChapter = curSubject.chapters[idx]; openLesson(); }
function backToSubject()   { openSubjectById(curSubject.id); }

// ─────────────────────────────────────────────
// LESSON
// ─────────────────────────────────────────────
function openLesson() {
  document.getElementById('app-title').textContent = curChapter.name;
  document.getElementById('app-crumb').textContent = curSubject.name + ' › ' + curChapter.name;
  setActivePanel('lesson');
  const lsn = curChapter.lesson, u = users[session];
  const done  = curChapter.exercises.filter((_,i) => u.completed[curSubject.id+':'+curChapter.id+':'+i]).length;
  const total = curChapter.exercises.length;
  document.getElementById('lesson-layout').innerHTML = `
    <div class="lesson-main">
      <div class="lesson-card">
        <div class="lesson-tag">📖 ${lsn.tag}</div>
        <div class="lesson-title">${lsn.title}</div>
        <div class="lesson-body">${lsn.body}</div>
      </div>
    </div>
    <div class="lesson-sidebar">
      <div class="lesson-cta-card">
        <div class="lcc-title">🏋️ Parcours d'entraînement</div>
        <div class="lcc-desc">5 exercices progressifs. Chaque erreur est expliquée.</div>
        <div class="lcc-stats">
          <div class="lcc-stat"><div class="v">${done}</div><div class="l">Terminés</div></div>
          <div class="lcc-stat"><div class="v">${total-done}</div><div class="l">Restants</div></div>
          <div class="lcc-stat"><div class="v">+${curChapter.xp}</div><div class="l">XP/ex.</div></div>
        </div>
        <button class="btn btn-primary" style="width:100%;border-radius:10px;padding:.85rem" onclick="startExercises()">
          ${done===0?'Commencer →':done===total?'Refaire 🔄':'Continuer →'}
        </button>
      </div>
    </div>`;
}
function backToLesson() { openLesson(); }

// ─────────────────────────────────────────────
// EXERCISES
// ─────────────────────────────────────────────
function startExercises() {
  curExIdx = 0; exResults = new Array(curChapter.exercises.length).fill(null);
  setActivePanel('exercise');
  document.getElementById('app-title').textContent = 'Exercice 1/' + curChapter.exercises.length;
  renderExercise();
}

function renderExercise() {
  const ex = curChapter.exercises[curExIdx], total = curChapter.exercises.length;
  document.getElementById('ex-track').innerHTML = exResults.map((r,i) =>
    `<div class="ex-dot ${i===curExIdx?'current':r===true?'done':r===false?'wrong':''}"></div>`).join('');
  const tl = {mcq:'QCM',calc:'Calcul',fill:'Texte à trous',match:'Relier'};
  const dm = {easy:'Facile',medium:'Moyen',hard:'Difficile'};
  let html = `<div class="ex-type">${tl[ex.type]||ex.type}</div>
    <div class="ex-num">Exercice ${curExIdx+1} sur ${total} · ${dm[curChapter.difficulty]}</div>
    <div class="ex-question">${ex.q}</div>`;

  if (ex.type === 'mcq') {
    html += `<div class="mcq-list">${ex.opts.map((o,i) =>
      `<div class="mcq-opt" id="opt-${i}" onclick="selectMCQ(${i})">${o}</div>`).join('')}</div>`;
  } else if (ex.type === 'calc') {
    html += `<div class="calc-row"><input type="number" id="calc-in" placeholder="?"/><span class="calc-unit">${ex.unit||''}</span></div>`;
  } else if (ex.type === 'fill') {
    let blanks = [];
    html += '<div class="blank-sentence">';
    ex.sentence.forEach(part => {
      if (part === '___') {
        const bi = blanks.length; blanks.push({filled:null});
        html += `<span class="blank-slot" id="blank-${bi}" onclick="fillBlank(${bi})">___</span>`;
      } else { html += `<span>${part}</span>`; }
    });
    html += '</div><div class="word-bank">' + ex.words.map(w =>
      `<span class="word-chip" data-word="${w}" onclick="selectWord(this,'${w}')">${w}</span>`).join('') + '</div>';
    window._blanks = blanks; window._selWord = null;
  } else if (ex.type === 'match') {
    window._matchLeft = null; window._matchPairs = {};
    html += '<div class="match-grid"><div class="match-col">' +
      ex.left.map((l,i) => `<div class="match-item" id="ml-${i}" onclick="selLeft(${i})">${l}</div>`).join('') +
      '</div><div class="match-col">' +
      ex.right.map((r,i) => `<div class="match-item" id="mr-${i}" onclick="selRight(${i})">${r}</div>`).join('') +
      '</div></div>';
  }
  html += `<div id="ex-feedback" class="ex-feedback"></div>
    <div class="ex-actions"><button class="btn btn-primary" id="ex-submit-btn" onclick="submitEx()" style="padding:.75rem 2rem;border-radius:10px">Vérifier</button></div>`;
  document.getElementById('ex-box').innerHTML = html;
  window._exAnswered = false; window._exSelected = undefined;
}

function selectMCQ(i) {
  if (window._exAnswered) return;
  document.querySelectorAll('.mcq-opt').forEach(o => o.classList.remove('selected'));
  document.getElementById('opt-'+i).classList.add('selected');
  window._exSelected = i;
}
function selectWord(el, word) {
  if (window._exAnswered) return;
  document.querySelectorAll('.word-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected'); window._selWord = word;
}
function fillBlank(bi) {
  if (window._exAnswered || !window._selWord) return;
  const blanks = window._blanks;
  if (blanks[bi].filled) {
    document.querySelectorAll('.word-chip').forEach(c => {
      if (c.dataset.word === blanks[bi].filled) { c.classList.remove('used'); c.style.opacity=''; c.style.pointerEvents=''; }
    });
  }
  blanks[bi].filled = window._selWord;
  const slot = document.getElementById('blank-'+bi);
  slot.textContent = window._selWord; slot.classList.add('filled');
  document.querySelectorAll('.word-chip').forEach(c => {
    if (c.dataset.word === window._selWord && !c.classList.contains('used')) {
      c.classList.add('used'); c.style.opacity='.3'; c.style.pointerEvents='none';
    }
  });
  window._selWord = null; document.querySelectorAll('.word-chip').forEach(c => c.classList.remove('selected'));
}
function selLeft(i) {
  if (window._exAnswered || window._matchPairs[i] !== undefined) return;
  document.querySelectorAll('[id^="ml-"]').forEach(m => m.classList.remove('sel-left'));
  document.getElementById('ml-'+i).classList.add('sel-left'); window._matchLeft = i;
}
function selRight(j) {
  if (window._exAnswered || window._matchLeft === null) return;
  const ex = curChapter.exercises[curExIdx], i = window._matchLeft;
  const ok = ex.answers[i] === j;
  window._matchPairs[i] = j;
  document.getElementById('ml-'+i).classList.remove('sel-left');
  document.getElementById('ml-'+i).classList.add(ok?'matched':'wrong-match');
  document.getElementById('mr-'+j).classList.add(ok?'matched':'wrong-match');
  window._matchLeft = null;
  if (Object.keys(window._matchPairs).length === ex.left.length) {
    finishEx(ex.left.every((_,idx) => window._matchPairs[idx] === ex.answers[idx]));
  }
}

function submitEx() {
  if (window._exAnswered) { nextEx(); return; }
  const ex = curChapter.exercises[curExIdx]; let ok = false;
  if (ex.type === 'mcq') {
    if (window._exSelected === undefined) return;
    ok = window._exSelected === ex.ans;
    document.querySelectorAll('.mcq-opt').forEach((o,i) => {
      if (i===ex.ans) o.classList.add('correct');
      else if (i===window._exSelected && !ok) o.classList.add('wrong');
    });
  } else if (ex.type === 'calc') {
    const val = parseFloat(document.getElementById('calc-in').value); ok = val === ex.ans;
  } else if (ex.type === 'fill') {
    const blanks = window._blanks || [];
    ok = blanks.every((b,i) => b.filled === ex.answers[i]);
    blanks.forEach((b,i) => { const s=document.getElementById('blank-'+i); if(s) s.classList.add(b.filled===ex.answers[i]?'correct':'wrong'); });
  } else if (ex.type === 'match') { return; }
  finishEx(ok);
}

function finishEx(ok) {
  window._exAnswered = true; exResults[curExIdx] = ok;
  document.getElementById('ex-track').innerHTML = exResults.map((r,i) =>
    `<div class="ex-dot ${i===curExIdx?'current':r===true?'done':r===false?'wrong':''}"></div>`).join('');
  const ex = curChapter.exercises[curExIdx];
  const fb = document.getElementById('ex-feedback');
  const btn = document.getElementById('ex-submit-btn');
  if (ok) {
    fb.className = 'ex-feedback show ok';
    fb.innerHTML = `<div class="fb-icon">🎉</div><div><div class="fb-title">Bravo !</div><div class="fb-desc">+${curChapter.xp} XP gagnés !</div></div>`;
    awardXP(curChapter.xp, curExIdx);
  } else {
    fb.className = 'ex-feedback show bad';
    fb.innerHTML = `<div class="fb-icon">❌</div><div><div class="fb-title">Pas tout à fait…</div><div class="fb-desc">Lis l'explication ci-dessous.</div></div>`;
    const corrEl = document.createElement('div');
    corrEl.className = 'correction-block';
    corrEl.innerHTML = `<strong>Correction :</strong> ${ex.correction}`;
    fb.parentNode.insertBefore(corrEl, fb.nextSibling);
  }
  const isLast = curExIdx >= curChapter.exercises.length - 1;
  btn.textContent = isLast ? 'Voir le résumé →' : 'Exercice suivant →';
}

function nextEx() {
  if (curExIdx >= curChapter.exercises.length - 1) { showSummary(); }
  else {
    curExIdx++;
    document.getElementById('app-title').textContent = 'Exercice '+(curExIdx+1)+'/'+curChapter.exercises.length;
    renderExercise();
  }
}

function showSummary() {
  const correct = exResults.filter(r => r===true).length, total = exResults.length;
  const pct = Math.round(correct/total*100);
  document.getElementById('ex-box').innerHTML = `
    <div style="text-align:center;padding:1.5rem 0">
      <div style="font-size:3.5rem;margin-bottom:1rem">${pct>=80?'🏆':pct>=50?'💪':'📚'}</div>
      <div style="font-family:'Clash Display',sans-serif;font-size:1.8rem;font-weight:700;margin-bottom:.5rem">${correct}/${total} bonnes réponses</div>
      <div style="font-size:1rem;color:var(--text2);margin-bottom:2rem">${pct>=80?'Excellent !':pct>=50?'Bon effort !':'Relis la leçon et réessaie !'}</div>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="startExercises()" style="padding:.75rem 1.8rem;border-radius:10px">🔄 Réessayer</button>
        <button class="btn btn-outline" onclick="backToLesson()" style="padding:.75rem 1.8rem;border-radius:10px">📖 Retour à la leçon</button>
      </div>
    </div>`;
  document.getElementById('ex-track').innerHTML = '';
}

function awardXP(amount, exIdx) {
  const u = users[session], key = curSubject.id+':'+curChapter.id+':'+exIdx;
  if (!u.completed[key]) {
    u.xp += amount; u.completed[key] = true;
    saveUsers(); updateTopBar(); updateSidebarProfile(); showXPPop(amount);
  }
}

function showXPPop(amount) {
  const el = document.getElementById('xp-pop');
  el.textContent = '+'+amount+' XP'; el.style.display = 'block';
  el.style.top = '72px'; el.style.right = '1.5rem';
  el.style.animation = 'none'; el.offsetHeight;
  el.style.animation = 'xpFly 1.6s ease-out forwards';
  setTimeout(() => { el.style.display = 'none'; }, 1700);
}

// ─────────────────────────────────────────────
// LEADERBOARD
// ─────────────────────────────────────────────
function renderLeaderboard() {
  const all = [...FAKE_LB.map(u => ({...u}))];
  Object.keys(users).forEach(name => {
    all.push({name, xp:users[name].xp, ex:Object.keys(users[name].completed).length});
  });
  all.sort((a,b) => b.xp-a.xp);
  const data = all.slice(0,10);
  const medals = ['🥇','🥈','🥉'], rc = ['g','s','b'];
  document.getElementById('lb-list').innerHTML = data.map((e,i) => {
    const isMe = e.name === session, lv = getLevel(e.xp).level;
    return `<div class="lb-row ${isMe?'me':''}">
      <div class="lb-rank ${rc[i]||''}">${i<3?medals[i]:'#'+(i+1)}</div>
      <div class="lb-av">${e.name[0].toUpperCase()}</div>
      <div class="lb-info">
        <div class="lb-name">${e.name}${isMe?' <span style="color:var(--amber);font-size:.75rem">(toi)</span>':''}</div>
        <div class="lb-sub">Niv.${lv} · ${lvlTitle(lv)} · ${e.ex} exercices</div>
      </div>
      <div class="lb-xp">${e.xp} XP</div>
    </div>`;
  }).join('');
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
applyTheme(currentTheme);

if (session && users[session]) {
  if (!users[session].onboardingDone) startOnboarding();
  else enterApp();
} else {
  showPage('landing');
}
