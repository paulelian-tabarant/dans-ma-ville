# Dans ma ville

## Prérequis

### Packages

- python3
- direnv
- make
- un démon Docker, si besoin de construire les images / lancer les conteneurs en local

### Installation du projet

Créer un environnement virtuel Python pour y stocker les dépendances backend

```shell
cd backend
python3 -m venv .venv
```

Utiliser `direnv` pour activer automatiquement l'environnement virtuel Python lorsque l'on navigue dans le
dossier `backend` depuis un terminal

```bash
direnv allow
```

## Backend

```bash
cd backend
```

### Installer les dépendances

```bash
make install/dev
```

### Lancer le serveur

```bash
make dev
```

## Mettre à jour les dépendances

```bash
make update
```

## Déployer l'API

L'API se déploie à chaque merge sur la branche `main`.

Pour tester le déploiement depuis une *pull request*, lui ajouter le tag `deploy-preview`.
