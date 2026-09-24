# A11y Express — vérifications rapides WCAG 2.2 en un clic (bookmarklet)

[English version](README.md)

Gratuit, MIT, exécuté dans votre navigateur : **aucune donnée n'est envoyée**. Page et installation : https://decarvalhoe.github.io/capital-ops-horizon-a11y-express/fr.html

Vérifie : `lang`, images sans `alt`, `h1` et sauts de niveaux, liens/boutons sans nom accessible, champs sans étiquette,
identifiants dupliqués, cibles < 24×24 px (WCAG 2.2 · 2.5.8), lien d'évitement / région `main`. Résultat copiable en JSON. Messages du panneau en anglais.

**Essayer sans site réel :** ouvrez la [page de test synthétique](https://decarvalhoe.github.io/capital-ops-horizon-a11y-express/examples/synthetic-page.html)
(contenu fictif, défauts volontaires) et cliquez sur le bookmarklet : neuf constats attendus, listés sur la page.

## Retours et support

Retour volontaire via [GitHub Issues](https://github.com/decarvalhoe/capital-ops-horizon-a11y-express/issues/new/choose). Meilleur effort, sans délai garanti. Voir [SUPPORT.md](SUPPORT.md).

**Ne transmettez aucune donnée privée.** Les issues sont publiques : pas d'URL non publique, de données d'utilisateurs, de cookies, de jetons ni de captures contenant des informations personnelles. Reproduisez avec un exemple synthétique.

## Limites

Vérifications automatiques partielles, pas un audit WCAG complet. Référence : [WCAG 2.2 (W3C, 12.12.2024)](https://www.w3.org/TR/WCAG22/).

Tests : `node --test test.mjs` (dont identifiants contenant guillemets, crochets, barres obliques inverses).

Correctif 2026-09-24 (revue opérateur) : association étiquette ↔ champ par la propriété DOM `labels` ou comparaison stricte de `for`, sans construction de sélecteur CSS ; un identifiant contenant un guillemet ne provoque plus d'erreur. Test public gratuit de la ligue de paris Horizon (24.09.2026) : mesure = trafic GitHub uniquement, aucun traceur.
