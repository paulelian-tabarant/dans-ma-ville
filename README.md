# Dans ma ville

## Démarrer l'API

```bash
cd backend
```

### Créer un environnement virtuel Python

```bash
python3 -m venv [nom choisi pour l'environnement]
```

Le nom de dossier `.venv` est déjà exclu du tracking git. Il est conseillé de choisir ce nom-ci.

### Basculer sur l'environnement virtuel

```bash
source [nom choisi pour l'environnement]/bin/activate
```

### Installer les dépendances

```bash
make install/dev
```

### Lancer le serveur

```bash
make start
```

## Mettre à jour les dépendances

```bash
make update
```

## Déployer l'API

L'API se déploie à chaque merge sur la branche `main`.

Pour tester le déploiement depuis une *pull request*, lui ajouter le tag `deploy-preview`.