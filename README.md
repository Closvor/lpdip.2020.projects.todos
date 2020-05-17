# Le projet
Projet aboutie mais pas entièrement testé. L'affichage des Todos dans une liste ne fonctionnait pas alors que l'application récupérait les bonnes datas.
Par exemple, je n'ai pas pu tester le 'put' du script Todos car aucuns ne s'affichaient.

# Base de données
La base de données comporte deux tables 'Todos' et 'Lists'.
La table 'Todos' contient la clé étrangère de la table 'Lists' pour pouvoir lier une tache à une liste de tâches.
Cette clé étrangère maintient l'intégrité de la base de données car aucunes tâches ne peut être ajouter si il n'y a pas de liste associée.


# Docker
Pour créer les container Docker j'ai utilisé :

- ’docker run --name serveur-mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -d mysql:latest’
- ’docker run --name myadmin -d --link serveur-mysql:db -p 8080:80 phpmyadmin/phpmyadmin’
- ’docker run --name projects.todos -d -v "$PWD":/app -w /app/server --link serveur-mysql:db -p 3100:3001 node:13 yarn dev’
