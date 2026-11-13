# GoT-Arena lokal starten (Windows)

Diese Anleitung startet das komplette Spiel (Datenbank, Lobby, Spielserver) auf deinem PC.

## Einmalig installieren

1. **Docker Desktop**: https://www.docker.com/products/docker-desktop – installieren, starten und warten, bis unten links „Engine running“ steht.
2. **Git für Windows**: https://git-scm.com/download/win – mit den Standardeinstellungen installieren.

## Code holen

In PowerShell, jede Zeile einzeln:

```powershell
cd $HOME
git clone --recurse-submodules -b feat/german-card-text-got-theme https://github.com/HeinMalte/throneteki.git got-arena
cd got-arena
```

`--recurse-submodules` ist wichtig: damit kommen auch die Kartendaten mit.

## Kartenbilder einspielen

Die Bilder aus `got_bilder_laden.py` liegen in `got-bilder-laden\got-bilder`. Sie werden unter dem Kartencode in den Spielordner kopiert:

```powershell
Get-ChildItem $HOME\got-bilder-laden\got-bilder\*.webp | ForEach-Object { Copy-Item $_.FullName "public\img\cards\$($_.BaseName).png" }
```

(Die Dateien bleiben WebP-Bilder mit der Endung `.png` – Browser zeigen sie trotzdem richtig an.)

## Starten

```powershell
docker compose -f docker-compose.local.yml up --build
```

Beim ersten Mal dauert das 5–15 Minuten. Fertig ist es, wenn im Fenster eine Zeile mit `Listening on port 4000` erscheint. Das Fenster offen lassen.

Dann im Browser **http://localhost:4000** öffnen.

## Gegen dich selbst testen

1. Oben rechts **Register** – E-Mail darf erfunden sein.
2. Zweiten Account in einem **Inkognito-Fenster** anlegen.
3. Unter **Decks** ein Deck bauen oder von ThronesDB importieren.
4. Mit Account 1 unter **Play** ein Spiel erstellen, mit Account 2 beitreten.

Fährst du im Spiel mit der Maus über eine Karte, steht unter dem Bild der deutsche Kartentext.

## Stoppen und wieder starten

- Stoppen: im Fenster **Strg + C**, danach `docker compose -f docker-compose.local.yml down`
- Starten: `docker compose -f docker-compose.local.yml up` (ohne `--build`, solange sich am Code nichts geändert hat)
- Neuen Stand holen: `git pull`, dann wieder mit `--build` starten.

Accounts und Decks bleiben zwischen den Starts erhalten.
