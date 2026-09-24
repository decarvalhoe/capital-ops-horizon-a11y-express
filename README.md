# A11y Express — vérifications rapides WCAG 2.2 en un clic (bookmarklet)

Gratuit, MIT, exécuté dans votre navigateur : **aucune donnée n'est envoyée**. Page et installation : https://decarvalhoe.github.io/capital-ops-horizon-a11y-express/

Vérifie : `lang`, images sans `alt`, `h1` et sauts de niveaux, liens/boutons sans nom accessible, champs sans étiquette,
identifiants dupliqués, cibles < 24×24 px (WCAG 2.2 · 2.5.8), lien d'évitement / région `main`. Résultat copiable en JSON.

Limites : vérifications automatiques partielles, pas un audit WCAG complet. Référence : [WCAG 2.2 (W3C, 12.12.2024)](https://www.w3.org/TR/WCAG22/).

Tests : `node --test test.mjs`. Test public gratuit de la ligue de paris Horizon (24.09.2026) : mesure = trafic GitHub uniquement, aucun traceur.
