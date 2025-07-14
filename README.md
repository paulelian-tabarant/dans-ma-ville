# Dans ma ville

## Prérequis

- pnpm
- nodejs
- python3
- direnv
- make
- un démon Docker, si besoin de construire les images / lancer les conteneurs en local

## Frontend

```shell
cd frontend
```

### Installer les dépendances

```shell
pnpm i
```

### Démarrer l'application frontend

```shell
pnpm run dev
```

## Backend

```shell
cd backend
```

### Activer l'environnement virtuel

Créer un environnement virtuel Python pour y stocker les dépendances backend

```shell
python3 -m venv .venv
```

Utiliser `direnv` pour activer automatiquement l'environnement virtuel Python lorsque l'on navigue dans le
dossier `backend` depuis un terminal

```shell
direnv allow
```

### Installer les dépendances

```shell
make install/dev
```

### Lancer le serveur

```shell
make dev
```

### Mettre à jour les dépendances

```shell
make update
```

### Déployer l'API

L'API se déploie à chaque merge sur la branche `main`.

Pour tester le déploiement depuis une *pull request*, lui ajouter le tag `deploy-preview`.
