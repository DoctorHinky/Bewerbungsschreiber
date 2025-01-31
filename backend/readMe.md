# Backend vom Bewerbungsschreiber

## Beschreibung

    Das Backend wurde mit Node.js und express geschrieben, da es sich um ein minimalisches Backend handelt, ist es synchron geschrieben.
    Was kein Problem bei sehr kleinen Datenmengen darstellt.

    Die Datenbank ansich ist eine SQLite Datenbank, welche direkt im Projektordner liegt.

    Die Datenbank enthält 2 Tabellen:
        - user (auch wenn es vorraussichtlich immer nur einen user geben wird, wird dieser normal in der user Tabelle gespeichert)
        - daten (hier wird der Datensatz mit den persönlichen Daten gespeichert)

## installation

    1. Node.js installieren
    2. Projektordner öffnen

    ```bash
        npm install
        npm run dev

    ```

    Das Backend läuft nun auf `localhost:3000 wenn nicht anders in einer .env Datei festgelegt
