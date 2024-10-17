--------------------------------------------------------------------------------
1. Čo je WebPartContext?
--------------------------------------------------------------------------------
- WebPartContext je objekt, ktorý poskytuje informácie a služby o aktuálnom kontexte webovej časti. Môže obsahovať rôzne informácie, ako napríklad URL aktuálnej stránky, používateľské informácie, služby pre vykonávanie HTTP požiadaviek a podobne.

- Použitie WebPartContext v hlavnom súbore src/webparts/listsTest/ListsTestWebPart.ts umožňuje ľahšie spravovať a predávať kontext do všetkých komponentov.


--------------------------------------------------------------------------------
2. Ako správne používať a kedy najvhodnejšie vytvárať komponenty
--------------------------------------------------------------------------------
- vždy, keď potrebujeme znovu použiteľné kúsky kódu, ktoré sú zodpovedné za konkrétnu časť UI alebo logiky. Komponenty zaisťujú modularitu a ľahšiu údržbu kódu.

Typy komponentov:
--------------------
- Presentational Components (Dumb Components): Sú to komponenty, ktoré sú zodpovedné len za vykresľovanie UI a nemajú žiadnu logiku. Prijímajú props a vykresľujú UI.
- Container Components (Smart Components): Tieto komponenty sú zodpovedné za získavanie dát a logiku. Obvykle obsahujú stav a posielajú dáta ako props do presentational komponentov.


--------------------------------------------------------------------------------
3. Ako fungujú props a callback funkcie a na čo slúžia
--------------------------------------------------------------------------------
Props:
Props (properties) sú vstupné parametre komponentov v Reacte. Umožňujú nám predávať dáta a funkcie medzi komponentmi. Props sú nemenné , čo znamená, že komponent ich nemôže meniť. Sú určené na konfiguráciu komponentov a ich správanie.

Callback Funkcie:
Callback funkcie sú funkcie, ktoré sa predávajú ako props z rodičovského komponentu do detského komponentu. Deti ich môžu zavolať, aby informovali rodiča o nejakých udalostiach alebo zmenách. Tento prístup umožňuje rodičovskému komponentu reagovať na akcie, ktoré sa dejú v detskom komponente.


--------------------------------------------------------------------------------
4. Použitie SERVICES
--------------------------------------------------------------------------------
Tento prístup sa často označuje ako separačný vzor (separation of concerns) a je základom pre tvorbu udržateľných a modulárnych aplikácií.

Výhody používania služieb (services) a separačného vzoru:
- Oddelenie zodpovedností (Separation of Concerns):
Rozdeľujeme aplikáciu na menšie, špecializované časti, ktoré majú jasne definované zodpovednosti. Napríklad, komponenty sa starajú o užívateľské rozhranie (UI), zatiaľ čo služby sa starajú o logiku a komunikáciu s API.
Toto oddelenie zlepšuje čitateľnosť kódu, pretože každá trieda alebo komponent má jasne definovanú úlohu.
- Opätovné použitie (Reusability):
Služby môžu byť opätovne použité v rôznych častiach aplikácie. Napríklad, ak máme službu SPService pre komunikáciu so SharePoint API, môžeme ju použiť vo viacerých komponentoch bez duplicity kódu.
Toto opätovné použitie vedie k menšiemu počtu chýb, pretože kód pre konkrétnu funkcionalitu je centralizovaný a ľahšie udržiavateľný.
- Testovateľnosť (Testability):
Oddelenie logiky do služieb uľahčuje testovanie, pretože môžeme písať jednotkové testy pre služby nezávisle od užívateľského rozhrania.
Môžeme jednoducho mockovať služby počas testovania komponentov, čo zjednodušuje izolované testovanie a zlepšuje spoľahlivosť testov.
- Udržiavateľnosť (Maintainability):
Keď je logika oddelená do služieb, zmeny a úpravy sú jednoduchšie. Ak potrebujeme aktualizovať spôsob, akým komunikujeme s API, môžeme to urobiť na jednom mieste bez toho, aby sme museli meniť kód vo všetkých komponentoch.
Centralizácia logiky vedie k menšiemu množstvu chýb a zjednodušuje debugging.
- Čistota kódu (Clean Code):
Komponenty sú čistejšie a jednoduchšie, keď sa sústreďujú na UI a delegujú logiku službám.
Tento prístup zlepšuje čitateľnosť a zrozumiteľnosť kódu, čo je dôležité pre tímovú prácu a dlhodobú udržateľnosť projektu.
// zmena