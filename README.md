# IonicatorProject

## Installation
Ne pas oublier le petit **npm install** des familles

## Sujet

Il s’agit d’une application composée des fonctionnalités et écrans suivants:

Une page de saisie et persistance d’un identifiant
Disponible lors de la 1ere connexion
Ne doit pas être présente si déjà renseignée et persisté

Une page listant le titre et le contenu du WebService (JsonPlaceHolder)
Un élément (bouton, case à coche, etc.) permettant de persister ou de supprimer du cache un item
Chaque item est clickable et redirige sur une page affichant toutes les informations de celui-ci récupérées du WebService

Une page listant les items persisté dans le cache
Possibilité de supprimer un ou tous les items

### Règles globales
Si l’identifiant a déjà été saisi nous ne devons pas être redirigé sur la page de saisie mais directement sur la page de listing
Il ne faut récupérer que 10 items du WebService (celui du /posts)
Dans le cas où il n’y a pas de connexion internet (si la requête au WebService n’a pas aboutie) nous devons afficher un message d’information sur la page (ex: Le récupération des articles depuis le serveur a échouée)
En plus de ce message et si les éléments ont déjà été persisté, nous devons les afficher depuis le cache
Chaque page doit avoir un bouton de retour à la page précédente
Un bonus sera attribué en fonction du rendu graphique de l’application
Un malus sera attribué s’il n’y a pas de test ou insuffisamment