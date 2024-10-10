1. Čo je WebPartContext?
--------------------------------------------------------------------------------
- WebPartContext je objekt, ktorý poskytuje informácie a služby o aktuálnom kontexte webovej časti. Môže obsahovať rôzne informácie, ako napríklad URL aktuálnej stránky, používateľské informácie, služby pre vykonávanie HTTP požiadaviek a podobne.

- Použitie WebPartContext v hlavnom súbore src/webparts/listsTest/ListsTestWebPart.ts umožňuje ľahšie spravovať a predávať kontext do všetkých komponentov.

2. Ako správne používať a kedy najvhodnejšie vytvárať komponenty
--------------------------------------------------------------------------------
- vždy, keď potrebujeme znovu použiteľné kúsky kódu, ktoré sú zodpovedné za konkrétnu časť UI alebo logiky. Komponenty zaisťujú modularitu a ľahšiu údržbu kódu.

Typy komponentov:
--------------------
- Presentational Components (Dumb Components): Sú to komponenty, ktoré sú zodpovedné len za vykresľovanie UI a nemajú žiadnu logiku. Prijímajú props a vykresľujú UI.
- Container Components (Smart Components): Tieto komponenty sú zodpovedné za získavanie dát a logiku. Obvykle obsahujú stav a posielajú dáta ako props do presentational komponentov.

3. Ako fungujú props a callback funkcie a na čo slúžia
--------------------------------------------------------------------------------
Props:
Props (properties) sú vstupné parametre komponentov v Reacte. Umožňujú nám predávať dáta a funkcie medzi komponentmi. Props sú nemenné , čo znamená, že komponent ich nemôže meniť. Sú určené na konfiguráciu komponentov a ich správanie.

Callback Funkcie:
Callback funkcie sú funkcie, ktoré sa predávajú ako props z rodičovského komponentu do detského komponentu. Deti ich môžu zavolať, aby informovali rodiča o nejakých udalostiach alebo zmenách. Tento prístup umožňuje rodičovskému komponentu reagovať na akcie, ktoré sa dejú v detskom komponente.