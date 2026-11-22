// Materialspezifische Hinweise pro Fehler (erste Version)
//
// Aufbau:
//   MATERIALIEN       – Kurzsteckbrief je Werkstoff (typische Richtwerte für unverstärkte Standardtypen)
//   MATERIALHINWEISE  – je Fehler-id (wie in der Fehlerliste) ein Hinweis pro Werkstoff
//
// Felder je Hinweis:
//   text     – der Hinweis
//   typisch  – true, wenn der Werkstoff für diesen Fehler besonders anfällig ist
//   annahme  – true, wenn der Hinweis eine Annahme / ein grober Erfahrungswert ist,
//              der noch an der eigenen Maschine bzw. am Datenblatt geprüft werden sollte
//
// Die Daten sind bewusst von der Fehlerliste getrennt und über die Fehler-id verknüpft,
// damit sich Fehler und Materialhinweise unabhängig voneinander pflegen lassen.

const MATERIALIEN = {
  PA: {
    name: "Polyamid (PA 6 / PA 66)",
    steckbrief: "Teilkristallin, stark hygroskopisch. Trocknen ca. 80 °C, 4–6 h (Trockenlufttrockner). Masse ca. 240–290 °C, Werkzeug ca. 60–90 °C.",
    annahme: true,
  },
  PC: {
    name: "Polycarbonat (PC)",
    steckbrief: "Amorph, hygroskopisch, zähfließend. Trocknen ca. 120 °C, 2–4 h auf < 0,02 % Restfeuchte. Masse ca. 280–320 °C, Werkzeug ca. 80–110 °C.",
    annahme: true,
  },
  POM: {
    name: "Polyoxymethylen (POM)",
    steckbrief: "Teilkristallin, hohe Schwindung (ca. 2 %), zersetzt sich bei Überhitzung unter Formaldehydabspaltung. Masse ca. 190–220 °C, Werkzeug ca. 80–100 °C.",
    annahme: true,
  },
  PP: {
    name: "Polypropylen (PP)",
    steckbrief: "Teilkristallin, nicht hygroskopisch, leichtfließend, hohe Schwindung (ca. 1,5–2 %). Masse ca. 200–250 °C, Werkzeug ca. 20–60 °C.",
    annahme: true,
  },
};

const MATERIALHINWEISE = {
  "unvollstaendige-fuellung": {
    PA: { text: "Scharfer Schmelzpunkt: PA friert schnell ein. Hohe Einspritzgeschwindigkeit und ausreichende Werkzeugtemperatur sind wirksamer als nur mehr Druck.", typisch: true },
    PC: { text: "Zähfließend – bei dünnen Wänden und langen Fließwegen schnell an der Druckgrenze. Massetemperatur im oberen Fenster und warmes Werkzeug helfen am meisten.", typisch: true },
    POM: { text: "Selten ein Fließproblem, eher Dosier- oder Entlüftungsthema. Entlüftung prüfen, da Formaldehyd-Beläge die Kanäle zusetzen." },
    PP: { text: "Leichtfließend, Füllprobleme sind selten. Wenn doch: zuerst Massepolster, Rückstromsperre und Entlüftung prüfen." },
  },
  "einfallstellen": {
    PA: { text: "Hohe Kristallisationsschwindung. Nachdruckzeit bis zum Siegeln des Anschnitts verlängern (Siegelzeit per Gewichtskurve ermitteln).", typisch: true },
    PC: { text: "Geringe Schwindung, Einfallstellen meist nur bei starken Wanddickensprüngen. Nachdruck erhöhen und Werkzeugtemperatur prüfen." },
    POM: { text: "Sehr anfällig wegen hoher Schwindung. Anschnitt ausreichend groß und an der dicksten Stelle, Nachdruckzeit bis zur vollständigen Siegelung.", typisch: true },
    PP: { text: "Sehr anfällig. Nachdruck und Nachdruckzeit erhöhen, Werkzeugtemperatur eher senken. Talkumgefüllte oder nukleierte Typen schwinden weniger.", typisch: true },
  },
  "lunker": {
    PA: { text: "Bei dicken Wänden häufig. Langsam einspritzen, hoher Nachdruck, lange Nachdruckzeit. Anschnitt nicht zu klein, sonst siegelt er zu früh." },
    PC: { text: "In transparenten Teilen sofort sichtbar. Restfeuchte prüfen (< 0,02 %), da auch Feuchtigkeit Blasen bildet, die wie Lunker aussehen." },
    POM: { text: "Typisch bei Wanddicken über ca. 4 mm. Großer Anschnitt, langer Nachdruck, eher höhere Werkzeugtemperatur.", typisch: true, annahme: true },
    PP: { text: "Vakuolen in dicken Bereichen durch hohe Schwindung. Werkzeugtemperatur senken hilft nur bedingt, wirksamer ist längerer Nachdruck.", typisch: true },
  },
  "gratbildung": {
    PA: { text: "Sehr dünnflüssige Schmelze, Grat schon an kleinen Spalten. Entlüftungstiefe klein halten (ca. 0,01–0,02 mm), Umschaltpunkt früher setzen.", typisch: true, annahme: true },
    PC: { text: "Wenig anfällig wegen hoher Viskosität. Grat deutet eher auf Werkzeugverschleiß oder zu geringe Zuhaltekraft hin." },
    POM: { text: "Neigt zu Grat bei hohem Nachdruck. Entlüftungstiefe ca. 0,02 mm nicht überschreiten.", annahme: true },
    PP: { text: "Leichtfließend, daher anfällig. Einspritzdruck und Nachdruck senken, Umschaltpunkt früher, Trennebene prüfen.", typisch: true },
  },
  "feuchtigkeitsschlieren": {
    PA: { text: "Häufigste Ursache bei PA. Immer trocknen, Restfeuchte ca. 0,05–0,2 %. Zu trocken (unter ca. 0,05 %) kann die Fließfähigkeit verschlechtern.", typisch: true, annahme: true },
    PC: { text: "Sehr empfindlich: Feuchte führt zu Schlieren und durch Hydrolyse zu sprödem Bauteil. Trocknen auf < 0,02 %, getrocknetes Material nicht offen stehen lassen.", typisch: true },
    POM: { text: "Kaum hygroskopisch. Schlieren kommen eher von Oberflächenfeuchte (Kondenswasser) – kurz bei ca. 80–100 °C vortrocknen genügt.", annahme: true },
    PP: { text: "Nicht hygroskopisch. Ursache meist Kondenswasser auf kaltem Granulat oder feuchte Füllstoffe (Talkum). Granulat anwärmen oder kurz vortrocknen." },
  },
  "verbrennungsschlieren": {
    PA: { text: "Neigt bei langer Verweilzeit zu Vergilbung und Abbau. Verweilzeit prüfen (Schussgewicht zu klein für den Zylinder?)." },
    PC: { text: "Hohe Verarbeitungstemperatur, Abbau zeigt sich als gelb-braune Schlieren. Scherung an Anschnitten und Verweilzeit begrenzen." },
    POM: { text: "Sehr temperaturempfindlich, zersetzt sich unter Formaldehydabspaltung (stechender Geruch). Massetemperatur nicht über ca. 230 °C, Verweilzeit kurz halten.", typisch: true, annahme: true },
    PP: { text: "Recht unempfindlich. Wenn doch, auf Totzonen in Heißkanal oder Düse und zu hohe Staudruck-/Schneckendrehzahl achten." },
  },
  "dieseleffekt": {
    PA: { text: "Dünnflüssig und schnell eingespritzt – Luft wird schnell eingeschlossen. Entlüftung an Fließwegenden ergänzen, Einspritzgeschwindigkeit am Ende stufen." },
    PC: { text: "Brandstellen an Fließwegenden durch hohe Drücke. Geschwindigkeitsprofil am Ende absenken, Entlüftung prüfen." },
    POM: { text: "Besonders anfällig: Formaldehyd-Beläge setzen Entlüftungen zu. Entlüftungen regelmäßig reinigen, Wartungsintervall festlegen.", typisch: true },
    PP: { text: "Bei schneller Füllung dünnwandiger Teile möglich. Entlüftung und Einspritzprofil wie allgemein beschrieben." },
  },
  "bindenaehte": {
    PA: { text: "Bei glasfaserverstärktem PA ist die Bindenaht deutlich schwächer (Faserorientierung). Bindenaht nicht in belastete Bereiche legen.", typisch: true },
    PC: { text: "Bindenähte sind sichtbar und kerbempfindlich. Hohe Masse- und Werkzeugtemperatur verbessern Festigkeit und Optik.", typisch: true },
    POM: { text: "Bindenähte meist mechanisch unkritisch, optisch als feine Linie sichtbar. Werkzeugtemperatur erhöhen." },
    PP: { text: "Mechanisch meist unkritisch. Bei Talkum- oder Glasfaser-PP deutlich schwächer." },
  },
  "freistrahl": {
    PA: { text: "Niedrige Viskosität begünstigt Freistrahl. Anschnitt gegen eine Wand richten, Anfangsgeschwindigkeit stark reduzieren." },
    PC: { text: "In transparenten oder glänzenden Teilen sehr auffällig. Langsamer Start im Einspritzprofil, Anschnitt vergrößern oder überlappend ausführen.", typisch: true },
    POM: { text: "Häufig als matte Flecken bzw. „Wurm“ in Anschnittnähe sichtbar. Langsam anspritzen, Anschnitt gegen Wand oder Stift.", typisch: true },
    PP: { text: "Bei schneller Füllung möglich, meist leicht durch Einspritzprofil zu beheben." },
  },
  "verzug": {
    PA: { text: "Mit Glasfaser stark anfällig (Faserorientierung: längs weniger, quer mehr Schwindung). Gleichmäßige Werkzeugtemperatur auf beiden Seiten. Verzug nach Konditionierung erneut prüfen.", typisch: true },
    PC: { text: "Geringe, gleichmäßige Schwindung, wenig Verzug. Wenn Verzug auftritt, meist durch eingefrorene Spannungen – Werkzeugtemperatur erhöhen." },
    POM: { text: "Hohe Schwindung und Nachschwindung. Werkzeugtemperatur ca. 90 °C und gleichmäßig auf beiden Hälften verringert Verzug.", typisch: true, annahme: true },
    PP: { text: "Sehr anfällig, besonders bei großen flachen Teilen. Kühlung gleichmäßig auslegen, Nachdruck senken, ggf. talkumgefüllte Typen verwenden.", typisch: true },
  },
  "glanzunterschiede": {
    PA: { text: "Bei Glasfaser-PA treten Fasern an die Oberfläche (matt, rau). Höhere Werkzeugtemperatur verbessert die Oberfläche deutlich.", typisch: true },
    PC: { text: "Hochglanz-Werkstoff, Unterschiede fallen stark auf. Gleichmäßige, hohe Werkzeugtemperatur und polierte Oberflächen." },
    POM: { text: "Matte Zonen in Anschnittnähe sind typisch. Langsamer einspritzen, Werkzeugtemperatur erhöhen." },
    PP: { text: "Bei talkumgefüllten Typen „Tigerstreifen“ (abwechselnd matte und glänzende Bänder). Einspritzgeschwindigkeit anpassen, Werkzeugtemperatur erhöhen.", typisch: true },
  },
  "rillen": {
    PA: { text: "Bei zu kalter Werkzeugwand möglich. Werkzeugtemperatur und Einspritzgeschwindigkeit erhöhen." },
    PC: { text: "Zähfließend, Fließfront kühlt am Rand schnell ab – anfällig in dünnen Bereichen. Einspritzgeschwindigkeit und Werkzeugtemperatur erhöhen.", typisch: true },
    POM: { text: "Bei niedriger Werkzeugtemperatur deutlich sichtbar. Werkzeugtemperatur auf mindestens ca. 80 °C.", typisch: true, annahme: true },
    PP: { text: "Bei kalten Werkzeugen und langsamer Füllung möglich, meist durch höhere Einspritzgeschwindigkeit behoben." },
  },
  "farbschlieren": {
    PA: { text: "Masterbatch-Träger muss zu PA passen (PA- oder Universalträger). Zu PE-basierte Träger können Schlieren und Festigkeitsverlust verursachen.", annahme: true },
    PC: { text: "Hohe Verarbeitungstemperatur: Pigmente und Masterbatch müssen temperaturbeständig sein. Bei Farbwechsel gründlich spülen." },
    POM: { text: "Nur POM-verträgliche Farbmittel verwenden. Saure Pigmente oder PVC-haltige Träger können POM zersetzen.", typisch: true },
    PP: { text: "Gut einfärbbar, PE- oder PP-Träger sind unkritisch. Bei Schlieren Staudruck erhöhen und Dosierung prüfen." },
  },
  "schwarze-punkte": {
    PA: { text: "Abbauprodukte aus Totzonen oder zu langer Verweilzeit. Bei Produktionsstopp Temperatur absenken, Zylinder regelmäßig spülen." },
    PC: { text: "In transparenten Teilen kritisch. PC haftet an Schnecke und Zylinder, abgelöste Beläge erzeugen schwarze Punkte. Mit geeignetem Spülmittel spülen, nicht bei hoher Temperatur stehen lassen.", typisch: true },
    POM: { text: "Abbau durch Überhitzung. Wichtig: Niemals POM mit PVC oder flammgeschützten Werkstoffen mischen oder direkt nacheinander fahren – heftige Zersetzung möglich. Vorher mit PE oder PP spülen.", typisch: true },
    PP: { text: "Selten. Meist Verunreinigung aus dem Material (Mahlgut) oder Beläge im Heißkanal." },
  },
  "luftblasen": {
    PA: { text: "Häufig Feuchtigkeit statt Luft. Zuerst Restfeuchte prüfen, dann Staudruck erhöhen." },
    PC: { text: "In transparenten Teilen sofort sichtbar. Staudruck erhöhen, Dekompression reduzieren, Trocknung prüfen.", typisch: true },
    POM: { text: "Blasen oft durch Zersetzungsgase. Massetemperatur und Verweilzeit prüfen." },
    PP: { text: "Meist Vakuolen statt echter Luft (siehe Lunker). Mit Staudruck und Dekompression die Lufteinzüge prüfen." },
  },
  "spannungsrisse": {
    PA: { text: "Trocken (frisch gespritzt) spröder, nach Feuchteaufnahme zäher. Bei Rissen direkt nach dem Spritzen auch Konditionierung prüfen." },
    PC: { text: "Sehr empfindlich gegenüber Spannungsrissen, besonders durch Chemikalien (Lösemittel, Öle, Reiniger). Hohe Werkzeugtemperatur, ggf. Tempern ca. 120 °C. Bauteile mit Chemikalien testen.", typisch: true, annahme: true },
    POM: { text: "Gegen die meisten Lösemittel beständig, aber empfindlich gegen Säuren. Spannungsrisse eher selten." },
    PP: { text: "Chemisch sehr beständig. Weißbruch beim Entformen ist häufig (vor allem Copolymere) – Entformungsschrägen und Auswerferflächen vergrößern.", typisch: true },
  },
  "entformungsprobleme": {
    PA: { text: "Bei hoher Werkzeugtemperatur noch weich – Kühlzeit ausreichend, Auswerferflächen groß genug wählen." },
    PC: { text: "Geringe Schwindung, Teil haftet auf Kernen und in der Kavität. Genug Entformungsschrägen (mind. ca. 1°) und polierte Flächen.", typisch: true, annahme: true },
    POM: { text: "Gute Gleiteigenschaften, entformt meist leicht. Schrumpft stark auf Kerne – Auswerfer nahe am Kern anordnen." },
    PP: { text: "Hohe Schwindung auf Kerne, aber elastisch – kleine Hinterschnitte sind oft zwangsentformbar. Auswerfermarken bei weichen Typen durch längere Kühlzeit vermeiden." },
  },
  "kalter-pfropfen": {
    PA: { text: "Friert an der Düse schnell ein, neigt aber auch zum Fadenziehen. Düsentemperatur genau regeln, ggf. Verschlussdüse einsetzen.", typisch: true },
    PC: { text: "Hohe Verarbeitungstemperatur und schnelles Erstarren an kalten Stellen. Düse gut beheizen, Pfropfenfang (kalter Pfropfen-Sammelraum) vorsehen." },
    POM: { text: "Düsentemperatur nicht zu niedrig, aber auch nicht überhitzen (Zersetzung). Pfropfenfang im Anguss vorsehen." },
    PP: { text: "Wenig anfällig. Bei Heißkanal Düsenspitzentemperatur prüfen." },
  },
  "delamination": {
    PA: { text: "Oft durch Vermischung mit unverträglichem Fremdmaterial (z. B. PP, PE). Materialwechsel gründlich spülen, Mahlgut sortenrein halten." },
    PC: { text: "Bei PC-Blends (z. B. PC/ABS) durch Überhitzung oder Feuchte möglich. Trocknung und Massetemperatur prüfen." },
    POM: { text: "Unverträglich mit fast allen anderen Kunststoffen – schon geringe Verunreinigung führt zu Schichtablösung.", typisch: true },
    PP: { text: "Unverträglich mit PS, PA, PC. Verunreinigung durch Mahlgut oder ungenügendes Spülen ist die häufigste Ursache.", typisch: true },
  },
  "massabweichungen": {
    PA: { text: "Feuchteaufnahme nach dem Spritzen verändert die Maße (Quellung). Maße erst im konditionierten Zustand bewerten oder Teile gezielt konditionieren.", typisch: true },
    PC: { text: "Geringe, gut vorhersagbare Schwindung (ca. 0,5–0,7 %). Maßhaltigkeit meist gut." , annahme: true },
    POM: { text: "Starke Nachschwindung über Tage. Maße frühestens nach 24–48 h messen. Höhere Werkzeugtemperatur verringert die Nachschwindung.", typisch: true, annahme: true },
    PP: { text: "Hohe Schwindung, stark abhängig von Nachdruck und Werkzeugtemperatur. Maße erst nach ca. 24 h prüfen.", typisch: true, annahme: true },
  },

  // Einträge für die 7 Fehler, die mit PR #2 dazugekommen sind
  "orangenhaut": {
    PA: { text: "Bei Glasfaser-PA kommt die Welligkeit oft von Fasern direkt unter der Oberfläche. Höhere Werkzeugtemperatur und schnellere Füllung helfen." },
    PC: { text: "Auf Hochglanzflächen sehr auffällig. Werkzeugtemperatur erhöhen, damit die Schmelze die Werkzeugoberfläche sauber abformt.", typisch: true },
    POM: { text: "Bei niedriger Werkzeugtemperatur möglich. Werkzeugtemperatur auf ca. 90 °C anheben.", annahme: true },
    PP: { text: "Bei talkumgefüllten Typen häufiger. Nachdruck und Werkzeugtemperatur erhöhen.", annahme: true },
  },
  "mikrorisse": {
    PA: { text: "Frisch gespritzt (trocken) am rissanfälligsten. Risse an Einlegeteilen: Einlegeteile vorwärmen, Teile ggf. konditionieren." },
    PC: { text: "Sehr anfällig, besonders an Schraubdomen und Einlegeteilen. Hohe Werkzeugtemperatur, Einlegeteile vorwärmen, Kontakt mit Ölen oder Reinigern prüfen, ggf. Tempern.", typisch: true },
    POM: { text: "Eher selten. Bei Einlegeteilen auf Schwindung auf das Metall achten, Einlegeteile vorwärmen." },
    PP: { text: "Echte Spannungsrisse selten. Feine weiße Linien sind meist Weißbruch durch Verformung beim Entformen." },
  },
  "fadenziehen": {
    PA: { text: "Sehr typisch wegen der dünnflüssigen Schmelze. Düsentemperatur senken, Dekompression erhöhen, Verschlussdüse einsetzen.", typisch: true },
    PC: { text: "Selten, da zähfließend. Eher kalter Pfropfen als Fadenziehen." },
    POM: { text: "Gelegentlich. Düsentemperatur nicht zu hoch, Dekompression nur so weit wie nötig (sonst Lufteinzug)." },
    PP: { text: "Typisch bei hoher Massetemperatur. Düsentemperatur senken, Dekompression erhöhen, Abhebeweg der Düse prüfen.", typisch: true },
  },
  "mahlgut-schlieren": {
    PA: { text: "Mahlgut nimmt schneller Feuchte auf als Neuware. Mahlgut immer mit trocknen und Anteil begrenzen (ca. 20–30 %).", typisch: true, annahme: true },
    PC: { text: "Mahlgut gründlich trocknen, Mehrfachverarbeitung macht PC spröde. Anteil begrenzen und Staubanteil absieben.", typisch: true },
    POM: { text: "Mehrfach verarbeitetes POM ist thermisch vorgeschädigt und gast stärker aus. Anteil begrenzen, nur sauberes, sortenreines Mahlgut verwenden." },
    PP: { text: "Feuchte ist selten die Ursache. Eher Staub- oder Feinanteil im Mahlgut und Lufteinzug – Mahlgut absieben, Staudruck erhöhen." },
  },
  "glasfasern-oberflaeche": {
    PA: { text: "Häufigster Fall (PA-GF). Werkzeugtemperatur deutlich erhöhen (ca. 80–100 °C), schneller einspritzen.", typisch: true, annahme: true },
    PC: { text: "PC-GF selten im Einsatz, gleiche Maßnahmen wie bei PA-GF: warmes Werkzeug, schnelle Füllung." },
    POM: { text: "POM-GF nur bei technischen Teilen, wenig verbreitet. Warmes Werkzeug hilft auch hier.", annahme: true },
    PP: { text: "Bei PP-GF typisch. Werkzeugtemperatur erhöhen, Fasern bleiben bei PP aber meist sichtbarer als bei PA.", typisch: true },
  },
  "anschnittmarkierung": {
    PA: { text: "Durch hohe Scherung am Anschnitt. Anfangsgeschwindigkeit im Einspritzprofil senken." },
    PC: { text: "Sehr auffällig als matter Hof. Langsamer Start, Anschnitt vergrößern, Werkzeugtemperatur erhöhen.", typisch: true },
    POM: { text: "Matter Hof bzw. Flecken am Anschnitt sind bei POM sehr typisch. Langsam anspritzen, Anschnitt vergrößern.", typisch: true },
    PP: { text: "Meist unkritisch. Einspritzprofil am Start absenken." },
  },
  "dosierprobleme": {
    PA: { text: "Zu warme Einzugszone lässt Granulat anschmelzen. Einzugszone kühler einstellen, Restfeuchte prüfen." },
    PC: { text: "Hohe Viskosität braucht viel Drehmoment. Temperaturprofil ansteigend wählen, Schneckendrehzahl nicht zu hoch." },
    POM: { text: "Bei zu hoher Einzugstemperatur rutscht das Granulat. Einzugszone kühl halten, Staudruck moderat." },
    PP: { text: "Rutscht leicht in der Einzugszone (glattes Granulat). Einzugstemperatur anpassen, Staudruck leicht erhöhen.", typisch: true, annahme: true },
  },
};
